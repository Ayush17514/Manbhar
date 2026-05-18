<?php
session_start();
require_once 'includes/db.php';
require_once 'includes/header.php';

if (!isset($_SESSION['user_id'])) {
    header("Location: login.php");
    exit;
}

$user_id = $_SESSION['user_id'];

// Fetch cart count
$stmt1 = $conn->prepare("SELECT COUNT(*) FROM cart WHERE user_id = ?");
$stmt1->bind_param("i", $user_id);
$stmt1->execute();
$stmt1->bind_result($cartCount);
$stmt1->fetch();
$stmt1->close();

// Fetch wishlist count
$stmt2 = $conn->prepare("SELECT COUNT(*) FROM wishlist WHERE user_id = ?");
$stmt2->bind_param("i", $user_id);
$stmt2->execute();
$stmt2->bind_result($wishlistCount);
$stmt2->fetch();
$stmt2->close();

// Fetch orders
$orders_stmt = $conn->prepare("SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC");
$orders_stmt->bind_param("i", $user_id);
$orders_stmt->execute();
$orders_result = $orders_stmt->get_result();

?>

<main class="pt-20 px-6 max-w-5xl mx-auto">
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

    <div class="mt-10">
        <h2 class="text-2xl font-bold mb-4">Your Orders</h2>
        <div class="bg-white shadow-md rounded-lg overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                    <tr>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Status</th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Status</th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    <?php while ($order = $orders_result->fetch_assoc()): ?>
                        <tr>
                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"><?= htmlspecialchars($order['order_number']) ?></td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"><?= date("d M Y", strtotime($order['created_at'])) ?></td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹<?= htmlspecialchars(number_format($order['grand_total'], 2)) ?></td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm">
                                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full <?= $order['payment_status'] === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800' ?>">
                                    <?= htmlspecialchars($order['payment_status']) ?>
                                </span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm">
                                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                    <?= htmlspecialchars($order['order_status']) ?>
                                </span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <a href="order-details.php?id=<?= $order['id'] ?>" class="text-indigo-600 hover:text-indigo-900">View</a>
                            </td>
                        </tr>
                    <?php endwhile; ?>
                </tbody>
            </table>
        </div>
    </div>
</main>

<?php include 'includes/footer.php'; ?>
