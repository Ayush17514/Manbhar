<?php
include_once 'includes/header.php'; 

// Fetch featured products
$stmt = $conn->prepare("SELECT id, title, price, description, image FROM products ORDER BY id DESC LIMIT 8");
if ($stmt) {
  $stmt->execute();
  $res = $stmt->get_result();
  $products = [];
  if ($res) {
    while ($row = $res->fetch_assoc()) {
      $products[] = $row;
    }
  }
} else {
  $products = [];
}

$categories = [
  ["name" => "Rings", "image" => "/uploads/categories/rings.webp"],
  ["name" => "Necklaces", "image" => "/uploads/categories/necklace.jpe"],
  ["name" => "Earrings", "image" => "/uploads/categories/earrings.jpe"],
  ["name" => "Bracelets", "image" => "/uploads/categories/braclet.jpe"],
  ["name" => "Pendants", "image" => "/uploads/categories/pendant.jpe"],
  ["name" => "Gold Chains", "image" => "/uploads/categories/gold-chain.jpg"],
  ["name" => "Bangles", "image" => "/uploads/categories/bangle.jpe"],
  ["name" => "Kada", "image" => "/uploads/categories/kada.jpe"],
  ["name" => "Gold Idol", "image" => "/uploads/categories/gold-idol.jpe"],
  ["name" => "Name Pendants", "image" => "/uploads/categories/customized.jpe"],
  ["name" => "Rakhi Jewellery", "image" => "/uploads/categories/rakhi.jpe"],
  ["name" => "All Collections", "image" => "/uploads/categories/Exploremore.png"]
];
?>

<!-- Hero Slider -->
<section class="relative mt-[63px] w-full h-[85vh] sm:h-[90vh] overflow-hidden">
  <div class="swiper h-full">
    <div class="swiper-wrapper">
      
      <!-- Slide 1 -->
      <div class="swiper-slide relative">
        <img src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1600&auto=format&fit=crop&q=80" alt="Royal Jaipur Jewelry" class="absolute top-0 left-0 w-full h-full object-cover brightness-[0.7]">
        <div class="relative z-10 flex flex-col justify-center items-center text-white h-full text-center px-6 max-w-4xl mx-auto">
          <h1 id="heroTitle" class="text-4xl sm:text-5xl md:text-6xl font-serif font-bold mb-4 text-white drop-shadow-md">Where Elegance Meets Emotion</h1>
          <p id="heroSubtitle" class="text-base sm:text-lg md:text-xl mb-8 max-w-2xl text-gray-100 font-light leading-relaxed drop-shadow">Bespoke 3D CAD artistry and authentic BIS hallmarked Jaipur gold & diamond craftsmanship.</p>
          <div class="flex flex-wrap gap-4 justify-center">
            <a href="/collections" class="px-8 py-3.5 bg-[#273639] border border-[#C5A880]/60 text-white rounded-full font-medium shadow-xl hover:bg-[#3C4A4C] hover:border-[#C5A880] transition transform hover:-translate-y-0.5">Explore Collections</a>
            <a href="/services" class="px-8 py-3.5 bg-white/10 backdrop-blur-md border border-white/30 text-white rounded-full font-medium shadow-xl hover:bg-white/20 transition transform hover:-translate-y-0.5">Custom CAD Design</a>
          </div>
        </div>
      </div>

      <!-- Slide 2 -->
      <div class="swiper-slide relative">
        <img src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1600&auto=format&fit=crop&q=80" alt="Polki Diamond Heritage" class="absolute top-0 left-0 w-full h-full object-cover brightness-[0.7]">
        <div class="relative z-10 flex flex-col justify-center items-center text-white h-full text-center px-6 max-w-4xl mx-auto">
          <h2 class="text-4xl sm:text-5xl md:text-6xl font-serif font-bold mb-4 text-white drop-shadow-md">Timeless Heritage & Modern Precision</h2>
          <p class="text-base sm:text-lg md:text-xl mb-8 max-w-2xl text-gray-100 font-light leading-relaxed drop-shadow">From concept render to certified gold ornament. Crafted with love in the Pink City.</p>
          <a href="/collections" class="px-8 py-3.5 bg-[#C5A880] text-[#273639] rounded-full font-semibold shadow-xl hover:bg-[#d8bd98] transition">Discover Bridal Sets</a>
        </div>
      </div>

    </div>
    <div class="swiper-pagination"></div>
  </div>
