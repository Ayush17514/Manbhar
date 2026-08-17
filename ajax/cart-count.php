<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

if (file_exists(__DIR__ . '/../includes/db.php')) {
    require_once __DIR__ . '/../includes/db.php';
} elseif (file_exists(__DIR__ . '/../../config/db.php')) {
    require_once __DIR__ . '/../../config/db.php';
}

$count = 0;
if (isset($_SESSION['user_id']) && isset($conn)) {
    try {
        $stmt = $conn->prepare("SELECT SUM(quantity) as cnt FROM cart WHERE user_id=?");
        $stmt->bind_param("i", $_SESSION['user_id']);
        $stmt->execute();
        $res = $stmt->get_result();
        if ($res && $row = $res->fetch_assoc()) {
            $count = intval($row['cnt'] ?? 0);
        }
    } catch (Exception $e) {
        $count = 0;
    }
} else if (!empty($_SESSION['cart']) && is_array($_SESSION['cart'])) {
    $count = array_sum($_SESSION['cart']);
}

header('Content-Type: application/json');
echo json_encode(['count' => $count]);
