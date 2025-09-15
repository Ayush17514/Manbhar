<?php
session_start();
require_once __DIR__.'/../includes/db.php';

$count = 0;
if(isset($_SESSION['user_id'])) {
  $stmt = $conn->prepare("SELECT SUM(quantity) as cnt FROM cart WHERE user_id=?");
  $stmt->bind_param("i",$_SESSION['user_id']);
  $stmt->execute();
  $stmt->bind_result($cnt);
  $stmt->fetch();
  $count = intval($cnt);
} else if(!empty($_SESSION['cart'])) {
  $count = array_sum($_SESSION['cart']);
}

header('Content-Type:application/json');
echo json_encode(['count'=>$count]);
