<?php
require_once '../includes/db.php';
session_start();

ini_set('display_errors', 1);
error_reporting(E_ALL);

// Pagination
$page = isset($_POST['page']) ? (int)$_POST['page'] : 1;
$limit = 12;
$offset = ($page - 1) * $limit;

$where = "WHERE 1=1";
$params = [];
$types = "";

// Helper for multiple filters
function addInFilter(&$where, &$params, &$types, $postKey, $column) {
  if (!empty($_POST[$postKey])) {
    $values = is_array($_POST[$postKey]) ? $_POST[$postKey] : [$_POST[$postKey]];
    $placeholders = implode(',', array_fill(0, count($values), '?'));
    $where .= " AND `$column` IN ($placeholders)";
    $params = array_merge($params, $values);
    $types .= str_repeat("s", count($values));
  }
}

addInFilter($where, $params, $types, 'category', 'category');
addInFilter($where, $params, $types, 'material', 'material');
addInFilter($where, $params, $types, 'stones', 'stones');
addInFilter($where, $params, $types, 'tag', 'tag');

// Price range
$min_price = isset($_POST['min_price']) && $_POST['min_price'] !== '' ? (int)$_POST['min_price'] : 0;
$max_price = isset($_POST['max_price']) && $_POST['max_price'] !== '' ? (int)$_POST['max_price'] : 999999;
$where .= " AND price BETWEEN ? AND ?";
$params[] = $min_price;
$params[] = $max_price;
$types .= "ii";

// Sorting
$order = "ORDER BY id DESC";
if (!empty($_POST['sort'])) {
  if ($_POST['sort'] === 'price_asc') $order = "ORDER BY price ASC";
  elseif ($_POST['sort'] === 'price_desc') $order = "ORDER BY price DESC";
}

// Wishlist (for icon state)
$user_id = $_SESSION['user_id'] ?? null;
$wishlist = [];

if ($user_id) {
  $res = $conn->query("SELECT product_id FROM wishlist WHERE user_id = $user_id");
  while ($row = $res->fetch_assoc()) {
    $wishlist[] = $row['product_id'];
  }
} elseif (isset($_SESSION['wishlist'])) {
  $wishlist = array_keys($_SESSION['wishlist']);
}

// Final query
$sql = "SELECT * FROM products $where $order LIMIT $limit OFFSET $offset";
$stmt = $conn->prepare($sql);
if (!empty($params)) {
  $stmt->bind_param($types, ...$params);
}
$stmt->execute();
$res = $stmt->get_result();

if ($res->num_rows === 0):

?>
  <div class="col-span-full text-center text-gray-600 py-12 text-lg">
    <p class="text-xl font-semibold text-pink-600 mb-2">😔 No products found</p>
    <p>Try adjusting your filters or <a href="collections.php" class="text-pink-500 underline">browse all collections</a>.</p>
  </div>
<?php
else:
 while ($p = $res->fetch_assoc()):
  $isWishlisted = in_array($p['id'], $wishlist);
  $svgFill = $isWishlisted ? 'currentColor' : 'none';
  $svgClass = $isWishlisted ? 'text-pink-600' : 'text-gray-400';

  // 🔥 FIX: Construct correct image path
$image_list = explode(',', $p['image']);
$main_image = trim($image_list[0]);

?>
  <div class="relative border border-pink-100 rounded-lg overflow-hidden hover:shadow-lg transition duration-200 bg-white">
    <a href="product.php?id=<?= $p['id'] ?>" class="block relative group">
      <img src="<?= htmlspecialchars($main_image) ?>" alt="<?= htmlspecialchars($p['title']) ?>"
           class="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105">
    </a>

    <!-- Wishlist Heart -->
    <button
      class="absolute top-2 right-2 z-10 bg-white rounded-full p-1 shadow wishlist-icon-btn"
      data-id="<?= $p['id'] ?>" aria-label="Toggle Wishlist">
      <svg xmlns="http://www.w3.org/2000/svg"
           fill="<?= $svgFill ?>" viewBox="0 0 24 24"
           stroke-width="1.5" stroke="currentColor"
           class="w-5 h-5 transition <?= $svgClass ?>">
        <path stroke-linecap="round" stroke-linejoin="round"
              d="M21 8.25c0-2.623-2.122-4.75-4.75-4.75a4.748 4.748 0 00-3.75 1.886A4.748 4.748 0 008.75 3.5C6.122 3.5 4 5.627 4 8.25c0 6.019 8 11 8 11s8-4.981 8-11z" />
      </svg>
    </button>

    <!-- Product Info -->
    <div class="p-3">
      <h3 class="text-sm font-medium text-gray-800 truncate"><?= htmlspecialchars($p['title']) ?></h3>
      <p class="text-pink-600 font-semibold mt-1">₹<?= number_format($p['price']) ?></p>
      <h2 class="text-[13px] font-medium text-gray-800 leading-tight"><?= htmlspecialchars($p['description']) ?></h2>
      <button
        class="mt-3 w-full text-center bg-[#273639] hover:bg-[#3C4A4C] text-white text-sm font-medium py-2 rounded transition addToCart"
        data-id="<?= $p['id'] ?>">
        Add to Cart
      </button>
    </div>
  </div>
<?php endwhile; 
endif;
?>
