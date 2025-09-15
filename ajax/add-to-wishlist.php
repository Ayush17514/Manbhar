<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);
session_start();

require_once __DIR__ . '/../includes/db.php';

header('Content-Type: application/json');

$product_id = intval($_POST['product_id']);
$user_id = $_SESSION['user_id'] ?? null;
$action = ''; // 'added' or 'removed'

if ($user_id) {
    $stmt = $conn->prepare("SELECT id FROM wishlist WHERE user_id = ? AND product_id = ?");
    $stmt->bind_param("ii", $user_id, $product_id);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        // Remove from DB
        $stmt->close();
        $del = $conn->prepare("DELETE FROM wishlist WHERE user_id = ? AND product_id = ?");
        $del->bind_param("ii", $user_id, $product_id);
        $del->execute();
        $del->close();
        $action = 'removed';
    } else {
        // Add to DB
        $stmt->close();
        $add = $conn->prepare("INSERT INTO wishlist (user_id, product_id) VALUES (?, ?)");
        $add->bind_param("ii", $user_id, $product_id);
        $add->execute();
        $add->close();
        $action = 'added';
    }

    // Updated count
    $stmt = $conn->prepare("SELECT COUNT(*) FROM wishlist WHERE user_id=?");
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    $stmt->bind_result($count);
    $stmt->fetch();
    $stmt->close();
} else {
    if (!isset($_SESSION['wishlist'])) $_SESSION['wishlist'] = [];

    if (isset($_SESSION['wishlist'][$product_id])) {
        unset($_SESSION['wishlist'][$product_id]);
        $action = 'removed';
    } else {
        $_SESSION['wishlist'][$product_id] = true;
        $action = 'added';
    }

    $count = count($_SESSION['wishlist']);
}

echo json_encode([
    'success' => true,
    'action' => $action,
    'count' => $count
]);
