<?php
// ajax/fetch-reviews.php
require_once '../includes/db.php';

$product_id = intval($_GET['product_id'] ?? 0);
if (!$product_id) {
    echo json_encode([]);
    exit;
}

$stmt = $conn->prepare("SELECT name, rating, comment, created_at FROM reviews WHERE product_id = ? ORDER BY created_at DESC");
$stmt->bind_param("i", $product_id);
$stmt->execute();
$res = $stmt->get_result();

$reviews = [];
while ($row = $res->fetch_assoc()) {
    $reviews[] = $row;
}

header('Content-Type: application/json');
echo json_encode($reviews);
