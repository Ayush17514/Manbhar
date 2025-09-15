<?php
session_start();
require_once 'includes/db.php';
require_once 'includes/header.php';

if (!isset($_SESSION['user_id'])) {
    header("Location: login.php");
    exit;
}

// Fetch cart count
$stmt1 = $conn->prepare("SELECT COUNT(*) FROM cart WHERE user_id = ?");
$stmt1->bind_param("i", $_SESSION['user_id']);
$stmt1->execute();
$stmt1->bind_result($cartCount);
$stmt1->fetch();
$stmt1->close();

// Fetch wishlist count
$stmt2 = $conn->prepare("SELECT COUNT(*) FROM wishlist WHERE user_id = ?");
$stmt2->bind_param("i", $_SESSION['user_id']);
$stmt2->execute();
$stmt2->bind_result($wishlistCount);
$stmt2->fetch();
$stmt2->close();

?>

<main class="pt-20 px-6 max-w-3xl mx-auto">
    <h1 class="text-3xl font-bold mb-6">Welcome, <?= htmlspecialchars($_SESSION['user_name']) ?></h1>

    <div class="grid grid-cols-2 gap-6">
        <div class="bg-pink-100 p-6 rounded shadow text-center">
            <h2 class="text-xl font-bold text-pink-700">Cart</h2>
            <p class="text-4xl mt-2 font-bold text-pink-600"><?= $cartCount ?></p>
            <a href="cart.php" class="block mt-4 text-pink-600 underline">View Cart</a>
        </div>

        <div class="bg-pink-100 p-6 rounded shadow text-center">
            <h2 class="text-xl font-bold text-pink-700">Wishlist</h2>
            <p class="text-4xl mt-2 font-bold text-pink-600"><?= $wishlistCount ?></p>
            <a href="wishlist.php" class="block mt-4 text-pink-600 underline">View Wishlist</a>
        </div>
    </div>

    <!-- Optional: Orders in future -->
    <div class="mt-10 text-center text-gray-500">
        Orders section coming soon...
    </div>
</main>

<?php include 'includes/footer.php'; ?>
