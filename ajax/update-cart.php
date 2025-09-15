<?php
session_start();

// Ensure the cart session exists
if (!isset($_SESSION['cart']) || !is_array($_SESSION['cart'])) {
    $_SESSION['cart'] = [];
}

// Validate input
$product_id = filter_input(INPUT_POST, 'product_id', FILTER_VALIDATE_INT);
$quantity = filter_input(INPUT_POST, 'quantity', FILTER_VALIDATE_INT);

if (!$product_id || $quantity <= 0) {
    echo json_encode(["success" => false, "message" => "Invalid product ID or quantity"]);
    exit;
}

// Update cart quantity
$updated = false;
foreach ($_SESSION['cart'] as &$item) {
    if (is_array($item) && isset($item['id']) && $item['id'] === $product_id) {
        $item['quantity'] = $quantity;
        $updated = true;
        break;
    }
}

if ($updated) {
    echo json_encode(["success" => true, "message" => "Cart updated"]);
} else {
    echo json_encode(["success" => false, "message" => "Product not found in cart"]);
}
?>
