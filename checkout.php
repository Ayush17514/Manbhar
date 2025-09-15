<?php
session_start();
require 'includes/db.php';

// Track last visited page for redirect after success
if (!isset($_SESSION['last_page']) || basename($_SERVER['PHP_SELF']) !== 'checkout.php') {
    $_SESSION['last_page'] = $_SERVER['HTTP_REFERER'] ?? 'index.php';
}

// Ensure CSRF token
if (empty($_SESSION['csrf'])) {
    $_SESSION['csrf'] = bin2hex(random_bytes(32));
}
$csrf = $_SESSION['csrf'];

$user_id = $_SESSION['user_id'] ?? null;

// ---- HANDLE AJAX ----
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    header('Content-Type: application/json');
    if (empty($_POST['csrf']) || $_POST['csrf'] !== $_SESSION['csrf']) {
        http_response_code(403);
        echo json_encode(['status'=>'error','message'=>'Invalid CSRF']);
        exit;
    }

    $action = $_POST['action'] ?? '';

    // 1️⃣ SEND OTP
    if ($action === 'send_otp') {
        $phone = trim($_POST['phone'] ?? '');
        if (!$phone) {
            echo json_encode(['status'=>'error','message'=>'Phone number required']);
            exit;
        }
        $otp = rand(100000, 999999);
        $expiry = date("Y-m-d H:i:s", time() + 300); // 5 minutes

        $stmt = $conn->prepare("INSERT INTO otp_codes(user_id, phone, otp, expires_at) VALUES (?,?,?,?)");
        $stmt->bind_param("isss", $user_id, $phone, $otp, $expiry);
        $stmt->execute();

        // TODO: Integrate SMS API
        echo json_encode(['status'=>'success','message'=>'OTP sent','otp'=>$otp]); // ⚠️ Debug only
        exit;
    }

    // 2️⃣ VERIFY OTP
    if ($action === 'verify_otp') {
        $phone = trim($_POST['phone'] ?? '');
        $otp   = trim($_POST['otp'] ?? '');
        if (!$phone || !$otp) {
            echo json_encode(['status'=>'error','message'=>'Phone & OTP required']);
            exit;
        }

        $stmt = $conn->prepare("SELECT id,expires_at FROM otp_codes WHERE phone=? AND otp=? AND verified=0 ORDER BY id DESC LIMIT 1");
        $stmt->bind_param("ss", $phone, $otp);
        $stmt->execute();
        $res = $stmt->get_result();

        if ($row = $res->fetch_assoc()) {
            if (strtotime($row['expires_at']) < time()) {
                echo json_encode(['status'=>'error','message'=>'OTP expired']);
                exit;
            }
            $conn->query("UPDATE otp_codes SET verified=1 WHERE id=".$row['id']);
            $_SESSION['otp_verified'] = true;
            echo json_encode(['status'=>'success','message'=>'OTP verified']);
        } else {
            echo json_encode(['status'=>'error','message'=>'Invalid OTP']);
        }
        exit;
    }

    // 3️⃣ FETCH CART
    if ($action === 'fetch_cart') {
        $items = [];
        $subtotal = 0;

        if ($user_id) {
            $stmt = $conn->prepare("SELECT c.product_id, c.quantity, p.title, p.price, p.image 
                                    FROM cart c 
                                    JOIN products p ON c.product_id = p.id 
                                    WHERE c.user_id=?");
            $stmt->bind_param("i", $user_id);
            $stmt->execute();
            $res = $stmt->get_result();
            while ($row = $res->fetch_assoc()) {
                $images = explode(',', $row['image']);
                $row['main_image'] = trim($images[0]);
                $row['total'] = $row['price'] * $row['quantity'];
                $subtotal += $row['total'];
                $items[] = $row;
            }
        } elseif (!empty($_SESSION['cart'])) {
            $ids = array_keys($_SESSION['cart']);
            if (!empty($ids)) {
                $ph = implode(',', array_fill(0, count($ids), '?'));
                $types = str_repeat('i', count($ids));
                $stmt = $conn->prepare("SELECT id, title, price, image FROM products WHERE id IN ($ph)");
                $binds=[]; $binds[]=$types;
                foreach($ids as $i=>$id){ $n='b'.$i; $$n=$id; $binds[]=&$$n; }
                call_user_func_array([$stmt,'bind_param'],$binds);
                $stmt->execute();
                $res=$stmt->get_result();
                while($row=$res->fetch_assoc()){
                    $qty=$_SESSION['cart'][$row['id']];
                    $images=explode(',', $row['image']);
                    $row['main_image']=trim($images[0]);
                    $row['quantity']=$qty;
                    $row['total']=$row['price']*$qty;
                    $subtotal+=$row['total'];
                    $items[]=$row;
                }
            }
        }

        $gst = $subtotal * 0.03;
        $making = $subtotal * 0.1;
        $shipping = ($subtotal > 5000) ? 0 : 50;
        $grand = $subtotal + $gst + $making + $shipping;

        echo json_encode([
            'status'=>'success',
            'items'=>$items,
            'subtotal'=>$subtotal,
            'gst'=>$gst,
            'making'=>$making,
            'shipping'=>$shipping,
            'grand_total'=>$grand
        ]);
        exit;
    }

    // 4️⃣ PLACE ORDER
    if ($action === 'place_order') {
        if (empty($_SESSION['otp_verified'])) {
            echo json_encode(['status'=>'error','message'=>'Please verify OTP first.']);
            exit;
        }

        $name    = trim($_POST['name'] ?? '');
        $phone   = trim($_POST['phone'] ?? '');
        $email   = trim($_POST['email'] ?? '');
        $address = trim($_POST['address'] ?? '');
        $pincode = trim($_POST['pincode'] ?? '');
        $pay_method = $_POST['payment_method'] ?? 'COD';

        if (!$name || !$phone || !$email || !$address || !$pincode) {
            echo json_encode(['status'=>'error','message'=>'Please fill all fields.']);
            exit;
        }

        $cartItems=[]; $subtotal=0;
        if ($user_id) {
            $stmt=$conn->prepare("SELECT c.product_id,c.quantity,p.price FROM cart c JOIN products p ON c.product_id=p.id WHERE c.user_id=?");
            $stmt->bind_param("i",$user_id);
            $stmt->execute();
            $res=$stmt->get_result();
            while($r=$res->fetch_assoc()){
                $cartItems[]=$r;
                $subtotal += $r['price']*$r['quantity'];
            }
        } elseif (!empty($_SESSION['cart'])) {
            foreach ($_SESSION['cart'] as $pid=>$qty) {
                $stmt=$conn->prepare("SELECT id,price FROM products WHERE id=?");
                $stmt->bind_param("i",$pid);
                $stmt->execute();
                $res=$stmt->get_result();
                if ($r=$res->fetch_assoc()) {
                    $cartItems[]=['product_id'=>$r['id'],'quantity'=>$qty,'price'=>$r['price']];
                    $subtotal += $r['price']*$qty;
                }
            }
        } else {
            echo json_encode(['status'=>'error','message'=>'Cart is empty']);
            exit;
        }

        $gst=$subtotal*0.03;
        $making=$subtotal*0.1;
        $ship=($subtotal>5000)?0:50;
        $grand=$subtotal+$gst+$making+$ship;

        $order_no='MB'.date('Ymd').strtoupper(substr(bin2hex(random_bytes(3)),0,6));
        $pay_status = ($pay_method === 'COD') ? 'Pending' : 'Initiated';

        $conn->begin_transaction();
        try {
            if ($user_id) {
                $stmt=$conn->prepare("INSERT INTO orders(order_number,user_id,name,phone,email,address,pincode,payment_method,subtotal,gst,shipping,making,grand_total,payment_status) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)");
                $stmt->bind_param("sissssssddddss",$order_no,$user_id,$name,$phone,$email,$address,$pincode,$pay_method,$subtotal,$gst,$ship,$making,$grand,$pay_status);
            } else {
                $stmt=$conn->prepare("INSERT INTO orders(order_number,user_id,name,phone,email,address,pincode,payment_method,subtotal,gst,shipping,making,grand_total,payment_status) VALUES (?,NULL,?,?,?,?,?,?,?,?,?,?,?,?)");
                $stmt->bind_param("sssssssddddss",$order_no,$name,$phone,$email,$address,$pincode,$pay_method,$subtotal,$gst,$ship,$making,$grand,$pay_status);
            }
            $stmt->execute();
            $order_id=$stmt->insert_id;

            $stmtItem=$conn->prepare("INSERT INTO order_items(order_id,product_id,quantity,price) VALUES(?,?,?,?)");
            foreach($cartItems as $it){
                $stmtItem->bind_param("iiid",$order_id,$it['product_id'],$it['quantity'],$it['price']);
                $stmtItem->execute();
            }

            if ($user_id) {
                $conn->query("DELETE FROM cart WHERE user_id=".$user_id);
            } else {
                unset($_SESSION['cart']);
            }

            $conn->commit();
            echo json_encode(['status'=>'success','message'=>'Order placed successfully','order_number'=>$order_no,'order_id'=>$order_id]);
        } catch(Exception $e){
            $conn->rollback();
            echo json_encode(['status'=>'error','message'=>'Order failed: '.$e->getMessage()]);
        }
        exit;
    }
}
?>
<?php include 'includes/header.php'; ?>
<main class="bg-gray-50 py-12 pt-28">
  <div class="max-w-6xl mx-auto px-4">
    <h1 class="text-3xl text-center font-bold text-gray-800 ">Checkout</h1>
    <div class="my-4 flex justify-center">
      <div class="heading-underline w-28 h-[2px] bg-gradient-to-r from-[#153448] via-[#F7E7CE] to-[#153448] rounded-full"></div>
    </div>

    <div class="grid md:grid-cols-2 gap-10">
      <!-- LEFT: Steps -->
      <div class="bg-white p-6 rounded-lg shadow space-y-4">
        <!-- Step 1: OTP -->
        <div class="step" id="step1">
          <h2 class="font-semibold text-lg mb-2">1. Verify Phone</h2>
          <div class="step-content">
            <input type="text" id="phoneInput" placeholder="Enter Phone" class="w-full border rounded px-3 py-2 mb-2">
            <button id="sendOtpBtn" class="bg-amber-600 text-white px-4 py-2 rounded">Send OTP</button>
            <div id="otpSection" class="hidden mt-2">
              <input type="text" id="otpInput" placeholder="Enter OTP" class="w-full border rounded px-3 py-2 mb-2">
              <button id="verifyOtpBtn" class="bg-green-600 text-white px-4 py-2 rounded">Verify OTP</button>
            </div>
            <p id="otpMsg" class="text-sm mt-2"></p>
          </div>
        </div>

        <!-- Step 2: Address -->
        <div class="step opacity-50 pointer-events-none" id="step2">
          <h2 class="font-semibold text-lg mb-2">2. Delivery Address</h2>
          <div class="step-content hidden">
            <form id="addressForm" class="space-y-3">
              <input name="name" placeholder="Full Name" class="w-full border rounded px-3 py-2">
              <input name="phone" placeholder="Phone" class="w-full border rounded px-3 py-2">
              <input name="email" placeholder="Email" class="w-full border rounded px-3 py-2">
              <textarea name="address" placeholder="Address" class="w-full border rounded px-3 py-2"></textarea>
              <input name="pincode" placeholder="Pincode" class="w-full border rounded px-3 py-2">
            </form>
          </div>
        </div>

        <!-- Step 3: Payment -->
        <div class="step opacity-50 pointer-events-none" id="step3">
          <h2 class="font-semibold text-lg mb-2">3. Payment Options</h2>
          <div class="step-content hidden">
            <form id="paymentForm" class="space-y-3">
              <select name="payment_method" class="w-full border rounded px-3 py-2">
                <option value="COD">Cash on Delivery</option>
                <option value="UPI">UPI</option>
              </select>
              <button type="submit" class="bg-amber-600 text-white px-4 py-2 rounded">Place Order</button>
            </form>
            <div id="formMessage" class="mt-3 text-sm"></div>
          </div>
        </div>
      </div>

      <!-- RIGHT: Order Summary -->
      <div class="bg-white p-6 rounded-lg shadow">
        <h2 class="text-xl font-semibold mb-4">Your Order</h2>
        <div id="cartItems"></div>
        <div id="totals" class="mt-4"></div>
      </div>
    </div>
  </div>
