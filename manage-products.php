<?php
ob_start(); // Prevent header errors
include 'includes/header.php';

// Admin access check
if (!isset($_SESSION['user_id']) || $_SESSION['user_type'] !== 'admin') {
    echo "<p class='text-center text-red-500 mt-10'>Access denied. Admins only.</p>";
    exit;
}

// Handle update
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['update_product'])) {
    $id = intval($_POST['product_id']);

    $fields = [
        'title', 'price', 'category', 'tag',
        'size', 'dimensions', 'material', 'stones',
        'gross_weight', 'metal_weight', 'stone_weight',
        'additional_info'
    ];

    // Build the SQL SET clause
    $setClause = implode(", ", array_map(fn($f) => "$f = ?", $fields));
    $sql = "UPDATE products SET $setClause WHERE id = ?";

    $stmt = $conn->prepare($sql);
    if (!$stmt) {
        die("Prepare failed: " . $conn->error);
    }

    // Build the types string: s = string, d = double, i = integer
    $types = "sdssssssddds" . "i"; // 12 fields + 1 for ID

    // Create values array
    $values = [];
    foreach ($fields as $f) {
        $values[] = $_POST[$f] ?? '';
    }
    $values[] = $id;

    // Bind parameters using references
    $stmt->bind_param($types, ...array_map(fn(&$val) => $val, $values));

    if (!$stmt->execute()) {
        die("Execute failed: " . $stmt->error);
    }

    header("Location: /manage-products");
    exit;
}


// Fetch all products
$stmt = $conn->prepare("SELECT * FROM products ORDER BY id DESC");
$stmt->execute();
$res = $stmt->get_result();
$products = $res->fetch_all(MYSQLI_ASSOC);

