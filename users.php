<?php
session_start();
require_once 'includes/db.php';
include 'includes/header.php';

//Check if user is admin
if (!isset($_SESSION['user_id']) || ($_SESSION['user_type'] ?? '') !== 'admin') {
    echo "<p class='text-center text-red-500 mt-10'>Access Denied.</p>";
    exit;
}

//Fetch users
$stmt = $conn->prepare("SELECT id, name, email, usertype, created_at FROM users ORDER BY id DESC");
$stmt->execute();
$res = $stmt->get_result();

$users = [];
while ($row = $res->fetch_assoc()) {
    $users[] = $row;
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Admin Panel</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 py-12">
  <div class="max-w mx-auto px-4 py-20 sticky-offset">
    <div class="flex min-h-screen">
        <!-- Sidebar -->
        <aside class="w-80 bg-white shadow-md py-6 px-4 space-y-4">
            <h2 class="text-xl font-bold text-pink-700 mb-6">Admin Panel</h2>
            <nav class="flex flex-col space-y-2 text-gray-700">
                <a href="/admin-panel" class="hover:text-pink-600">➕ Add Product</a>
                <a href="/manage-products" class="hover:text-pink-600">📦 Manage Products</a>
                <a href="/users" class="hover:text-pink-600 font-semibold">👥 View Users</a>
                <a href="/analytics" class="hover:text-pink-600">📈 Analytical</a>
                <a href="/logout" class="text-red-500 hover:underline mt-10">Logout</a>
            </nav>
        </aside>

        <!-- Main Content -->
        <main class="flex-1 p-8 max-w-5xl bg-white shadow-md rounded">
            <h1 class="text-3xl font-bold text-pink-700 mb-6">Manage Users</h1>

            <?php if (isset($_GET['msg'])): ?>
                <p class="mb-4 p-3 bg-green-100 text-green-700 rounded">
                    <?= htmlspecialchars($_GET['msg']) ?>
                </p>
            <?php endif; ?>

            <table class="min-w-full border border-gray-300 bg-white shadow rounded">
                <thead class="bg-pink-100">
                    <tr>
                        <th class="py-3 px-4 border-b text-left">ID</th>
                        <th class="py-3 px-4 border-b text-left">Name</th>
                        <th class="py-3 px-4 border-b text-left">Email</th>
                        <th class="py-3 px-4 border-b text-left">User Type</th>
                        <th class="py-3 px-4 border-b text-left">Created At</th>
                        <th class="py-3 px-4 border-b text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($users as $u): ?>
                        <tr class="hover:bg-gray-50">
                            <td class="py-2 px-4 border-b"><?= htmlspecialchars($u['id']) ?></td>
                            <td class="py-2 px-4 border-b"><?= htmlspecialchars($u['name']) ?></td>
                            <td class="py-2 px-4 border-b"><?= htmlspecialchars($u['email']) ?></td>
                            <td class="py-2 px-4 border-b"><?= htmlspecialchars($u['usertype']) ?></td>
                            <td class="py-2 px-4 border-b"><?= htmlspecialchars($u['created_at']) ?></td>
                            <td class="py-2 px-4 border-b text-center">
                                <?php if ($u['id'] != $_SESSION['user_id']): ?>
                                    <a href="ajax/delete-users.php?id=<?= $u['id'] ?>"
                                       onclick="return confirm('Are you sure you want to delete this user?');"
                                       class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-xs">
                                       Delete
                                    </a>
                                <?php else: ?>
                                    <span class="text-gray-400 text-xs">You</span>
                                <?php endif; ?>
                            </td>
                        </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        </main>
    </div>
  </div>
</body>
</html>
