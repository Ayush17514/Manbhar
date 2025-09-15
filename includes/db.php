<?php
$servername = "localhost";
$username = "klmvjenl_jaincabs";
$password = "v4TZnVWZbCuYyGY37Exy";
$dbname = "klmvjenl_jaincabs";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
