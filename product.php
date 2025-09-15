<?php
session_start();
include 'includes/db.php';
include 'includes/header.php';

$product_id = isset($_GET['id']) ? intval($_GET['id']) : 0;
if ($product_id <= 0) {
    echo "<p class='text-center text-red-500 mt-10'>Invalid product ID.</p>";
    exit;
}

// Fetch product
$stmt = $conn->prepare("SELECT * FROM products WHERE id = ?");
$stmt->bind_param("i", $product_id);
$stmt->execute();
$product_res = $stmt->get_result();

if ($product_res->num_rows === 0) {
    echo "<p class='text-center text-red-500 mt-10'>Product not found.</p>";
    exit;
}
$product = $product_res->fetch_assoc();

// Wishlist & Cart check
$uid = $_SESSION['user_id'] ?? null;
$isInWishlist = $uid ? $conn->query("SELECT 1 FROM wishlist WHERE user_id=$uid AND product_id=$product_id")->num_rows > 0 : isset($_SESSION['wishlist'][$product_id]);
$isInCart = $uid ? $conn->query("SELECT 1 FROM cart WHERE user_id=$uid AND product_id=$product_id")->num_rows > 0 : isset($_SESSION['cart'][$product_id]);

$image_list = array_map('trim', explode(',', $product['image']));
$main_image = $image_list[0];

// Reviews
$review_stmt = $conn->prepare("SELECT r.*, u.name FROM reviews r JOIN users u ON r.user_id = u.id WHERE r.product_id = ? ORDER BY r.created_at DESC");
$review_stmt->bind_param("i", $product_id);
$review_stmt->execute();
$reviews = $review_stmt->get_result();

// Related
$related_stmt = $conn->prepare("SELECT * FROM products WHERE category = ? AND id != ? LIMIT 4");
$related_stmt->bind_param("si", $product['category'], $product_id);
$related_stmt->execute();
$related_products = $related_stmt->get_result();
?>

<style>
  .sticky-offset { padding-top: 6rem; }
