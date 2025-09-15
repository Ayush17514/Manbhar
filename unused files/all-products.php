<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

session_start();
require_once 'includes/db.php';
include 'includes/header.php';

// Check if admin
if (!isset($_SESSION['user_id']) || $_SESSION['user_type'] !== 'admin') {
    echo "<p class='text-center text-red-500 mt-10'>Access denied. Admins only.</p>";
    exit;
}

// Handle product update
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['update_product'])) {
    $id = intval($_POST['product_id']);
    $title = trim($_POST['title']);
    $price = floatval($_POST['price']);
    $category = trim($_POST['category']);
    $tag = trim($_POST['tag']);

    $stmt = $conn->prepare("UPDATE products SET title = ?, price = ?, category = ?, tag = ? WHERE id = ?");
    $stmt->bind_param("sdssi", $title, $price, $category, $tag, $id);
    $stmt->execute();

    header("Location: all-products.php");
    exit;
}

// Fetch all products
$stmt = $conn->prepare("SELECT * FROM products ORDER BY id DESC");
$stmt->execute();
$res = $stmt->get_result();

$products = [];
while ($row = $res->fetch_assoc()) {
    $products[] = $row;
}

// Get edit id (if any)
$edit_id = isset($_GET['edit_id']) ? intval($_GET['edit_id']) : 0;
?>

<body class="bg-gray-100">
<div class="flex min-h-screen">
    <!-- Sidebar -->
    <aside class="w-64 bg-white shadow-md py-6 px-4 space-y-4">
        <h2 class="text-xl font-bold text-pink-700 mb-6">Admin Panel</h2>
        <nav class="flex flex-col space-y-2 text-gray-700">
            <a href="admin-panel.php" class="hover:text-pink-600">➕ Add Product</a>
            <a href="all-products.php" class="hover:text-pink-600 font-bold">📦 Manage Products</a>
            <a href="users.php" class="hover:text-pink-600">👥 View Users</a>
            <a href="logout.php" class="text-red-500 hover:underline mt-10">Logout</a>
        </nav>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 p-8 bg-white">
        <div class="flex justify-between items-center mb-6">
            <h1 class="text-3xl font-bold text-pink-700 mb-6">Manage Products</h1>
            <a href="add-product.php" class="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600">+ Add Product</a>
        </div>

        <div class="overflow-x-auto">
            <table class="min-w-full bg-white border border-gray-200 text-left text-sm text-gray-700">
                <thead class="bg-gray-100 text-xs uppercase text-gray-500">
                    <tr>
                        <th class="px-4 py-3 border">ID</th>
                        <th class="px-4 py-3 border">Image</th>
                        <th class="px-4 py-3 border">Title</th>
                        <th class="px-4 py-3 border">Price</th>
                        <th class="px-4 py-3 border">Category</th>
                        <th class="px-4 py-3 border">Tag</th>
                        <th class="px-4 py-3 border">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($products as $p): ?>
                        <tr class="hover:bg-gray-50">
                            <td class="px-4 py-3 border"><?= $p['id'] ?></td>
                            <td class="px-4 py-3 border">
                                <img src="<?= htmlspecialchars($p['image']) ?>" alt="<?= htmlspecialchars($p['title']) ?>"
                                     class="w-16 h-16 object-cover rounded">
                            </td>

                            <?php if ($edit_id === $p['id']): ?>
                                <!-- Edit Mode -->
                                <form method="POST" action="all-products.php" class="contents">
                                    <input type="hidden" name="update_product" value="1">
                                    <input type="hidden" name="product_id" value="<?= $p['id'] ?>">
                                    <td class="px-4 py-3 border">
                                        <input type="text" name="title" value="<?= htmlspecialchars($p['title']) ?>"
                                               class="border p-1 w-full">
                                    </td>
                                    <td class="px-4 py-3 border">
                                        <input type="number" name="price" value="<?= htmlspecialchars($p['price']) ?>"
                                               step="0.01" class="border p-1 w-full">
                                    </td>
                                    <td class="px-4 py-3 border">
                                        <input type="text" name="category" value="<?= htmlspecialchars($p['category']) ?>"
                                               class="border p-1 w-full">
                                    </td>
                                    <td class="px-4 py-3 border">
                                        <input type="text" name="tag" value="<?= htmlspecialchars($p['tag']) ?>"
                                               class="border p-1 w-full">
                                    </td>
                                    <td class="px-4 py-3 border space-x-2">
                                        <button type="submit"
                                                class="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 text-xs">
                                            Save
                                        </button>
                                        <a href="all-products.php"
                                           class="bg-gray-400 text-white px-2 py-1 rounded hover:bg-gray-500 text-xs">
                                            Cancel
                                        </a>
                                    </td>
                                </form>
                            <?php else: ?>
                                <!-- Normal Row -->
                                <td class="px-4 py-3 border"><?= htmlspecialchars($p['title']) ?></td>
                                <td class="px-4 py-3 border">₹<?= number_format($p['price'], 2) ?></td>
                                <td class="px-4 py-3 border"><?= htmlspecialchars($p['category']) ?></td>
                                <td class="px-4 py-3 border"><?= htmlspecialchars($p['tag']) ?></td>
                                <td class="px-4 py-3 border space-x-2">
                                    <a href="all-products.php?edit_id=<?= $p['id'] ?>"
                                       class="bg-yellow-400 text-white px-2 py-1 rounded hover:bg-yellow-500 text-xs">
                                        Edit
                                    </a>
                                    <form action="delete-product.php" method="POST" class="inline-block"
                                          onsubmit="return confirm('Are you sure you want to delete this product?');">
                                        <input type="hidden" name="product_id" value="<?= $p['id'] ?>">
                                        <button type="submit"
                                                class="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 text-xs">
                                            Delete
                                        </button>
                                    </form>
                                </td>
                            <?php endif; ?>

                        </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        </div>
    </main>
</div>
