<?php include 'includes/header.php'; ?>
<?php require_once 'includes/db.php';

$prefilledCategory = isset($_GET['category']) ? urldecode($_GET['category']) : '';

// Category Count Setup
function getFilterCounts($conn, $column) {
  $allowed = ['category', 'material', 'stones', 'tag'];
  if (!in_array($column, $allowed)) return [];
  $sql = "SELECT `$column`, COUNT(*) as count FROM products GROUP BY `$column`";
  $result = $conn->query($sql);
  $data = [];
  while ($row = $result->fetch_assoc()) {
    $data[$row[$column]] = $row['count'];
  }
  return $data;
}

$allCategories = ["Rings", "Necklaces", "Earrings", "Bracelets", "Pendants", "Anklets", "Gold Chains", "Bangles", "Mangalsutras", "Nose Pin", "Kada", "Cufflink", "Gold Idol", "Name Pendants", "Rakhi Jewellery", "Customised Jewellery"];
$categoryCountsRaw = [];
$res = $conn->query("SELECT category, COUNT(*) as count FROM products GROUP BY category");
while ($row = $res->fetch_assoc()) $categoryCountsRaw[$row['category']] = $row['count'];
$categoryCounts = [];
foreach ($allCategories as $cat) $categoryCounts[$cat] = $categoryCountsRaw[$cat] ?? 0;
?>

<!-- Hero -->
<section class="bg-[#eaf6f6] mt-[80px] py-16 text-center">
  <div class="max-w-4xl mx-auto px-4">
    <h1 class="text-4xl sm:text-5xl font-extrabold text-black mb-4">
      Discover Your Sparkle 
    </h1>
    <p class="text-lg text-gray-600">
      Explore handpicked collections of rings, earrings, necklaces & more crafted with elegance.
    </p>
  </div>
</section>


<!-- Main Section -->
<main class="max-w-7xl mx-auto px-4 py-12">
  <div class="flex flex-col lg:flex-row gap-8">

    <!-- Filters -->
    <aside class="lg:w-1/4 space-y-6">
      <div class="bg-white p-5 rounded shadow">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-lg font-semibold">Filters</h2>
          <button id="reset-filters" class="text-sm text-pink-600 hover:underline">Reset</button>
        </div>

        <div class="space-y-4">
          <!-- Category Filter -->
          <div>
            <h3 class="font-medium text-gray-800 mb-2">Category</h3>
            <?php foreach ($categoryCounts as $cat => $count): ?>
              <div class="flex items-center gap-2">
                <input type="checkbox" class="filter-checkbox" name="category[]" value="<?= htmlspecialchars($cat) ?>"<?= $prefilledCategory === $cat ? 'checked' : '' ?>>

                <label class="text-sm"><span><?= htmlspecialchars($cat) ?></span> (<?= $count ?>)</label>
              </div>
            <?php endforeach; ?>
          </div>

          <!-- Material Filter -->
          <div>
            <h3 class="font-medium text-gray-800 mb-2">Material</h3>
            <?php foreach (getFilterCounts($conn, 'material') as $val => $count): ?>
              <div class="flex items-center gap-2">
                <input type="checkbox" class="filter-checkbox" name="material[]" value="<?= htmlspecialchars($val) ?>">
                <label class="text-sm"><?= htmlspecialchars($val) ?> (<?= $count ?>)</label>
              </div>
            <?php endforeach; ?>
          </div>

          <!-- Stones Filter -->
          <div>
            <h3 class="font-medium text-gray-800 mb-2">Stones</h3>
            <?php foreach (getFilterCounts($conn, 'stones') as $val => $count): ?>
              <div class="flex items-center gap-2">
                <input type="checkbox" class="filter-checkbox" name="stones[]" value="<?= htmlspecialchars($val) ?>">
                <label class="text-sm"><?= htmlspecialchars($val) ?> (<?= $count ?>)</label>
              </div>
            <?php endforeach; ?>
          </div>

          <!-- Tags Filter -->
          <div>
            <h3 class="font-medium text-gray-800 mb-2">Tags</h3>
            <?php foreach (getFilterCounts($conn, 'tag') as $val => $count): ?>
              <div class="flex items-center gap-2">
                <input type="checkbox" class="filter-checkbox" name="tag[]" value="<?= htmlspecialchars($val) ?>">
                <label class="text-sm"><?= htmlspecialchars($val) ?> (<?= $count ?>)</label>
              </div>
            <?php endforeach; ?>
          </div>

          <!-- Price Filter -->
          <div>
            <h3 class="font-medium text-gray-800 mb-2">Price</h3>
            <input type="number" name="min_price" class="w-full border px-3 py-1 mb-2" placeholder="Min ₹">
            <input type="number" name="max_price" class="w-full border px-3 py-1" placeholder="Max ₹">
          </div>

          <!-- Sort -->
          <div>
            <h3 class="font-medium text-gray-800 mb-2">Sort</h3>
            <select name="sort" class="w-full border px-3 py-2">
              <option value="">Latest</option>
              <option value="price_asc">Price ↑</option>
              <option value="price_desc">Price ↓</option>
            </select>
          </div>
        </div>
      </div>
    </aside>

    <!-- Product Grid -->
    <section class="flex-1">
      <div id="product-grid" class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 min-h-[200px]"></div>
    </section>
  </div>
