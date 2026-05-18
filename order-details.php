<?php
session_start();
require_once 'includes/db.php';
require_once 'includes/header.php';

if (!isset($_SESSION['user_id'])) {
    header("Location: login.php");
    exit;
}

$user_id = $_SESSION['user_id'];
$order_id = $_GET['id'] ?? 0;

// Fetch order details
$order_stmt = $conn->prepare("SELECT o.*, sa.address, sa.city, sa.state, sa.zip, sa.country FROM orders o JOIN shipping_addresses sa ON o.shipping_address_id = sa.id WHERE o.id = ? AND o.user_id = ?");
$order_stmt->bind_param("ii", $order_id, $user_id);
$order_stmt->execute();
$order_result = $order_stmt->get_result();
$order = $order_result->fetch_assoc();

if (!$order) {
    echo "<p>Order not found.</p>";
    exit;
}

// Fetch order items
$items_stmt = $conn->prepare("SELECT oi.*, p.name, p.image_url FROM order_items oi JOIN products p ON oi.product_id = p.id WHERE oi.order_id = ?");
$items_stmt->bind_param("i", $order_id);
$items_stmt->execute();
$items_result = $items_stmt->get_result();

?>

<main class="pt-20 px-6 max-w-4xl mx-auto">
    <h1 class="text-3xl font-bold mb-6">Order Details</h1>

    <div class="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 class="text-xl font-bold mb-4">Order #<?= htmlspecialchars($order['order_number']) ?></h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
                <h3 class="text-lg font-semibold">Shipping Address</h3>
                <p><?= htmlspecialchars($order['address']) ?></p>
                <p><?= htmlspecialchars($order['city']) ?>, <?= htmlspecialchars($order['state']) ?> <?= htmlspecialchars($order['zip']) ?></p>
                <p><?= htmlspecialchars($order['country']) ?></p>
            </div>
            <div>
                <h3 class="text-lg font-semibold">Order Status</h3>
                <p>Payment Status: <span class="font-semibold <?= $order['payment_status'] === 'Paid' ? 'text-green-600' : 'text-yellow-600' ?>"><?= htmlspecialchars($order['payment_status']) ?></span></p>
                <p>Order Status: <span class="font-semibold text-blue-600"><?= htmlspecialchars($order['order_status']) ?></span></p>
            </div>
            <div>
                <h3 class="text-lg font-semibold">Total</h3>
                <p class="text-2xl font-bold">₹<?= htmlspecialchars(number_format($order['grand_total'], 2)) ?></p>
            </div>
        </div>
    </div>

    <div class="bg-white shadow-md rounded-lg p-6">
        <h2 class="text-xl font-bold mb-4">Items Ordered</h2>
        <div class="divide-y divide-gray-200">
            <?php while ($item = $items_result->fetch_assoc()): ?>
                <div class="flex items-center py-4">
                    <img src="<?= htmlspecialchars($item['image_url']) ?>" alt="<?= htmlspecialchars($item['name']) ?>" class="w-24 h-24 object-cover rounded-lg mr-6">
                    <div class="flex-grow">
                        <h3 class="text-lg font-semibold"><?= htmlspecialchars($item['name']) ?></h3>
                        <p>Quantity: <?= htmlspecialchars($item['quantity']) ?></p>
                        <p>Price: ₹<?= htmlspecialchars(number_format($item['price'], 2)) ?></p>
                    </div>
                </div>
            <?php endwhile; ?>
        </div>
    </div>
</main>

<?php include 'includes/footer.php'; ?>