$edit_id = isset($_GET['edit_id']) ? intval($_GET['edit_id']) : 0;
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
        <aside class="w-80 bg-gray-100 shadow-md py-6 px-4 space-y-4">
            <h2 class="text-xl font-bold text-pink-700 mb-6">Admin Panel</h2>
            <nav class="flex flex-col space-y-2 text-gray-700">
                <a href="/admin-panel" class="hover:text-pink-600">➕ Add Product</a>
                <a href="/manage-products" class="hover:text-pink-600">📦 Manage Products</a>
                <a href="/users" class="hover:text-pink-600">👥 View Users</a>
                <a href="/analytics" class="hover:text-pink-600">📈 Analytical</a>
                <a href="/logout" class="text-red-500 hover:underline mt-10">Logout</a>
            </nav>
        </aside>

    <!-- Main Content -->
    <main class="flex-1 p-8 max-w-5xl bg-white">
        <div class="flex justify-between items-center mb-6">
            <h1 class="text-3xl font-bold text-pink-700 mb-6">Manage Products</h1>
            <a href="/admin-panel" class="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600">+ Add Product</a>
        </div>

        <div class="overflow-x-auto">
            <table class="min-w-full bg-white border border-gray-200 text-left text-sm text-gray-700">
                <thead class="bg-pink-50 text-xs uppercase text-gray-500">
                    <tr>
                    <th class="px-4 py-2 border">ID</th>
                    <th class="px-4 py-2 border">Image</th>
                    <th class="px-4 py-2 border">Title</th>
                    <th class="px-4 py-2 border">Price</th>
                    <th class="px-4 py-2 border">Category</th>
                    <th class="px-4 py-2 border">Tag</th>
                    <th class="px-4 py-2 border">Size</th>
                    <th class="px-4 py-2 border">Dimensions</th>
                    <th class="px-4 py-2 border">Material</th>
                    <th class="px-4 py-2 border">Stones</th>
                    <th class="px-4 py-2 border">Gross Wt</th>
                    <th class="px-4 py-2 border">Metal Wt</th>
                    <th class="px-4 py-2 border">Stone Wt</th>
                    <th class="px-4 py-2 border">Additional Info</th>
                    <th class="px-4 py-2 border">Actions</th>
                </tr>
                </thead>
                <tbody>
                <?php foreach ($products as $p): ?>
                    <tr class="hover:bg-gray-50 align-top">
                        <td class="px-4 py-2 border"><?= $p['id'] ?></td>
                        <td class="px-4 py-2 border">
                            <?php 
                                $images = explode(',', $p['image']); // Split images by comma
                                $baseImage = trim($images[0]); // Get the first one
                            ?>
                            <img src="<?= htmlspecialchars($baseImage) ?>" class="w-14 h-14 object-cover rounded" alt="Product Image" />
                        </td>
                        

                        <?php if ($edit_id === $p['id']): ?>
                            <form method="POST" action="/manage-products" class="contents">
                                <input type="hidden" name="update_product" value="1">
                                <input type="hidden" name="product_id" value="<?= $p['id'] ?>">
                                <?php
                                $fields = [
                                    'title', 'price', 'category', 'tag',
                                    'size', 'dimensions', 'material', 'stones',
                                    'gross_weight', 'metal_weight', 'stone_weight',
                                    'additional_info'
                                ];
                                foreach ($fields as $f): ?>
                                    <td class="px-4 py-2 border">
                                        <?php if ($f === 'additional_info'): ?>
                                            <textarea name="<?= $f ?>" class="w-full p-1 border"><?= htmlspecialchars($p[$f]) ?></textarea>
                                        <?php else: ?>
                                            <input type="<?= is_numeric($p[$f]) ? 'number' : 'text' ?>"
                                                   step="any"
                                                   name="<?= $f ?>"
                                                   value="<?= htmlspecialchars($p[$f]) ?>"
                                                   class="w-full p-1 border" />
                                        <?php endif; ?>
                                    </td>
                                <?php endforeach; ?>
                                <td class="px-4 py-2 border">
                                    <div class="flex space-x-2">
                                        <button type="submit" class="bg-green-500 text-white px-2 py-1 rounded text-xs">Save</button>
                                        <a href="/manage-products" class="bg-gray-400 text-white px-2 py-1 rounded text-xs">Cancel</a>
                                    </div>
                                </td>
                            </form>
                        <?php else: ?>
                            <td class="px-4 py-2 border"><?= htmlspecialchars($p['title'] ?? '') ?></td>
                            <td class="px-4 py-2 border">₹<?= number_format($p['price'] ?? 0, 2) ?></td>
                            <td class="px-4 py-2 border"><?= htmlspecialchars($p['category'] ?? '') ?></td>
                            <td class="px-4 py-2 border"><?= htmlspecialchars($p['tag'] ?? '') ?></td>
                            <td class="px-4 py-2 border"><?= htmlspecialchars($p['size'] ?? '') ?></td>
                            <td class="px-4 py-2 border"><?= htmlspecialchars($p['dimensions'] ?? '') ?></td>
                            <td class="px-4 py-2 border"><?= htmlspecialchars($p['material'] ?? '') ?></td>
                            <td class="px-4 py-2 border"><?= htmlspecialchars($p['stones'] ?? '') ?></td>
                            <td class="px-4 py-2 border"><?= htmlspecialchars($p['gross_weight'] ?? '') ?> g</td>
                            <td class="px-4 py-2 border"><?= htmlspecialchars($p['metal_weight'] ?? '') ?> g</td>
                            <td class="px-4 py-2 border"><?= htmlspecialchars($p['stone_weight'] ?? '') ?> g</td>
                            <td class="px-4 py-2 border"><?= htmlspecialchars($p['additional_info'] ?? '') ?></td>
                            <td class="px-4 py-2 border">
                                <div class="flex space-x-2">
                                    <a href="/manage-products?edit_id=<?= $p['id'] ?>" class="bg-yellow-500 text-white px-2 py-1 rounded text-xs">Edit</a>
                                    <form method="POST" action="/ajax/delete-product" onsubmit="return confirm('Are you sure?');" class="inline-block">
                                        <input type="hidden" name="product_id" value="<?= $p['id'] ?>">
                                        <button type="submit" class="bg-red-500 text-white px-2 py-1 rounded text-xs">Delete</button>
                                    </form>
                                </div>
                            </td>
                        <?php endif; ?>
                    </tr>
                <?php endforeach; ?>
                </tbody>
            </table>
        </div>
    </main>
</div>
<?php ob_end_flush(); ?>