</style>
<div class="max-w-7xl lg:mt-[80px] mx-auto px-4 py-10 sticky-offset">
  <div class="flex flex-col md:flex-row gap-10">
    
    <!-- Product Images -->
    <div class="md:w-1/2 relative">
      <?php if (!empty($main_image)): ?>
        <div class="relative overflow-hidden cursor-pointer" id="zoomWrapper">
          <img src="<?= htmlspecialchars($main_image) ?>" alt="Product Image"
               class="rounded shadow-lg w-full h-auto max-h-[500px] sm:max-h-[600px] object-contain mx-auto transform scale-[1.15] sm:scale-100 transition duration-300 ease-in-out"
               id="mainProductImage">
        </div>
      <?php endif; ?>

      <?php
      $valid_thumbnails = array_filter($image_list, fn($img) => trim($img) !== '');
      if (!empty($valid_thumbnails)):
      ?>
        <div class="grid grid-cols-3 gap-2 mt-4">
          <?php foreach ($valid_thumbnails as $index => $img): ?>
            <img src="<?= htmlspecialchars($img) ?>"
                 class="h-24 w-full object-cover rounded cursor-pointer thumbnail"
                 data-index="<?= $index ?>" alt="">
          <?php endforeach; ?>
        </div>
      <?php endif; ?>
    </div>

    <!-- Product Details -->
    <div class="md:w-1/2">
      <h1 class="text-3xl font-bold text-gray-800 mb-2"><?= htmlspecialchars($product['title']) ?></h1>

      <?php if (!empty($product['category'])): ?>
        <p class="text-sm text-gray-600 mb-4">From <?= htmlspecialchars($product['category']) ?> Collection</p>
      <?php endif; ?>

      <?php if (!empty($product['price'])): ?>
        <div class="text-3xl font-bold text-pink-600 mb-4">₹<?= number_format($product['price'], 2) ?></div>
      <?php endif; ?>

      <div class="flex gap-4 mb-6" id="actionButtons">
        <button onclick="toggleWishlist(<?= $product['id'] ?>)" id="wishlistBtn"
                class="w-1/2 <?= $isInWishlist ? 'bg-pink-50 border border-pink-300 text-pink-400' : 'bg-white border border-pink-600 text-pink-600 hover:bg-pink-50' ?> py-2 rounded">
          <?= $isInWishlist ? '❤️ In Wishlist' : 'Add to Wishlist' ?>
        </button>
        <button onclick="addToCart(<?= $product['id'] ?>)" id="cartBtn"
                class="w-1/2 <?= $isInCart ? 'bg-green-100 border border-green-400 text-green-600' : 'bg-pink-600 text-white hover:bg-pink-700' ?> py-2 rounded">
          <?= $isInCart ? '🛒 In Cart' : 'Add to Cart' ?>
        </button>
      </div>

      <!-- Description -->
      <?php if (!empty($product['description'])): ?>
        <div class="md:w-full">
          <h3 class="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">Description</h3>
          <h1 class="text-md text-gray-800 mb-2"><?= htmlspecialchars($product['description']) ?></h1>
        </div>
      <?php endif; ?>

      <!-- Specifications -->
      <?php
      $specs = [
        'Material'      => $product['material'] ?? '',
        'Item Weight'   => ((float)$product['gross_weight'] > 0) ? $product['gross_weight'] . ' g' : '',
        'Metal Weight'  => ((float)$product['metal_weight'] > 0) ? $product['metal_weight'] . ' g' : '',
        'Stone Weight'  => ((float)$product['stone_weight'] > 0) ? $product['stone_weight'] . ' g' : '',
        'Dimensions'    => $product['dimensions'] ?? '',
        'Size'          => $product['size'] ?? '',
        'Stone'         => $product['stones'] ?? '',
      ];
      

      $hasSpecs = false;
      foreach ($specs as $val) {
        if (!empty($val)) {
          $hasSpecs = true;
          break;
        }
      }

      if ($hasSpecs):
      ?>
        <div class="mt-10 bg-gray-50 rounded-xl shadow-sm p-6">
          <h3 class="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">Specifications</h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 text-sm text-gray-700">
            <?php foreach ($specs as $label => $value):
              if (!empty($value)): ?>
                <div class="flex justify-between border-b pb-1">
                  <span class="font-medium"><?= htmlspecialchars($label) ?>:</span>
                  <span class="text-gray-600"><?= htmlspecialchars($value) ?></span>
                </div>
              <?php endif;
            endforeach; ?>
          </div>
        </div>
      <?php endif; ?>
    </div>
  </div>


  <!-- Reviews -->
  <div class="mt-16">
    <h2 class="text-2xl font-bold text-gray-800 mb-4">Customer Reviews</h2>
    <?php if (isset($_SESSION['user_id'])): ?>
      <form action="submit-review.php" method="POST" class="bg-white p-6 rounded shadow mb-6">
        <input type="hidden" name="product_id" value="<?= $product_id ?>">
        <textarea name="review" required placeholder="Write your review..." class="w-full p-3 border rounded mb-4"></textarea>
        <select name="rating" required class="border p-2 mb-4">
          <option value="">Rating</option>
          <?php for ($i = 5; $i >= 1; $i--): ?>
            <option value="<?= $i ?>"><?= $i ?> ★</option>
          <?php endfor; ?>
        </select>
        <button class="bg-pink-600 text-white px-6 py-2 rounded hover:bg-pink-700">Submit Review</button>
      </form>
    <?php else: ?>
      <p class="text-gray-600 italic mb-6">Please <a href="login.php" class="text-pink-600 underline">log in</a> to write a review.</p>
    <?php endif; ?>

    <?php while ($r = $reviews->fetch_assoc()): ?>
      <div class="bg-white p-4 mb-4 rounded shadow border-l-4 border-pink-500">
        <p class="font-semibold text-pink-700"><?= htmlspecialchars($r['name']) ?></p>
        <p class="text-sm text-yellow-500"><?= str_repeat("★", $r['rating']) . str_repeat("☆", 5 - $r['rating']) ?></p>
        <p class="text-gray-700"><?= nl2br(htmlspecialchars($r['review'])) ?></p>
        <p class="text-xs text-gray-400 mt-1"><?= date("F j, Y", strtotime($r['created_at'])) ?></p>
      </div>
    <?php endwhile; ?>
  </div>

  <!-- Related Products -->
  <div class="mt-16">
    <h2 class="text-2xl font-bold text-gray-800 mb-4">You May Also Like</h2>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
      <?php while ($rel = $related_products->fetch_assoc()): ?>
        <a href="product.php?id=<?= $rel['id'] ?>" class="bg-white p-4 rounded-lg shadow hover:shadow-lg transition text-center">
          <img src="<?= htmlspecialchars(explode(',', $rel['image'])[0]) ?>" class="w-full h-40 object-cover rounded mb-2" alt="">
          <h3 class="text-sm font-semibold text-gray-700"><?= htmlspecialchars($rel['title']) ?></h3>
          <p class="text-pink-600 font-bold">₹<?= number_format($rel['price'], 2) ?></p>
        </a>
      <?php endwhile; ?>
    </div>
  </div>
