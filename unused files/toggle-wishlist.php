<?php
session_start();
require_once __DIR__ . '/../includes/db.php';

$user_id = $_SESSION['user_id'] ?? null;
$wishlist = [];

if ($user_id) {
    $stmt = $conn->prepare("SELECT p.id, p.name, p.price, p.image_url
                            FROM wishlist w
                            JOIN products p ON w.product_id = p.id
                            WHERE w.user_id = ?");
    $stmt->execute([$user_id]);
    $wishlist = $stmt->fetchAll(PDO::FETCH_ASSOC);
} else {
    if (!empty($_SESSION['wishlist'])) {
        $placeholders = implode(',', array_fill(0, count($_SESSION['wishlist']), '?'));
        $stmt = $conn->prepare("SELECT id, name, price, image_url FROM products WHERE id IN ($placeholders)");
        $stmt->execute(array_keys($_SESSION['wishlist']));
        $wishlist = $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}

echo json_encode($wishlist);
?>
