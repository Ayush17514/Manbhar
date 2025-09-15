<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);
session_start();

require_once __DIR__ . '/../includes/db.php';

$product_id = $_POST['product_id'] ?? null;
if (!$product_id) {
    http_response_code(400);
    echo json_encode(['error' => 'Product ID missing']);
    exit;
}

$user_id = $_SESSION['user_id'] ?? null;

// Add to cart
if ($user_id) {
    $stmt = $conn->prepare("INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, 1)
                            ON DUPLICATE KEY UPDATE quantity = quantity + 1");
    $stmt->bind_param("ii", $user_id, $product_id);
    $stmt->execute();
    $stmt->close();

    // Get cart count
    $stmt = $conn->prepare("SELECT SUM(quantity) as cnt FROM cart WHERE user_id=?");
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    $stmt->bind_result($cnt);
    $stmt->fetch();
    $cartCount = intval($cnt);
    $stmt->close();
} else {
    // Guest user
    if (!isset($_SESSION['cart'])) {
        $_SESSION['cart'] = [];
    }
    if (isset($_SESSION['cart'][$product_id])) {
        $_SESSION['cart'][$product_id]++;
    } else {
        $_SESSION['cart'][$product_id] = 1;
    }
    $cartCount = array_sum($_SESSION['cart']);
}

// Now return updated cart drawer content:
ob_start();
include __DIR__ . '/load-cart.php';
$drawer_html = ob_get_clean();

echo json_encode([
    'success' => true,
    'count' => $cartCount,
    'drawer_html' => $drawer_html
]);
?>
