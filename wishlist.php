<?php
session_start();
require_once 'includes/db.php';
require_once 'includes/header.php';

if (isset($_SESSION['user_id'])) {
    $stmt = $conn->prepare("SELECT p.id, p.title, p.image, p.price 
                            FROM wishlist w 
                            JOIN products p ON w.product_id = p.id 
                            WHERE w.user_id = ?");
    $stmt->bind_param("i", $_SESSION['user_id']);
    $stmt->execute();
    $res = $stmt->get_result();
    $wishlistItems = $res->fetch_all(MYSQLI_ASSOC);
} else {
    $wishlistItems = $_SESSION['wishlist'] ?? [];
}
?>

<main class="pt-20 px-6">
    <h1 class="text-3xl font-bold mb-6">Your Wishlist</h1>

    <?php if (empty($wishlistItems)): ?>
        <p class="text-center text-gray-500 mt-10">Your wishlist is empty.</p>
    <?php else: ?>
        <?php foreach ($wishlistItems as $item): ?>
            <?php
                $images = explode(',', $item['image']);
                $mainImage = 'uploads/products/' . trim($images[0]);
            ?>
            <div class="flex items-center mb-4 border-b pb-2">
                <img src="<?= htmlspecialchars($mainImage) ?>" alt="<?= htmlspecialchars($item['title']) ?>" class="w-20 h-20 object-cover rounded mr-4">
                <div class="flex-1">
                    <h4 class="font-semibold text-gray-700"><?= htmlspecialchars($item['title']) ?></h4>
                    <p class="text-pink-600 font-bold">₹<?= number_format($item['price'], 2) ?></p>
                </div>
                <button onclick="removeFromWishlist(<?= $item['id'] ?? $item['product_id'] ?>)" class="text-red-500 text-lg">&times;</button>
            </div>
        <?php endforeach; ?>
    <?php endif; ?>
</main>

<script src="assets/js/main.js"></script>
<?php include 'includes/footer.php'; ?>