</main>
<script>
  const csrfToken = "<?= $csrf ?>";
</script>

<script>
document.addEventListener('DOMContentLoaded', () => {
  fetchCart();

  // Send OTP
  document.getElementById('sendOtpBtn').addEventListener('click', async () => {
    const phone = document.getElementById('phoneInput').value;
    const fd = new FormData();
    fd.append('csrf', csrfToken);
    fd.append('action', 'send_otp');
    fd.append('phone', phone);

    const res = await fetch('checkout.php', { method: 'POST', body: fd });
    const out = await res.json();

    document.getElementById('otpMsg').textContent = out.message;

    if (out.status === 'success') {
      document.getElementById('otpSection').classList.remove('hidden');
    }
  });

  // Verify OTP
  document.getElementById('verifyOtpBtn').addEventListener('click', async () => {
    const phone = document.getElementById('phoneInput').value;
    const otp = document.getElementById('otpInput').value;

    const fd = new FormData();
    fd.append('csrf', csrfToken);
    fd.append('action', 'verify_otp');
    fd.append('phone', phone);
    fd.append('otp', otp);

    const res = await fetch('checkout.php', { method: 'POST', body: fd });
    const out = await res.json();

    document.getElementById('otpMsg').textContent = out.message;

    if (out.status === 'success') {
      // Lock step 1
      document.getElementById('step1').classList.add("opacity-50", "pointer-events-none");
      document.querySelector('#step1 .step-content').classList.add("hidden");

      // Unlock step 2
      document.getElementById('step2').classList.remove("opacity-50", "pointer-events-none");
      document.querySelector('#step2 .step-content').classList.remove("hidden");
    }
  });

  // Address → Payment
  document.getElementById('addressForm').addEventListener('submit', e => {
    e.preventDefault();

    // Lock step 2
    document.getElementById('step2').classList.add("opacity-50", "pointer-events-none");
    document.querySelector('#step2 .step-content').classList.add("hidden");

    // Unlock step 3
    document.getElementById('step3').classList.remove("opacity-50", "pointer-events-none");
    document.querySelector('#step3 .step-content').classList.remove("hidden");
  });

  // Place Order
  document.getElementById('paymentForm').addEventListener('submit', async e => {
    e.preventDefault();

    const fd = new FormData(document.getElementById('addressForm'));
    fd.append('csrf', csrfToken);
    fd.append('action', 'place_order');
    fd.append('payment_method', document.querySelector('[name="payment_method"]').value);

    const res = await fetch('checkout.php', { method: 'POST', body: fd });
    const out = await res.json();

    const msg = document.getElementById('formMessage');
    msg.className = "mt-3 text-sm";

    if (out.status === 'success') {
      msg.textContent = "✅ " + out.message + " (" + out.order_number + ")";

      if (fd.get('payment_method') === 'UPI') {
        window.location.href = 'payment-verify.php?order_id=' + out.order_id;
      } else {
        window.location.href = 'checkout-success.php';
      }
    } else {
      msg.textContent = "❌ " + out.message;
      msg.classList.add("text-red-600");
    }
  });
});