</div>

<!-- Lightbox Modal -->
<div id="lightboxModal" class="fixed inset-0 bg-black/80 z-50 flex items-center justify-center hidden">
  <div class="relative bg-white rounded-xl shadow-xl max-w-[90vw] max-h-[90vh] p-4 flex flex-col items-center justify-center">
    <button id="closeLightbox" class="absolute top-3 right-3 text-gray-700 hover:text-black text-xl bg-gray-200 hover:bg-gray-300 rounded-full w-8 h-8 flex items-center justify-center">✖</button>
    <img id="lightboxImage" src="" class="max-h-[70vh] object-contain rounded" alt="Product Image">
    <button id="prevImageBtn" class="absolute left-4 text-black text-4xl z-50">&#10094;</button>
    <button id="nextImageBtn" class="absolute right-4 text-black text-4xl z-50">&#10095;</button>
  </div>
</div>

<?php include 'includes/footer.php'; ?>

<script>
let currentImageIndex = 0;
const imageList = <?= json_encode($image_list) ?>;
const modal = document.getElementById("lightboxModal");
const lightboxImage = document.getElementById("lightboxImage");

function openLightbox(index) {
  currentImageIndex = index;
  lightboxImage.src = imageList[index];
  modal.classList.remove("hidden");
  document.body.classList.add("overflow-hidden");
}
function closeLightbox() {
  modal.classList.add("hidden");
  document.body.classList.remove("overflow-hidden");
}
function prevImage() {
  currentImageIndex = (currentImageIndex - 1 + imageList.length) % imageList.length;
  lightboxImage.src = imageList[currentImageIndex];
}
function nextImage() {
  currentImageIndex = (currentImageIndex + 1) % imageList.length;
  lightboxImage.src = imageList[currentImageIndex];
}

document.getElementById("mainProductImage").addEventListener("click", () => openLightbox(0));
document.querySelectorAll(".thumbnail").forEach((thumb, index) => {
  thumb.addEventListener("click", () => openLightbox(index));
});
document.getElementById("closeLightbox").addEventListener("click", closeLightbox);
document.getElementById("prevImageBtn").addEventListener("click", prevImage);
document.getElementById("nextImageBtn").addEventListener("click", nextImage);

document.addEventListener("keydown", e => {
  if (!modal.classList.contains("hidden")) {
    if (e.key === "ArrowLeft") prevImage();
    else if (e.key === "ArrowRight") nextImage();
    else if (e.key === "Escape") closeLightbox();
  }
});

// Wishlist / Cart AJAX
function toggleWishlist(productId) {
  const btn = document.getElementById('wishlistBtn');
  fetch('ajax/add-to-wishlist.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: 'product_id=' + productId
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      btn.textContent = data.action === 'added' ? '❤️ In Wishlist' : 'Add to Wishlist';
      btn.className = data.action === 'added'
        ? 'w-1/2 bg-pink-50 border border-pink-300 text-pink-400 py-2 rounded transition-all'
        : 'w-1/2 bg-white border border-pink-600 text-pink-600 hover:bg-pink-50 py-2 rounded transition-all';
      if (typeof updateWishlistCount === 'function') updateWishlistCount();
    }
  });
}

function addToCart(productId) {
  const btn = document.getElementById('cartBtn');
  if (btn.textContent.includes('In Cart')) return showToast('Already in Cart 🛒');
  fetch('ajax/add-to-cart.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: 'product_id=' + productId + '&quantity=1'
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      btn.textContent = '🛒 In Cart';
      btn.className = 'w-1/2 bg-green-100 border border-green-400 text-green-600 py-2 rounded transition-all';
      showToast('Added to Cart ✅');
      if (typeof updateCartCount === 'function') updateCartCount();
    }
  });
}
</script>
