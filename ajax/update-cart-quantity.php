<?php
session_start();
require_once '../includes/db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['product_id'], $_POST['quantity'])) {
    $pid = (int) $_POST['product_id'];
    $qty = (int) $_POST['quantity'];

    if ($qty < 1) {
        echo json_encode(['success' => false, 'message' => 'Quantity must be at least 1.']);
        exit;
    }

    if (isset($_SESSION['user_id'])) {
        $uid = $_SESSION['user_id'];
        $stmt = $conn->prepare("UPDATE cart SET quantity = ? WHERE user_id = ? AND product_id = ?");
        $stmt->bind_param("iii", $qty, $uid, $pid);
        $stmt->execute();
    } else {
        if (isset($_SESSION['cart'][$pid])) {
            $_SESSION['cart'][$pid] = $qty;
        }
    }

    echo json_encode(['success' => true]);
}