// Fetch Cart Data
async function fetchCart() {
  const fd = new FormData();
  fd.append('csrf', csrfToken);
  fd.append('action', 'fetch_cart');

  const res = await fetch('checkout.php', { method: 'POST', body: fd });
  const out = await res.json();

  const wrap = document.getElementById('cartItems');
  const totals = document.getElementById('totals');

  wrap.innerHTML = "";
  totals.innerHTML = "";

  if (out.items.length === 0) {
    wrap.innerHTML = '<p class="text-gray-500">Cart is empty. <a href="cart.php" class="text-amber-600 underline">Go to Cart</a></p>';
    return;
  }

  out.items.forEach(it => {
    wrap.innerHTML += `
      <div class="flex justify-between items-center border-b py-2">
        <div class="flex items-center gap-2">
          <img src="${it.main_image}" class="w-12 h-12 object-cover rounded">
          <span>${it.title} × ${it.quantity}</span>
        </div>
        <span>₹${it.total}</span>
      </div>`;
  });

  totals.innerHTML = `
    <div class="flex justify-between"><span>Subtotal</span><span>₹${out.subtotal}</span></div>
    <div class="flex justify-between"><span>GST (3%)</span><span>₹${out.gst}</span></div>
    <div class="flex justify-between"><span>Making Charges (10%)</span><span>₹${out.making}</span></div>
    <div class="flex justify-between"><span>Shipping</span><span>₹${out.shipping}</span></div>
    <hr class="my-2">
    <div class="flex justify-between font-bold"><span>Total</span><span>₹${out.grand_total}</span></div>
  `;
}
</script>