</section>

<!-- Categories -->
<section class="mt-16 sm:mt-20 category-card max-w-7xl mx-auto px-4 sm:px-6">
  <div class="text-center mb-8">
    <span class="text-xs uppercase tracking-[0.2em] text-[#C5A880] font-semibold">Artisanal Catalog</span>
    <h2 class="text-3xl sm:text-4xl font-serif text-[#273639] mt-1 font-bold">Explore Categories</h2>
    <div class="my-3 flex justify-center">
      <div class="heading-underline w-24 h-[2px] bg-gradient-to-r from-[#153448] via-[#C5A880] to-[#153448] rounded-full"></div>
    </div>
  </div>

  <!-- Desktop Grid -->
  <div class="hidden sm:grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
    <?php foreach ($categories as $cat): ?>
      <a href="/collections?category=<?= urlencode($cat['name']) ?>" class="rounded-xl overflow-hidden flex flex-col text-center hover:shadow-lg bg-white border border-gray-100 transition group">
        <div class="h-28 w-full overflow-hidden bg-gray-50">
          <img src="<?= $cat['image'] ?>" alt="<?= htmlspecialchars($cat['name']) ?>" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" onError="this.src='https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&auto=format&fit=crop&q=80';">
        </div>
        <div class="py-2.5 px-2">
          <span class="text-xs font-medium text-gray-800 tracking-wide"><?= htmlspecialchars($cat['name']) ?></span>
        </div>
      </a>
    <?php endforeach; ?>
  </div>

  <!-- Mobile Carousel -->
  <div class="sm:hidden overflow-x-auto pb-4">
    <div id="mobileCarousel" class="flex gap-3 snap-x px-1 scroll-smooth w-max">
      <?php foreach (array_chunk($categories, 3) as $chunk): ?>
        <div class="flex gap-3 snap-center shrink-0 w-[calc(100vw-2.5rem)]">
          <?php foreach ($chunk as $cat): ?>
            <a href="/collections?category=<?= urlencode($cat['name']) ?>" class="flex-1 border border-gray-200 rounded-xl bg-white overflow-hidden text-center hover:bg-pink-50 transition">
              <div class="h-24 w-full overflow-hidden bg-gray-50">
                <img src="<?= $cat['image'] ?>" alt="<?= htmlspecialchars($cat['name']) ?>" class="w-full h-full object-cover" onError="this.src='https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&auto=format&fit=crop&q=80';">
              </div>
              <div class="py-2 px-1">
                <span class="text-xs font-medium text-gray-800"><?= htmlspecialchars($cat['name']) ?></span>
              </div>
            </a>
          <?php endforeach; ?>
        </div>
      <?php endforeach; ?>
    </div>
  </div>
</section>

