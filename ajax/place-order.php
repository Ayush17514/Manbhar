<?php
// ajax/place-order.php
session_start();
require_once '../includes/db.php'; // adjust path to your db include

header('Content-Type: application/json; charset=utf-8');

$user_id = $_SESSION['user_id'] ?? null;

// validate POST
$required = ['name','phone','address','payment_method'];
foreach ($required as $r) {
    if (empty($_POST[$r])) {
        echo json_encode(['success'=>false,'message'=>"$r is required"]);
        exit;
    }
}

$name = trim($_POST['name']);
$phone = trim($_POST['phone']);
$email = trim($_POST['email'] ?? '');
$address = trim($_POST['address']);
$pincode = trim($_POST['pincode'] ?? '');
$payment_method = trim($_POST['payment_method']);

// CONFIG: shipping, gst percent, making charges (change as needed)
$GST_PERCENT = 3.0;               // 3%
$SHIPPING_CHARGE = 50.00;         // fixed shipping
$MAKING_CHARGES = 0.00;           // if you have making charges logic, replace

// Build cart items array: if logged in, read from DB cart table, else from session cart
$cart_items = [];
if ($user_id) {
    $sql = "SELECT c.product_id AS id, p.title, p.price, p.images, c.quantity 
            FROM cart c JOIN products p ON c.product_id = p.id
            WHERE c.user_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    $res = $stmt->get_result();
    while ($r = $res->fetch_assoc()) {
        $cart_items[] = $r;
    }
    $stmt->close();
} else {
    // session cart expected format: $_SESSION['cart'][product_id] = qty
    if (!empty($_SESSION['cart']) && is_array($_SESSION['cart'])) {
        $ids = array_keys($_SESSION['cart']);
        if (count($ids)) {
            // fetch product details in one query
            $placeholders = implode(',', array_fill(0, count($ids), '?'));
            $types = str_repeat('i', count($ids));
            $sql = "SELECT id, title, price, images FROM products WHERE id IN ($placeholders)";
            $stmt = $conn->prepare($sql);
            // bind params dynamically
            $stmt->bind_param($types, ...$ids);
            $stmt->execute();
            $res = $stmt->get_result();
            while ($r = $res->fetch_assoc()) {
                $r['quantity'] = intval($_SESSION['cart'][$r['id']] ?? 0);
                $cart_items[] = $r;
            }
            $stmt->close();
        }
    }
}

// if no items
if (empty($cart_items)) {
    echo json_encode(['success'=>false,'message'=>'Cart is empty']);
    exit;
}

// calculate totals
$subtotal = 0.0;
foreach ($cart_items as $ci) {
    $qty = max(1, intval($ci['quantity']));
    $price = (float)$ci['price'];
    $subtotal += $price * $qty;
}
$gst = round(($GST_PERCENT/100.0) * $subtotal, 2);
$shipping = (float)$SHIPPING_CHARGE;
$making = (float)$MAKING_CHARGES;
$grand_total = round($subtotal + $gst + $shipping + $making, 2);

// Begin transaction
$conn->begin_transaction();

try {
    // generate unique order number
    $order_number = 'MB'.date('Ymd').strtoupper(substr(bin2hex(random_bytes(3)),0,6));

    $ins = $conn->prepare("INSERT INTO orders 
        (order_number, user_id, name, phone, email, address, pincode, payment_method, subtotal, gst, shipping, making_charges, grand_total, payment_status)
        VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)");
    // default payment_status: pending (if COD - we can mark pending or paid depending)
    $payment_status = ($payment_method === 'cod') ? 'pending' : 'pending';
    $ins->bind_param("sissssssddddds", 
        $order_number, $user_id, $name, $phone, $email, $address, $pincode, $payment_method, $subtotal, $gst, $shipping, $making, $grand_total, $payment_status
    );
    $ok = $ins->execute();
    if (!$ok) throw new Exception("Could not create order: " . $ins->error);
    $order_id = $ins->insert_id;
    $ins->close();

    // insert order items
    $itmStmt = $conn->prepare("INSERT INTO order_items (order_id, product_id, title, price, quantity, subtotal) VALUES (?,?,?,?,?,?)");
    foreach ($cart_items as $ci) {
        $pid = intval($ci['id']);
        $title = $ci['title'];
        $price = (float)$ci['price'];
        $qty = max(1, intval($ci['quantity']));
        $line = round($price * $qty, 2);
        $itmStmt->bind_param("iisdid", $order_id, $pid, $title, $price, $qty, $line);
        if (!$itmStmt->execute()) {
            throw new Exception("Could not insert order item: " . $itmStmt->error);
        }
    }
    $itmStmt->close();

    // clear cart: if logged in, delete cart rows, else unset session
    if ($user_id) {
        $del = $conn->prepare("DELETE FROM cart WHERE user_id = ?");
        $del->bind_param("i", $user_id);
        $del->execute();
        $del->close();
    } else {
        unset($_SESSION['cart']);
    }

    // commit
    $conn->commit();

    // success response
    echo json_encode([
        'success' => true,
        'message' => 'Order placed successfully',
        'order_id' => $order_id,
        'order_number' => $order_number,
        'grand_total' => $grand_total
    ]);
    exit;

} catch (Exception $e) {
    $conn->rollback();
    error_log("Place order error: " . $e->getMessage());
    echo json_encode(['success'=>false,'message'=>'Failed to place order. Please try again.']);
    exit;
}
