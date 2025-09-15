<?php
session_start();
require_once '../includes/db.php';

$product_id = intval($_POST['product_id']);
$user_id = $_SESSION['user_id'] ?? null;

if ($user_id) {
    $stmt = $conn->prepare("DELETE FROM wishlist WHERE user_id = ? AND product_id = ?");
    $stmt->bind_param("ii", $user_id, $product_id);
    $stmt->execute();
    $stmt->close();
} else {
    // Remove item from session wishlist
    if (isset($_SESSION['wishlist'][$product_id])) {
        unset($_SESSION['wishlist'][$product_id]);
    }

    // Clean up if wishlist is empty
    if (empty($_SESSION['wishlist'])) {
        unset($_SESSION['wishlist']);
    }
}

echo json_encode(['status' => 'success']);