<!-- Banner Carousel -->
<div class="relative w-full max-w-7xl mx-auto mt-14 px-4 sm:px-6">
  <div class="swiper banner-swiper h-[160px] sm:h-[200px] md:h-[240px] rounded-2xl overflow-hidden shadow-md">
    <div class="swiper-wrapper">
      <!-- Slide 1 -->
      <div class="swiper-slide bg-cover bg-center flex items-center justify-center relative"
           style="background-image: url('https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=1200&auto=format&fit=crop&q=80');">
        <div class="bg-black/50 backdrop-blur-[2px] w-full h-full flex flex-col items-center justify-center text-center p-4">
          <span class="text-xs uppercase tracking-widest text-[#C5A880] font-semibold mb-1">New Arrivals</span>
          <h3 class="text-white text-xl sm:text-2xl md:text-3xl font-serif font-bold">Discover Our Jaipur Royal Polki Line</h3>
        </div>
      </div>

      <!-- Slide 2 -->
      <div class="swiper-slide bg-cover bg-center flex items-center justify-center relative"
           style="background-image: url('https://images.unsplash.com/photo-1611591475102-40e9d6d376f9?w=1200&auto=format&fit=crop&q=80');">
        <div class="bg-black/50 backdrop-blur-[2px] w-full h-full flex flex-col items-center justify-center text-center p-4">
          <span class="text-xs uppercase tracking-widest text-[#C5A880] font-semibold mb-1">Bespoke Precision</span>
          <h3 class="text-white text-xl sm:text-2xl md:text-3xl font-serif font-bold">Custom 3D CAD Modeling & Casting</h3>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- Featured Products -->
<section class="mt-16 sm:mt-20 product-card max-w-7xl mx-auto px-4 sm:px-6">
  <div class="text-center mb-8">
    <span class="text-xs uppercase tracking-[0.2em] text-[#C5A880] font-semibold">Curated Treasures</span>
    <h2 class="text-3xl sm:text-4xl font-serif text-[#273639] mt-1 font-bold">Manbhar's Signature Picks</h2>
    <div class="my-3 flex justify-center">
      <div class="heading-underline w-28 h-[2px] bg-gradient-to-r from-[#153448] via-[#C5A880] to-[#153448] rounded-full"></div>
    </div>
  </div>

  <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mt-6">
    <?php foreach ($products as $product): 
      $product_id = $product['id'];
      $isWishlisted = false;

      if (isset($_SESSION['user_id']) && isset($conn)) {
        try {
          $uid = (int)$_SESSION['user_id'];
          $wishQuery = $conn->query("SELECT 1 FROM wishlist WHERE user_id = $uid AND product_id = $product_id LIMIT 1");
          $isWishlisted = $wishQuery && $wishQuery->num_rows > 0;
        } catch (Exception $e) {}
      } elseif (isset($_SESSION['wishlist'][$product_id])) {
        $isWishlisted = true;
      }

      $svgFill = $isWishlisted ? 'currentColor' : 'none';
      $svgClass = $isWishlisted ? 'text-pink-600' : 'text-gray-400';

      $imageList = explode(',', $product['image']);
      $main_image = trim($imageList[0]);
    ?>
      <div class="relative bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group flex flex-col">
        
        <!-- Wishlist Icon -->
        <button
          class="absolute top-2.5 right-2.5 z-10 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow hover:scale-110 wishlist-icon-btn transition"
          data-id="<?= $product_id ?>" aria-label="Toggle Wishlist">
          <svg xmlns="http://www.w3.org/2000/svg"
               fill="<?= $svgFill ?>" viewBox="0 0 24 24"
               stroke-width="1.5" stroke="currentColor"
               class="w-4 h-4 transition <?= $svgClass ?>">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M21 8.25c0-2.623-2.122-4.75-4.75-4.75a4.748 4.748 0 00-3.75 1.886A4.748 4.748 0 008.75 3.5C6.122 3.5 4 5.627 4 8.25c0 6.019 8 11 8 11s8-4.981 8-11z" />
          </svg>
        </button>

        <!-- Product Image -->
        <a href="product?id=<?= $product_id ?>" class="block aspect-square overflow-hidden bg-gray-50">
          <img src="<?= htmlspecialchars($main_image) ?>" alt="<?= htmlspecialchars($product['title']) ?>"
               class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
               onError="this.src='https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&auto=format&fit=crop&q=80';">
        </a>

        <!-- Product Info -->
        <div class="p-4 flex flex-col flex-grow justify-between space-y-2">
          <div>
            <h3 class="text-sm font-semibold text-gray-900 leading-snug line-clamp-1"><?= htmlspecialchars($product['title']) ?></h3>
            <p class="text-xs text-gray-500 line-clamp-1 mt-0.5"><?= htmlspecialchars($product['description']) ?></p>
          </div>
          <div>
            <p class="text-[#273639] font-bold text-sm">₹<?= number_format($product['price'], 2) ?></p>
            <button class="addToCart mt-2.5 w-full text-xs font-medium bg-[#273639] text-white py-2 rounded-full hover:bg-[#3C4A4C] transition active:scale-95"
                    data-id="<?= $product_id ?>">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    <?php endforeach; ?>
  </div>
