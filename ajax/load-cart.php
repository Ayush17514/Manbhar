<?php
session_start();
require_once '../includes/db.php';

$items = [];
$subtotal = 0.0;

// Helper: extract image & format
function formatItem($row, $qty) {
    $price = (float)$row['price'];
    $images = explode(',', $row['image']);
    $main = trim($images[0]);
    if (strpos($main, 'uploads/products/') !== 0) {
        $main = 'uploads/products/' . $main;
    }
    return [
        'id'       => (int)$row['id'] ?: (int)$row['product_id'],
        'title'    => $row['title'],
        'price'    => round($price, 2),
        'quantity' => $qty,
        'image'    => $main
    ];
}

// Logged-in user: from DB
if (isset($_SESSION['user_id'])) {
    $stmt = $conn->prepare("
        SELECT p.id, p.title, p.image, p.price, c.quantity 
        FROM cart c
        JOIN products p ON c.product_id = p.id
        WHERE c.user_id = ?
    ");
    $stmt->bind_param("i", $_SESSION['user_id']);
    $stmt->execute();
    $res = $stmt->get_result();
    while ($row = $res->fetch_assoc()) {
        $qty = (int)$row['quantity'];
        $subtotal += (float)$row['price'] * $qty;
        $items[] = formatItem($row, $qty);
    }
    $stmt->close();
}
// Guest user: from SESSION
elseif (!empty($_SESSION['cart']) && is_array($_SESSION['cart'])) {
    foreach ($_SESSION['cart'] as $pid => $qty) {
        $qty = (int)$qty;
        $stmt = $conn->prepare("SELECT id, title, image, price FROM products WHERE id = ?");
        $stmt->bind_param("i", $pid);
        $stmt->execute();
        $res = $stmt->get_result();
        if ($row = $res->fetch_assoc()) {
            $subtotal += (float)$row['price'] * $qty;
            $items[] = formatItem($row, $qty);
        }
        $stmt->close();
    }
}

// Financial breakdown
$gst = round($subtotal * 0.03, 2);
$shipping = 200;
$grandTotal = round($subtotal + $gst + $shipping, 2);

// Send JSON
header('Content-Type: application/json');
echo json_encode([
    'items'      => $items,
    'subtotal'   => round($subtotal, 2),
    'gst'        => $gst,
    'shipping'     => $shipping,
    'grandTotal' => $grandTotal
]);
