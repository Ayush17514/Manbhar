<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once '../includes/db.php';

// Read POST data
$title = $_POST['title'] ?? '';
$desc = $_POST['description'] ?? '';
$price = $_POST['price'] ?? 0;
$category = $_POST['category'] ?? '';
$new_category = $_POST['new_category'] ?? '';
$tag = $_POST['tag'] ?? '';
$size = $_POST['size'] ?? '';
$dimensions = $_POST['dimensions'] ?? '';
$material = $_POST['material'] ?? '';
$stones = $_POST['stones'] ?? '';
$gross_weight = $_POST['gross_weight'] ?? 0;
$metal_weight = $_POST['metal_weight'] ?? 0;
$stone_weight = $_POST['stone_weight'] ?? 0;
$additional_info = $_POST['additional_info'] ?? '';

$imagePaths = [];
$videoPath = '';

// ✅ Use custom category if selected
if ($category === 'Other' && !empty($new_category)) {
    $category = $new_category;
}

// Handle multiple image uploads
if (!empty($_FILES['images']['name'][0])) {
    $uploadDir = '../uploads/products/';
    if (!file_exists($uploadDir)) mkdir($uploadDir, 0777, true);

    foreach ($_FILES['images']['name'] as $key => $name) {
        $tmpName = $_FILES['images']['tmp_name'][$key];
        $ext = pathinfo($name, PATHINFO_EXTENSION);
        $safeName = time() . "_" . uniqid() . "." . $ext;
        $destination = $uploadDir . $safeName;

        if (move_uploaded_file($tmpName, $destination)) {
            $imagePaths[] = substr($destination, 3); // remove '../' for DB path
        }
    }
}

// Handle video upload (optional)
if (isset($_FILES['video']) && $_FILES['video']['error'] === UPLOAD_ERR_OK) {
    $videoDir = '../uploads/videos/';
    if (!file_exists($videoDir)) mkdir($videoDir, 0777, true);

    $videoName = time() . '_' . basename($_FILES['video']['name']);
    $videoTarget = $videoDir . $videoName;

    if (move_uploaded_file($_FILES['video']['tmp_name'], $videoTarget)) {
        $videoPath = substr($videoTarget, 3); // remove '../'
    }
}

// Insert into DB if valid
if (!empty($imagePaths) && $title && $desc && $price > 0) {
    $imagesString = implode(',', $imagePaths);
    $stmt = $conn->prepare("INSERT INTO products (title, description, price, category, tag, image, video, size, dimensions, material, stones, gross_weight, metal_weight, stone_weight, additional_info) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("ssissssssssdddd", $title, $desc, $price, $category, $tag, $imagesString, $videoPath, $size, $dimensions, $material, $stones, $gross_weight, $metal_weight, $stone_weight, $additional_info);

    if ($stmt->execute()) {
        header("Location: ../admin-panel.php?success=1");
        exit;
    } else {
        echo "Database error: " . $stmt->error;
    }
    $stmt->close();
} else {
    echo "Failed to add product. Please ensure all required fields are filled and at least one image is uploaded.";
}

$conn->close();
