<?php
session_start();
require_once '../includes/db.php';

// Check admin access
if (!isset($_SESSION['user_id']) || $_SESSION['user_type'] !== 'admin') {
    die('Access denied.');
}

// Handle deletion
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['product_id'])) {
    $product_id = intval($_POST['product_id']);

    // Optional: you can also delete the image file if needed

    // Delete from DB
    $stmt = $conn->prepare("DELETE FROM products WHERE id = ?");
    $stmt->bind_param("i", $product_id);
    $stmt->execute();

    // Redirect back to product list
    header("Location:../manage-products.php");
    exit;
} else {
    echo "Invalid request.";
}
?>
