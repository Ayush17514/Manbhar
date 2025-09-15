<?php
// ajax/submit-review.php
session_start();
require_once '../includes/db.php';

$product_id = intval($_POST['product_id'] ?? 0);
$rating = intval($_POST['rating'] ?? 0);
$name = trim($_POST['name'] ?? '');
$comment = trim($_POST['comment'] ?? '');

if ($product_id && $rating && $name && $comment) {
    $stmt = $conn->prepare("INSERT INTO reviews (product_id, name, rating, comment, created_at) VALUES (?, ?, ?, ?, NOW())");
    $stmt->bind_param("isis", $product_id, $name, $rating, $comment);
    if ($stmt->execute()) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'error' => 'Database error.']);
    }
    $stmt->close();
} else {
    echo json_encode(['success' => false, 'error' => 'Invalid input.']);
}
?>
