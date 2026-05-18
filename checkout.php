<?php
session_start();
require 'includes/db.php';
require 'config/razorpay.php';
require 'vendor/autoload.php';

use Razorpay\Api\Api;

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
        // ... (OTP logic remains the same)
    }

    // 2️⃣ VERIFY OTP
    if ($action === 'verify_otp') {
        // ... (OTP logic remains the same)
    }

    // 3️⃣ FETCH CART
    if ($action === 'fetch_cart') {
        // ... (Cart fetching logic remains the same)
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
        // ... (cart item calculation remains the same)

        $gst=$subtotal*0.03;
        $making=$subtotal*0.1;
        $ship=($subtotal>5000)?0:50;
        $grand=$subtotal+$gst+$making+$ship;

        $order_no='MB'.date('Ymd').strtoupper(substr(bin2hex(random_bytes(3)),0,6));
        $pay_status = ($pay_method === 'COD') ? 'Pending' : 'Initiated';

        $conn->begin_transaction();
        try {
            // ... (order insertion logic remains the same)

            if ($pay_method === 'Razorpay') {
                $api = new Api(RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET);
                $razorpay_order = $api->order->create([
                    'receipt'         => $order_no,
                    'amount'          => $grand * 100, // amount in paisa
                    'currency'        => 'INR',
                    'payment_capture' => 1
                ]);

                $razorpay_order_id = $razorpay_order['id'];
                $stmt = $conn->prepare("UPDATE orders SET razorpay_order_id=? WHERE id=?");
                $stmt->bind_param("si", $razorpay_order_id, $order_id);
                $stmt->execute();

                echo json_encode([
                    'status' => 'success',
                    'message' => 'Order placed, redirecting to payment.',
                    'order_id' => $order_id,
                    'razorpay_order_id' => $razorpay_order_id,
                    'key' => RAZORPAY_KEY_ID,
                    'amount' => $grand * 100,
                    'name' => 'Manbhar Jewellers',
                    'description' => 'Order #' . $order_no,
                    'prefill' => [
                        'name' => $name,
                        'email' => $email,
                        'contact' => $phone
                    ]
                ]);

            } else { // COD
                echo json_encode(['status'=>'success','message'=>'Order placed successfully','order_number'=>$order_no,'order_id'=>$order_id]);
            }
            $conn->commit();
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
        <!-- ... (Steps 1 and 2 remain the same) -->

        <!-- Step 3: Payment -->
        <div class="step opacity-50 pointer-events-none" id="step3">
          <h2 class="font-semibold text-lg mb-2">3. Payment Options</h2>
          <div class="step-content hidden">
            <form id="paymentForm" class="space-y-3">
              <select name="payment_method" class="w-full border rounded px-3 py-2">
                <option value="COD">Cash on Delivery</option>
                <option value="Razorpay">Pay with Razorpay</option>
              </select>
              <button type="submit" class="bg-amber-600 text-white px-4 py-2 rounded">Place Order</button>
            </form>
            <div id="formMessage" class="mt-3 text-sm"></div>
          </div>
        </div>
      </div>

      <!-- RIGHT: Order Summary -->
      <div class="bg-white p-6 rounded-lg shadow">
        <!-- ... (Order summary remains the same) -->
      </div>
    </div>
  </div>
</main>
<script src="https://checkout.razorpay.com/v1/checkout.js"></script>
<script>
  const csrfToken = "<?= $csrf ?>";
</script>
<script>
document.addEventListener('DOMContentLoaded', () => {
  // ... (OTP and Cart logic remains the same)

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
      if (fd.get('payment_method') === 'Razorpay') {
        const options = {
            key: out.key,
            amount: out.amount,
            currency: 'INR',
            name: out.name,
            description: out.description,
            order_id: out.razorpay_order_id,
            handler: function (response){
                window.location.href = `razorpay-verify.php?order_id=${out.order_id}&payment_id=${response.razorpay_payment_id}&signature=${response.razorpay_signature}`;
            },
            prefill: out.prefill,
            theme: {
                color: "#F37254"
            }
        };
        const rzp1 = new Razorpay(options);
        rzp1.open();
      } else { // COD
        window.location.href = 'checkout-success.php';
      }
    } else {
      msg.textContent = "❌ " + out.message;
      msg.classList.add("text-red-600");
    }
  });
});

// ... (fetchCart function remains the same)
</script>
