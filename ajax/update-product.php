<?php
include 'db.php';
$id = $_POST['id'];
$title = $_POST['title'];
$description = $_POST['description'];
$category = $_POST['category'];
$image_url = $_POST['image_url'];
$price = $_POST['price'];
$tags = $_POST['tags'];

$stmt = $conn->prepare("UPDATE products SET title=?, description=?, category=?, image_url=?, price=?, tags=? WHERE id=?");
$stmt->bind_param("ssssdsi", $title, $description, $category, $image_url, $price, $tags, $id);

if ($stmt->execute()) {
  echo json_encode(['status' => 'success']);
} else {
  echo json_encode(['status' => 'fail', 'message' => $stmt->error]);
}
$stmt->close();
$conn->close();
?>