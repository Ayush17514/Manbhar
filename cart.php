<?php
session_start();
require_once 'includes/db.php';
require_once 'includes/header.php';

if (isset($_SESSION['user_id'])) {
    $stmt = $conn->prepare("SELECT c.product_id, p.title, p.image, p.price, c.quantity 
                            FROM cart c 
                            JOIN products p ON c.product_id = p.id 
                            WHERE c.user_id = ?");
    $stmt->bind_param("i", $_SESSION['user_id']);
    $stmt->execute();
    $res = $stmt->get_result();
    $cartItems = $res->fetch_all(MYSQLI_ASSOC);
} else {
    $cartItems = $_SESSION['cart'] ?? [];
}
?>

<main class="pt-20 px-6">
    <h1 class="text-3xl font-bold mb-6">Your Cart</h1>

    <?php if (empty($cartItems)): ?>
        <p class="text-center text-gray-500 mt-10">Your cart is empty.</p>
    <?php else: ?>
        <?php $total = 0; ?>
        <?php foreach ($cartItems as $item): ?>
            <?php
                $qty = (int)($item['quantity'] ?? 1);
                $price = (float)$item['price'];
                $subtotal = $price * $qty;
                $total += $subtotal;

                $images = explode(',', $item['image']);
                $mainImage = trim($images[0]);
                if (strpos($mainImage, 'uploads/products/') !== 0) {
                    $mainImage = 'uploads/products/' . $mainImage;
                }
            ?>
            <div class="flex items-center mb-4 border-b pb-2">
                <img src="<?= htmlspecialchars($mainImage) ?>" alt="<?= htmlspecialchars($item['title']) ?>" class="w-20 h-20 object-cover rounded mr-4">
                <div class="flex-1">
                    <h4 class="font-semibold text-gray-700"><?= htmlspecialchars($item['title']) ?></h4>
                    <p class="text-pink-600 font-bold">₹<?= number_format($price, 2) ?></p>
                    <p class="text-gray-600">Qty: <?= $qty ?></p>
                    <p class="text-sm text-gray-500">Subtotal: ₹<?= number_format($subtotal, 2) ?></p>
                </div>
                <button onclick="removeFromCart(<?= $item['product_id'] ?? $item['id'] ?>)" class="text-red-500 text-lg">&times;</button>
            </div>
        <?php endforeach; ?>

        <?php
            $gst = round($total * 0.03);
            $shipping = 200;
            $grandTotal = $total + $gst + $shipping;
        ?>

        <div class="mt-6 text-right space-y-1 text-gray-700 text-sm">
            <p>Subtotal: ₹<?= number_format($total, 2) ?></p>
            <p>GST (3%): ₹<?= number_format($gst, 2) ?></p>
            <p>Shipping Charges: ₹<?= number_format($shipping, 2) ?></p>
            <hr class="my-2">
            <p class="text-xl font-bold text-black">Total: ₹<?= number_format($grandTotal, 2) ?></p>
        </div>

        <div class="mt-6 text-right">
            <button class="bg-pink-600 text-white px-6 py-3 rounded hover:bg-pink-700">Proceed to Checkout</button>
        </div>
    <?php endif; ?>
</main>

<script src="assets/js/main.js"></script>
<?php include 'includes/footer.php'; ?>
