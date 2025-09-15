<?php
session_start();
require 'includes/db.php';
require 'vendor/autoload.php';

use Square\SquareClient;
use Square\Environments;

$order_number = $_GET['order_number'];

$client = new SquareClient([
    'accessToken' => getenv('SQUARE_ACCESS_TOKEN'),
    'environment' => Environments::Sandbox
]);

// Check order payment_status in DB
$stmt = $conn->prepare("SELECT payment_status FROM orders WHERE order_number=? LIMIT 1");
$stmt->bind_param("s",$order_number);
$stmt->execute();
$res = $stmt->get_result()->fetch_assoc();

echo json_encode([
    "status" => $res['payment_status']
]);
