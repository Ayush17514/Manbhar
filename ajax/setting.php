<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
if (file_exists(__DIR__ . '/../includes/db.php')) {
    require_once __DIR__ . '/../includes/db.php';
} elseif (file_exists(__DIR__ . '/../config/db.php')) {
    require_once __DIR__ . '/../config/db.php';
}

// Redirect if user is not logged in
if (!isset($_SESSION['user_id'])) {
    header("Location: api/login.php");
    exit();
}

// Fetch user details
$user_id = $_SESSION['user_id'];
$stmt = $conn->prepare("SELECT * FROM users WHERE id = ?");
$stmt->bind_param("i", $user_id);
$stmt->execute();
$user = $stmt->get_result()->fetch_assoc();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Account Settings</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 text-gray-800">
    <?php include 'components/header.php'; ?>

    <main class="container mx-auto py-10">
        <div class="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
            <h2 class="text-2xl font-bold text-gray-800 mb-4">⚙ Account Settings</h2>

            <form action="api/update-settings.php" method="POST">
                <label class="block text-gray-700">Name:</label>
                <input type="text" name="name" value="<?= htmlspecialchars($user['name']) ?>" class="w-full p-2 border rounded mb-4">

                <label class="block text-gray-700">Email:</label>
                <input type="email" name="email" value="<?= htmlspecialchars($user['email']) ?>" class="w-full p-2 border rounded mb-4">

                <label class="block text-gray-700">Password:</label>
                <input type="password" name="password" class="w-full p-2 border rounded mb-4">

                <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    Save Changes
                </button>
            </form>
        </div>
    </main>

    <?php include 'components/footer.php'; ?>
</body>
</html>
