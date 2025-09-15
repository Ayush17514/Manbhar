<?php
session_start();
require_once __DIR__.'/../includes/db.php';

$count = 0;

if (isset($_SESSION['user_id'])) {
    $stmt = $conn->prepare("SELECT COUNT(*) as cnt FROM wishlist WHERE user_id=?");
    $stmt->bind_param("i", $_SESSION['user_id']);
    $stmt->execute();
    $stmt->bind_result($cnt);
    $stmt->fetch();
    $count = intval($cnt);
    $stmt->close();
} else if (!empty($_SESSION['wishlist']) && is_array($_SESSION['wishlist'])) {
    // Filter out null/false/empty keys
    $validItems = array_filter($_SESSION['wishlist'], function($v) {
        return !empty($v);
    });
    $count = count($validItems);
}

header('Content-Type: application/json');
echo json_encode(['count' => $count]);
