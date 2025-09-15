<?php
session_start();
require_once '../includes/db.php';
header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);
if(!$data) { echo json_encode(['status'=>'error','msg'=>'No data']); exit; }

$user_id = $_SESSION['user_id'] ?? null;
$product_id = $data['product_id'] ?? null;
$event_type = $data['event_type'] ?? null;
$search_query = $data['search_query'] ?? null;
$button_name = $data['button_name'] ?? null;

$stmt = $conn->prepare("
    INSERT INTO user_events (user_id, product_id, event_type, search_query, button_name, timestamp)
    VALUES (?, ?, ?, ?, ?, NOW())
");
$stmt->bind_param("iisss", $user_id, $product_id, $event_type, $search_query, $button_name);
if($stmt->execute()){
    echo json_encode(['status'=>'success']);
}else{
    echo json_encode(['status'=>'error','msg'=>$stmt->error]);
}
