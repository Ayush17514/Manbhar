<?php
session_start();
require_once 'includes/db.php';
require_once 'includes/header.php';

// Redirect if not logged in
if (!isset($_SESSION['user_id'])) {
    header('Location: /login.php');
    exit;
}

// Handle form submission
$success = '';
$error = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = trim($_POST['name'] ?? '');
    $newPassword = $_POST['password'] ?? '';

    if (!empty($name)) {
        // Update name
        $stmt = $conn->prepare("UPDATE users SET name = ? WHERE id = ?");
        $stmt->bind_param("si", $name, $_SESSION['user_id']);
        $stmt->execute();
        $_SESSION['user_name'] = $name;
        $success = 'Profile updated successfully.';
    }

    if (!empty($newPassword)) {
        // Hash and update password
        $hashed = password_hash($newPassword, PASSWORD_DEFAULT);
        $stmt = $conn->prepare("UPDATE users SET password = ? WHERE id = ?");
        $stmt->bind_param("si", $hashed, $_SESSION['user_id']);
        $stmt->execute();
        $success .= ' Password updated.';
    }

    if (empty($name) && empty($newPassword)) {
        $error = 'Please fill in at least one field to update.';
    }
}
?>

<main class="max-w-4xl mx-auto py-10 px-4">
    <h1 class="text-3xl font-bold mb-6">My Profile</h1>

    <?php if ($success): ?>
        <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded mb-4">
            <?= htmlspecialchars($success) ?>
        </div>
    <?php elseif ($error): ?>
        <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
            <?= htmlspecialchars($error) ?>
        </div>
    <?php endif; ?>

    <form method="POST" class="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-10">
        <!-- Profile Avatar -->
        <div>
            <img src="/uploads/profile_placeholder.png" alt="Profile" class="w-32 h-32 rounded-full border-4 border-gray-300">
        </div>

        <!-- Profile Info -->
        <div class="flex-1 space-y-4">
            <div>
                <label class="block text-gray-600 mb-1">Name</label>
                <input type="text" name="name" class="border p-2 w-full rounded" value="<?= htmlspecialchars($_SESSION['user_name']) ?>">
            </div>
            <div>
                <label class="block text-gray-600 mb-1">Email</label>
                <input type="email" class="border p-2 w-full rounded bg-gray-100" value="<?= htmlspecialchars($_SESSION['user_email']) ?>" disabled>
            </div>
            <div>
                <label class="block text-gray-600 mb-1">New Password</label>
                <input type="password" name="password" class="border p-2 w-full rounded" placeholder="Leave blank to keep unchanged">
            </div>
            <div class="flex space-x-4">
                <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Update Profile</button>
                <a href="/logout.php" class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Logout</a>
            </div>
        </div>
    </form>
</main>
