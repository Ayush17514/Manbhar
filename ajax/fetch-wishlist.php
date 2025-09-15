<?php
session_start();
require_once '../includes/db.php';

$items = [];

if (isset($_SESSION['user_id'])) {
    // Logged-in user: fetch from DB
    $stmt = $conn->prepare("
        SELECT p.id, p.title, p.price, p.image 
        FROM wishlist w 
        JOIN products p ON w.product_id = p.id 
        WHERE w.user_id = ?
    ");
    $stmt->bind_param("i", $_SESSION['user_id']);
    $stmt->execute();
    $result = $stmt->get_result();
    while ($row = $result->fetch_assoc()) {
        $images = explode(',', $row['image']);
        $row['image'] = 'uploads/products/' . trim($images[0]);
        $items[] = $row;
    }
    $stmt->close();
} elseif (!empty($_SESSION['wishlist']) && is_array($_SESSION['wishlist'])) {
    // Guest: fetch from session wishlist
    $wishlistIds = array_keys($_SESSION['wishlist']);
    $placeholders = implode(',', array_fill(0, count($wishlistIds), '?'));
    $types = str_repeat('i', count($wishlistIds));
    $stmt = $conn->prepare("SELECT id, title, price, image FROM products WHERE id IN ($placeholders)");
    $stmt->bind_param($types, ...$wishlistIds);
    $stmt->execute();
    $result = $stmt->get_result();
    while ($row = $result->fetch_assoc()) {
        $images = explode(',', $row['image']);
        $row['image'] = 'uploads/products/' . trim($images[0]);
        $items[] = $row;
    }
    $stmt->close();
}

// Output HTML
if (empty($items)) {
    echo '<p class="text-gray-600 text-center py-8">💔 Your wishlist is empty.</p>';
} else {
    foreach ($items as $item) {
        ?>
        <div class="flex items-center gap-4 border-b pb-4 mb-4">
            <img src="<?= htmlspecialchars($item['image']) ?>" alt="<?= htmlspecialchars($item['title']) ?>"
                 class="w-16 h-16 object-cover rounded" />
            <div class="flex-1">
                <h3 class="font-medium text-gray-800 truncate"><?= htmlspecialchars($item['title']) ?></h3>
                <p class="text-pink-600 font-semibold">₹<?= number_format($item['price'], 2) ?></p>
            </div>
            <button onclick="toggleWishlist(<?= $item['id'] ?>)" class="text-sm text-red-500 hover:underline">
                Remove
            </button>
        </div>
        <?php
    }
}
?>