</main>

<!-- Toast Message -->
<div id="toast" class="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-pink-600 text-white px-4 py-2 rounded shadow hidden z-50"></div>

<!-- Scripts -->
<script>
let currentPage = 1;

function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.remove('hidden');
  setTimeout(() => toast.classList.add('hidden'), 2000);
}

function fetchProducts(reset = true) {
  const formData = new FormData();
  document.querySelectorAll('.filter-checkbox:checked').forEach(cb => formData.append(cb.name, cb.value));
  formData.append("min_price", document.querySelector('[name="min_price"]').value);
  formData.append("max_price", document.querySelector('[name="max_price"]').value);
  formData.append("sort", document.querySelector('[name="sort"]').value);
  formData.append("page", currentPage);

  fetch("ajax/filter-products.php", { method: "POST", body: formData })
    .then(res => res.text())
    .then(html => {
      const grid = document.getElementById("product-grid");
      if (reset) grid.innerHTML = html;
      else grid.insertAdjacentHTML("beforeend", html);
    });
}

// Event bindings
document.querySelectorAll('.filter-checkbox, select, input[name="min_price"], input[name="max_price"]').forEach(el => {
  el.addEventListener("change", () => {
    currentPage = 1;
    fetchProducts(true);
  });
});

document.getElementById("reset-filters").addEventListener("click", () => {
  document.querySelectorAll("input[type='checkbox']").forEach(cb => cb.checked = false);
  document.querySelectorAll("input[type='number']").forEach(i => i.value = '');
  document.querySelector("select[name='sort']").value = '';
  currentPage = 1;
  fetchProducts(true);
});

// Wishlist & Cart Toggle
document.addEventListener('click', e => {
  if (e.target.closest('.wishlist-icon-btn')) {
    const btn = e.target.closest('.wishlist-icon-btn');
    const id = btn.dataset.id;

    fetch('ajax/add-to-wishlist.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: 'product_id=' + id
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        const svg = btn.querySelector('svg');
        if (data.action === 'added') {
          svg.classList.replace('text-gray-400', 'text-pink-600');
          svg.setAttribute('fill', 'currentColor');
          showToast('Added to Wishlist');
        } else {
          svg.classList.replace('text-pink-600', 'text-gray-400');
          svg.setAttribute('fill', 'none');
          showToast('Removed from Wishlist');
        }
        updateWishlistCount?.();
      }
    });
  }

  if (e.target.closest('.addToCart')) {
    const btn = e.target.closest('.addToCart');
    const id = btn.dataset.id;
    fetch('ajax/add-to-cart.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: 'product_id=' + id + '&quantity=1'
    }).then(() => {
      updateCartCount?.();
      showToast('Added to Cart');
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const prefilledCategory = "<?= $prefilledCategory ?>";
  if (prefilledCategory) {
    // Delay fetch slightly to ensure checkbox is checked
    setTimeout(() => fetchProducts(true), 50);
  } else {
    fetchProducts(true);
  }
});

</script>

<?php include 'includes/footer.php'; ?>
