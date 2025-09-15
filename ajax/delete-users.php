<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
session_start();
require_once __DIR__ . '/../includes/db.php';


//Ensure only admin can access
if (!isset($_SESSION['user_id']) || ($_SESSION['user_type'] ?? '') !== 'admin') {
    echo "<p style='color:red; text-align:center; margin-top:20px;'>Access Denied.</p>";
    exit;
}

//Check if user_id is provided
if (!isset($_GET['id']) || !is_numeric($_GET['id'])) {
    echo "<p style='color:red; text-align:center; margin-top:20px;'>Invalid request.</p>";
    exit;
}

$user_id = intval($_GET['id']);

//Prevent admin from deleting themselves
if ($user_id == $_SESSION['user_id']) {
    echo "<p style='color:red; text-align:center; margin-top:20px;'>You cannot delete your own account while logged in as admin.</p>";
    exit;
}

//Delete user securely
$stmt = $conn->prepare("DELETE FROM users WHERE id = ?");
$stmt->bind_param("i", $user_id);

if ($stmt->execute()) {
    header("Location: ../users.php?msg=User+deleted+successfully");
    exit;
} else {
    echo "<p style='color:red; text-align:center; margin-top:20px;'>Error deleting user: " . htmlspecialchars($conn->error) . "</p>";
}
$stmt->close();
$conn->close();
?>