</section>

<!-- About / Philosophy Section -->
<section class="py-16 sm:py-20 mt-12 bg-white border-y border-gray-100">
  <div class="about-text max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
    <div>
      <span class="text-xs uppercase tracking-[0.2em] text-[#C5A880] font-semibold">Jaipur Heritage</span>
      <h2 class="text-3xl sm:text-4xl font-serif text-[#273639] font-bold mt-1 mb-4">The Manbhar Philosophy</h2>
      <p class="text-gray-600 text-sm sm:text-base leading-relaxed mb-6">
        Every masterpiece at Manbhar is a tribute to generational goldsmithing. We seamlessly unite royal Rajasthani heritage with cutting-edge 3D CAD precision, empowering you with certified authenticity, bespoke designs, and lasting emotional value.
      </p>
      <a href="about" class="inline-flex items-center gap-2 px-6 py-2.5 border border-[#273639] text-[#273639] rounded-full text-sm font-medium hover:bg-[#273639] hover:text-white transition">
        <span>Learn Our Story</span>
        <span>&rarr;</span>
      </a>
    </div>
    <div class="about-image">
      <img src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&auto=format&fit=crop&q=80" class="rounded-2xl shadow-xl w-full h-[320px] object-cover" alt="Manbhar Heritage Craftsmanship">
    </div>
  </div>
</section>

<!-- Floating Contact Icon -->
<a href="contact" class="fixed bottom-6 right-6 bg-[#273639] text-white rounded-full p-3.5 shadow-xl hover:bg-[#3C4A4C] hover:scale-105 transition z-40" title="Contact Us">
  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.966 9.966 0 01-4.9-1.308L3 20l1.308-4.9A9.966 9.966 0 013 12c0-4.97 3.582-9 8-9s9 4.03 9 9z" />
  </svg>
</a>

<?php include 'includes/footer.php'; ?>

<!-- Scripts -->
<script src="https://unpkg.com/aos@2.3.4/dist/aos.js"></script>
<script src="https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.js"></script>
<script>
if (typeof AOS !== 'undefined') {
  AOS.init({ once: true, duration: 800, offset: 100 });
}

document.addEventListener('DOMContentLoaded', () => {
  // Safe GSAP Initializer
  if (typeof gsap !== 'undefined') {
    if (document.querySelector("#heroTitle")) {
      gsap.from("#heroTitle", { duration: 1, y: -30, opacity: 0, ease: "power2.out" });
    }
    if (document.querySelector("#heroSubtitle")) {
      gsap.from("#heroSubtitle", { duration: 1.2, y: 20, opacity: 0, delay: 0.2 });
    }
  }

  // Hero Swiper
  if (document.querySelector('.swiper')) {
    new Swiper('.swiper', {
      loop: true,
      autoplay: { delay: 4500, disableOnInteraction: false },
      pagination: { el: '.swiper-pagination', clickable: true },
      effect: 'fade',
      speed: 1000
    });
  }

  // Banner Swiper
  if (document.querySelector('.banner-swiper')) {
    new Swiper('.banner-swiper', {
      loop: true,
      autoplay: { delay: 4000, disableOnInteraction: false },
      speed: 800
    });
  }
});
</script>
