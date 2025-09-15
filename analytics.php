<?php
session_start();
require_once 'includes/db.php';
require_once 'includes/header.php';

if (!isset($_SESSION['user_id']) || $_SESSION['user_type'] !== 'admin') {
    header('Location: /index');
    exit;
}

// ------------------- Top Products -------------------
$topProducts = $conn->query("
    SELECT product_id, COUNT(*) AS views
    FROM user_events
    WHERE event_type='view_product'
    GROUP BY product_id
    ORDER BY views DESC
    LIMIT 10
")->fetch_all(MYSQLI_ASSOC);

// ------------------- Top Searches -------------------
$topSearches = $conn->query("
    SELECT search_query, COUNT(*) AS count
    FROM user_events
    WHERE event_type='search'
    GROUP BY search_query
    ORDER BY count DESC
    LIMIT 10
")->fetch_all(MYSQLI_ASSOC);

// ------------------- Add-to-Cart Conversion -------------------
$conversionData = $conn->query("
    SELECT product_id,
           SUM(CASE WHEN event_type='add_to_cart' THEN 1 ELSE 0 END) AS added_to_cart,
           SUM(CASE WHEN event_type='view_product' THEN 1 ELSE 0 END) AS views
    FROM user_events
    GROUP BY product_id
    ORDER BY views DESC
    LIMIT 10
")->fetch_all(MYSQLI_ASSOC);

// ------------------- Daily Checkouts -------------------
$dailyCheckouts = $conn->query("
    SELECT DATE(timestamp) AS day, COUNT(*) AS checkouts
    FROM user_events
    WHERE event_type='checkout'
    GROUP BY day
    ORDER BY day ASC
")->fetch_all(MYSQLI_ASSOC);

// ------------------- Button Clicks -------------------
$buttonClicks = $conn->query("
    SELECT button_name, COUNT(*) AS clicks
    FROM user_events
    WHERE event_type='button_click'
    GROUP BY button_name
    ORDER BY clicks DESC
")->fetch_all(MYSQLI_ASSOC);

// ------------------- Category Popularity -------------------
$categoryPopularity = $conn->query("
    SELECT p.category, COUNT(*) AS views
    FROM user_events u
    JOIN products p ON u.product_id = p.id
    WHERE u.event_type='view_product'
    GROUP BY p.category
    ORDER BY views DESC
")->fetch_all(MYSQLI_ASSOC);

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Admin Analytics Dashboard</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
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

<main class="flex-1 p-8 max-w-5xl bg-white shadow-md rounded">
    <h1 class="text-3xl font-bold text-pink-700 mb-8">Analytics Dashboard</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        <!-- Top Products -->
        <div class="bg-white p-6 rounded shadow">
            <h2 class="text-xl font-semibold mb-4">Top Products Viewed</h2>
            <canvas id="topProductsChart"></canvas>
        </div>

        <!-- Top Searches -->
        <div class="bg-white p-6 rounded shadow">
            <h2 class="text-xl font-semibold mb-4">Top Search Queries</h2>
            <canvas id="topSearchesChart"></canvas>
        </div>

        <!-- Add-to-Cart Conversion -->
        <div class="bg-white p-6 rounded shadow">
            <h2 class="text-xl font-semibold mb-4">Add-to-Cart Conversion</h2>
            <canvas id="conversionChart"></canvas>
        </div>

        <!-- Daily Checkouts -->
        <div class="bg-white p-6 rounded shadow">
            <h2 class="text-xl font-semibold mb-4">Daily Checkouts</h2>
            <canvas id="checkoutsChart"></canvas>
        </div>

        <!-- Button Clicks -->
        <div class="bg-white p-6 rounded shadow">
            <h2 class="text-xl font-semibold mb-4">Button Clicks</h2>
            <canvas id="buttonClicksChart"></canvas>
        </div>

        <!-- Category Popularity -->
        <div class="bg-white p-6 rounded shadow">
            <h2 class="text-xl font-semibold mb-4">Category Popularity</h2>
            <canvas id="categoryChart"></canvas>
        </div>

    </div>
</main>

<script>
    // ---------- Top Products ----------
    new Chart(document.getElementById('topProductsChart'), {
        type: 'bar',
        data: {
            labels: <?= json_encode(array_map(fn($p)=>"Product ".$p['product_id'],$topProducts)) ?>,
            datasets: [{
                label: 'Views',
                data: <?= json_encode(array_column($topProducts,'views')) ?>,
                backgroundColor: 'rgba(219,39,119,0.7)'
            }]
        }
    });

    // ---------- Top Searches ----------
    new Chart(document.getElementById('topSearchesChart'), {
        type: 'bar',
        data: {
            labels: <?= json_encode(array_column($topSearches,'search_query')) ?>,
            datasets: [{
                label: 'Search Count',
                data: <?= json_encode(array_column($topSearches,'count')) ?>,
                backgroundColor: 'rgba(59,130,246,0.7)'
            }]
        }
    });

    // ---------- Add-to-Cart Conversion ----------
    const conversionLabels = <?= json_encode(array_map(fn($p)=>"Product ".$p['product_id'],$conversionData)) ?>;
    const conversionAdded = <?= json_encode(array_column($conversionData,'added_to_cart')) ?>;
    const conversionViews = <?= json_encode(array_map(fn($p)=>$p['views']-$p['added_to_cart'],$conversionData)) ?>;

    new Chart(document.getElementById('conversionChart'), {
        type: 'doughnut',
        data: {
            labels: conversionLabels.flatMap(label => [label+' Added', label+' Not Added']),
            datasets: [{
                label: 'Conversion',
                data: conversionLabels.flatMap((_,i) => [conversionAdded[i], conversionViews[i]]),
                backgroundColor: conversionLabels.flatMap(_ => ['rgba(34,197,94,0.7)','rgba(245,158,11,0.7)'])
            }]
        }
    });

    // ---------- Daily Checkouts ----------
    new Chart(document.getElementById('checkoutsChart'), {
        type: 'line',
        data: {
            labels: <?= json_encode(array_column($dailyCheckouts,'day')) ?>,
            datasets: [{
                label: 'Checkouts',
                data: <?= json_encode(array_column($dailyCheckouts,'checkouts')) ?>,
                fill: true,
                backgroundColor: 'rgba(59,130,246,0.2)',
                borderColor: 'rgba(59,130,246,1)',
                tension: 0.3
            }]
        }
    });

    // ---------- Button Clicks ----------
    new Chart(document.getElementById('buttonClicksChart'), {
        type: 'pie',
        data: {
            labels: <?= json_encode(array_column($buttonClicks,'button_name')) ?>,
            datasets: [{
                label: 'Clicks',
                data: <?= json_encode(array_column($buttonClicks,'clicks')) ?>,
                backgroundColor: [
                    'rgba(219,39,119,0.7)',
                    'rgba(59,130,246,0.7)',
                    'rgba(34,197,94,0.7)',
                    'rgba(245,158,11,0.7)',
                    'rgba(168,85,247,0.7)'
                ]
            }]
        }
    });

    // ---------- Category Popularity ----------
    new Chart(document.getElementById('categoryChart'), {
        type: 'bar',
        data: {
            labels: <?= json_encode(array_column($categoryPopularity,'category')) ?>,
            datasets: [{
                label: 'Views',
                data: <?= json_encode(array_column($categoryPopularity,'views')) ?>,
                backgroundColor: 'rgba(236,72,153,0.7)'
            }]
        }
    });
</script>
</body>
</html>
