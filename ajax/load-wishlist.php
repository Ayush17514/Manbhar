<?php
session_start();
require_once '../includes/db.php';

$items = [];

if (isset($_SESSION['user_id'])) {
    $stmt = $conn->prepare("SELECT p.id, p.title, p.price, p.image 
                            FROM wishlist w 
                            JOIN products p ON w.product_id = p.id 
                            WHERE w.user_id = ?");
    $stmt->bind_param("i", $_SESSION['user_id']);
    $stmt->execute();
    $result = $stmt->get_result();
    while ($row = $result->fetch_assoc()) {
        $images = explode(',', $row['image']);
        $firstImage = trim($images[0]);
        if (strpos($firstImage, 'uploads/products/') !== 0) {
            $firstImage = 'uploads/products/' . $firstImage;
        }
        $items[] = [
            'id'    => $row['id'],
            'title' => $row['title'],
            'price' => $row['price'],
            'image' => $firstImage
        ];
    }
    $stmt->close();
} elseif (!empty($_SESSION['wishlist']) && is_array($_SESSION['wishlist'])) {
    $ids = array_keys($_SESSION['wishlist']);
    $placeholders = implode(',', array_fill(0, count($ids), '?'));
    $types = str_repeat('i', count($ids));
    $stmt = $conn->prepare("SELECT id, title, price, image FROM products WHERE id IN ($placeholders)");
    $stmt->bind_param($types, ...$ids);
    $stmt->execute();
    $result = $stmt->get_result();
    while ($row = $result->fetch_assoc()) {
        $images = explode(',', $row['image']);
        $firstImage = trim($images[0]);
        if (strpos($firstImage, 'uploads/products/') !== 0) {
            $firstImage = 'uploads/products/' . $firstImage;
        }
        $items[] = [
            'id'    => $row['id'],
            'title' => $row['title'],
            'price' => $row['price'],
            'image' => $firstImage
        ];
    }
    $stmt->close();
}

// Output JSON for drawer.js
header('Content-Type: application/json');
echo json_encode(['items' => $items]);
