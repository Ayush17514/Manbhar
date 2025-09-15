<?php
session_start();
require_once '../includes/db.php';

$items = [];

if (isset($_SESSION['user_id'])) {
    $stmt = $conn->prepare("SELECT p.id, p.title, p.price, p.image, c.quantity FROM cart c JOIN products p ON c.product_id = p.id WHERE c.user_id = ?");
    $stmt->bind_param("i", $_SESSION['user_id']);
    $stmt->execute();
    $result = $stmt->get_result();
    while ($row = $result->fetch_assoc()) {
        $items[] = $row;
    }
    $stmt->close();
} else {
    if (isset($_SESSION['cart']) && is_array($_SESSION['cart'])) {
        foreach ($_SESSION['cart'] as $pid) {
            $stmt = $conn->prepare("SELECT id, title, price, image FROM products WHERE id = ?");
            $stmt->bind_param("i", $pid);
            $stmt->execute();
            $result = $stmt->get_result();
            if ($row = $result->fetch_assoc()) {
                $row['quantity'] = 1; // default qty
                $items[] = $row;
            }
            $stmt->close();
        }
    }
}

if (empty($items)) {
    echo "<p>Your cart is empty.</p>";
} else {
    foreach ($items as $item) {
        echo '<div class="flex items-center space-x-4 mb-4 border-b pb-2">';
        echo '<img src="'.htmlspecialchars($item['image']).'" class="w-16 h-16 object-cover rounded" />';
        echo '<div>';
        echo '<h3 class="font-semibold">'.htmlspecialchars($item['title']).'</h3>';
        echo '<p class="text-pink-700 font-bold">₹'.htmlspecialchars($item['price']).'</p>';
        echo '<p class="text-sm text-gray-600">Qty: '.htmlspecialchars($item['quantity']).'</p>';
        echo '</div>';
        echo '</div>';
    }
}
?>
