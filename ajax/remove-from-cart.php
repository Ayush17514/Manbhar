<?php
session_start();
require_once __DIR__ . '/../includes/db.php';

$product_id = intval($_POST['product_id']);
$user_id = $_SESSION['user_id'] ?? null;

if ($user_id) {
    $stmt = $conn->prepare("DELETE FROM cart WHERE user_id = ? AND product_id = ?");
    $stmt->execute([$user_id, $product_id]);
} else {
    unset($_SESSION['cart'][$product_id]);
}

echo json_encode(['status' => 'success']);
?>
