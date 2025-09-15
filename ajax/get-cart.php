<?php
session_start();
require_once __DIR__ . '/../includes/db.php';

$user_id = $_SESSION['user_id'] ?? null;
$cart = [];

if ($user_id) {
    $stmt = $conn->prepare("SELECT p.id, p.name, p.price, c.quantity 
                            FROM cart c 
                            JOIN products p ON c.product_id = p.id 
                            WHERE c.user_id = ?");
    $stmt->execute([$user_id]);
    $cart = $stmt->fetchAll(PDO::FETCH_ASSOC);
} else {
    if (!empty($_SESSION['cart'])) {
        $placeholders = implode(',', array_fill(0, count($_SESSION['cart']), '?'));
        $stmt = $conn->prepare("SELECT id, name, price FROM products WHERE id IN ($placeholders)");
        $stmt->execute(array_keys($_SESSION['cart']));
        $products = $stmt->fetchAll(PDO::FETCH_ASSOC);

        foreach ($products as $product) {
            $product['quantity'] = $_SESSION['cart'][$product['id']];
            $cart[] = $product;
        }
    }
}

echo json_encode($cart);
?>
