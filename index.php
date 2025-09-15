
<?php include 'includes/header.php'; 


// Fetch featured products
$stmt = $conn->prepare("SELECT id, title, price, description, image FROM products ORDER BY id DESC LIMIT 8");
$stmt->execute();
$res = $stmt->get_result();
$products = [];
while ($row = $res->fetch_assoc()) {
  $products[] = $row;
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
  ["name" => "", "image" => "/uploads/categories/Exploremore.png"]
];
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <!-- Basic Meta -->
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="theme-color" content="#F2F0EF" />

  <!-- SEO Meta -->
  <title>Manbhar - Fine Jewelry | Gold, Diamond & Silver Ornaments</title>
  <meta name="description" content="Discover timeless elegance with Manbhar's handcrafted fine jewelry. Shop certified gold, diamond, and silver ornaments with trust and tradition." />
  <meta name="keywords" content="Manbhar Jewelry, Fine Jewelry, Gold Jewelry, Diamond Earrings, Buy Jewelry Online, Indian Jewelry Store" />
  <meta name="author" content="Manbhar Team" />

  <!-- Canonical -->
  <link rel="canonical" href="https://manbhar.jaincabs.in" />

  <!-- Open Graph (Facebook, LinkedIn) -->
  <meta property="og:title" content="Manbhar - Fine Jewelry Online" />
  <meta property="og:description" content="Explore handcrafted collections of gold, diamond, and silver jewelry. Certified, elegant, and made to shine." />
  <meta property="og:image" content="https://manbhar.jaincabs.in/assets/images/og-banner.jpg" />
  <meta property="og:url" content="https://manbhar.jaincabs.in/" />
  <meta property="og:type" content="website" />

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Manbhar - Elegant Jewelry for Every Occasion" />
  <meta name="twitter:description" content="Gold, diamond & silver jewelry handcrafted with love. Trusted quality & elegant design." />
  <meta name="twitter:image" content="https://manbhar.jaincabs.in/assets/images/og-banner.jpg" />

  <!-- Favicon -->
  <link rel="icon" href="/assets/images/favicon.ico" type="image/x-icon" />

  <!-- External CSS & JS Libraries -->
  <link href="https://unpkg.com/aos@2.3.4/dist/aos.css" rel="stylesheet" />
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper/swiper-bundle.min.css" />
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://unpkg.com/gsap@3/dist/gsap.min.js"></script>
  <script src="https://unpkg.com/gsap@3/dist/ScrollTrigger.min.js"></script>
  <script src="/assets/js/main.js" defer></script>

  <!-- Fonts -->
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />

  <!-- Custom Styles -->
  <style>
    .shimmer-glow::after {
      content: "";
      position: absolute;
      top: 0; left: 0;
      height: 100%; width: 200%;
      background-image: linear-gradient(90deg,
        rgba(255, 255, 255, 0) 0%,
        rgba(255, 255, 255, 0.5) 50%,
        rgba(255, 255, 255, 0) 100%);
      animation: shimmer 2s linear infinite;
      opacity: 0.2;
    }
    @keyframes shimmer {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(100%); }
    }
  </style>
</head>

<body class="bg-[#fef9f5] text-[#2f2f2f] overflow-x-hidden w-full">
<!-- Hero -->
<section class="relative mt-[63px] w-full h-[100dvh] overflow-hidden">
  <!-- Slider main container -->
  <div class="swiper h-full">
    <!-- Wrapper -->
    <div class="swiper-wrapper">
      
      <!-- Slide 1 -->
      <div class="swiper-slide relative">
        <img src="/uploads/landing2.png" alt="hero1" class="absolute top-0 left-0 w-full h-full object-cover brightness-75">
        <div class="relative z-10 flex flex-col justify-center items-center text-white h-full text-center px-4">
          <h1 class="text-5xl md:text-6xl font mb-4 text-white">Where Elegance Meets Emotion</h1>
          <p class="text-lg md:text-xl mb-6 max-w-xl text-white">Custom-crafted jewelry for moments that last a lifetime.</p>
          <a href="/collections" class="px-6 py-3 bg-[#273639] text-white rounded-full font-semibold shadow hover:bg-[#3C4A4C] transition">Explore Collections</a>
        </div>
      </div>

      <!-- Slide 2 -->
      <div class="swiper-slide relative">
        <img src="/uploads/carousel/Shop%20now%20(3).png" alt="hero2" class="absolute top-0 left-0 w-full h-full object-cover brightness-75">
      </div>

    </div>

    <!-- Dotted Pagination -->
    <div class="swiper-pagination"></div>

    
  </div>
</section>

<!-- Categories -->
<section class="mt-20 category-card max-w-7xl mx-auto">
  <h2 class="text-3xl font mb-0 text-black text-center">Explore Categories</h2>
  <div class="my-4 flex justify-center">
    <div class="heading-underline w-0 h-[2px] bg-gradient-to-r from-[#153448] via-[#F7E7CE] to-[#153448] rounded-full transition-all duration-1000 ease-in-out overflow-hidden relative"></div>
  </div>

  <!-- Desktop Grid -->
  <div class="hidden sm:grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-8">
    <?php foreach ($categories as $cat): ?>
      <a href="/collections?category=<?= urlencode($cat['name']) ?>" class="rounded-xl overflow-hidden flex flex-col text-center hover:shadow-lg bg-white transition">
        <div class="h-28 w-full overflow-hidden">
          <img src="<?= $cat['image'] ?>" alt="<?= $cat['name'] ?>" class="w-full h-full object-cover hover:scale-105 transition-transform">
        </div>
        <div class="py-2 px-1">
          <span class="text-sm font-medium text-gray-800"><?= $cat['name'] ?></span>
        </div>
      </a>
    <?php endforeach; ?>
  </div>

  <!-- Mobile Carousel -->
  <div class="sm:hidden mt-6 overflow-x-auto">
    <div id="mobileCarousel" class="flex gap-4 snap-x px-1 scroll-smooth w-max">
      <?php foreach (array_chunk($categories, 3) as $chunk): ?>
        <div class="flex gap-4 snap-center shrink-0 w-[calc(100vw-2rem)]">
          <?php foreach ($chunk as $cat): ?>
            <a href="/collections?category=<?= urlencode($cat['name']) ?>" class="flex-1 border rounded-xl bg-white overflow-hidden text-center hover:bg-pink-50 transition">
              <div class="h-28 w-full overflow-hidden">
                <img src="<?= $cat['image'] ?>" alt="<?= $cat['name'] ?>" class="w-full h-full object-cover hover:scale-105 transition-transform">
              </div>
              <div class="py-2 px-1">
                <span class="text-sm font-medium text-gray-800"><?= $cat['name'] ?></span>
              </div>
            </a>
          <?php endforeach; ?>
        </div>
      <?php endforeach; ?>
    </div>
  </div>
</section>

<!-- Banner Carousel -->
<div class="relative w-full max-w-7xl mx-auto mt-12  overflow-hidden ">
  <div class="swiper banner-swiper h-[160px] sm:h-[200px] md:h-[240px]">
    <div class="swiper-wrapper">
      <!-- Slide 1 -->
      <div class="swiper-slide bg-cover bg-center flex items-center justify-center"
           style="background-image: url('/uploads/banners/banner1.jpg');">
        <div class="bg-black/40 w-full h-full flex items-center justify-center">
          <h2 class="text-white text-lg md:text-2xl font-semibold">Discover Our New Collection</h2>
        </div>
      </div>

      <!-- Slide 2 -->
      <div class="swiper-slide bg-cover bg-center flex items-center justify-center"
           style="background-image: url('/uploads/banners/banner2.jpg');">
        <div class="bg-black/40 w-full h-full flex items-center justify-center">
          <h2 class="text-white text-lg md:text-2xl font-semibold">Handcrafted Jewelry, Just for You</h2>
        </div>
      </div>

      <!-- Slide 3 -->
      <div class="swiper-slide bg-cover bg-center flex items-center justify-center"
           style="background-image: url('/uploads/banners/banner3.jpg');">
        <div class="bg-black/40 w-full h-full flex items-center justify-center">
          <h2 class="text-white text-lg md:text-2xl font-semibold">Elegant. Premium. Timeless.</h2>
        </div>
      </div>
    </div>
  </div>
</div>



<!-- Featured Products -->
<section class="mt-20 product-card max-w-7xl mx-auto">
  <h2 class="text-3xl font mb-0 text-gray-800 text-center">Manbhar's Signature Picks</h2>
  <div class="my-4 flex justify-center">
    <div class="heading-underline w-28 h-[2px] bg-gradient-to-r from-[#153448] via-[#F7E7CE] to-[#153448] rounded-full transition-all duration-1000 ease-in-out"></div>
  </div>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  <!-- Product Grid -->
<div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 mt-8">
  <?php foreach ($products as $product): 
    $product_id = $product['id'];
    $isWishlisted = false;

    // Check wishlist status for the current product
    if (isset($_SESSION['user_id'])) {
      $uid = $_SESSION['user_id'];
      $wishQuery = $conn->query("SELECT 1 FROM wishlist WHERE user_id = $uid AND product_id = $product_id LIMIT 1");
      $isWishlisted = $wishQuery && $wishQuery->num_rows > 0;
    } elseif (isset($_SESSION['wishlist'][$product_id])) {
      $isWishlisted = true;
    }

    $svgFill = $isWishlisted ? 'currentColor' : 'none';
    $svgClass = $isWishlisted ? 'text-pink-600' : 'text-gray-400';

    $imageList = explode(',', $product['image']);
    $main_image = trim($imageList[0]);

  ?>
    <div class="relative bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group">
      
      <!-- Wishlist Icon -->
      <button
        class="absolute top-2 right-2 z-10 bg-white rounded-full p-1 shadow wishlist-icon-btn"
        data-id="<?= $product_id ?>" aria-label="Toggle Wishlist">
        <svg xmlns="http://www.w3.org/2000/svg"
             fill="<?= $svgFill ?>" viewBox="0 0 24 24"
             stroke-width="1.5" stroke="currentColor"
             class="w-5 h-5 transition <?= $svgClass ?>">
          <path stroke-linecap="round" stroke-linejoin="round"
                d="M21 8.25c0-2.623-2.122-4.75-4.75-4.75a4.748 4.748 0 00-3.75 1.886A4.748 4.748 0 008.75 3.5C6.122 3.5 4 5.627 4 8.25c0 6.019 8 11 8 11s8-4.981 8-11z" />
        </svg>
      </button>

      <!-- Product Image -->
      <a href="product?id=<?= $product_id ?>" class="block aspect-square overflow-hidden">
        <img src="<?= htmlspecialchars($main_image) ?>" alt="<?= htmlspecialchars($product['title']) ?>"
             class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105">
      </a>

      <!-- Product Info -->
      <div class="p-3 flex flex-col space-y-1">
        <h3 class="text-[13px] font-medium text-gray-800 leading-tight"><?= htmlspecialchars($product['title']) ?></h3>
        <h2 class="text-[13px] font-medium text-gray-800 leading-tight"><?= htmlspecialchars($product['description']) ?></h2>
        <div class="flex items-center space-x-2">
          <p class="text-pink-600 font-semibold mt-1">₹<?= number_format($product['price'], 2) ?></p>
        </div>
        <button class="addToCart mt-2 w-full text-xs bg-[#273639] text-white py-1.5 rounded-full hover:bg-[#3C4A4C] transition"
                data-id="<?= $product_id ?>">
          Add to Cart
        </button>
      </div>
    </div>
  <?php endforeach; ?>
</div>
</div>
</section>

<!-- About -->
<section class="py-20">
  <div class="about-text max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
    <div>
      <h2 class="text-3xl font mb-4">The Manbhar Philosophy</h2>
      <p class="text-gray-700 mb-4">Every design at Manbhar is a tribute to craftsmanship. We blend traditional elegance with modern aesthetics to bring timeless pieces to life.</p>
      <a href="about" class="inline-block px-5 py-2 border border-pink-500 text-pink-500 rounded-full hover:bg-pink-500 hover:text-white transition">Learn More</a>
    </div>
    <div class="about-image">
      <img src="/assets/images/philosophy.jpg" class="rounded-xl shadow-lg" alt="Philosophy">
    </div>
  </div>
</section>

<!-- Contact Button -->
<a href="contact" class="fixed bottom-6 right-6 bg-pink-500 hover:bg-pink-600 text-white rounded-full p-4 shadow-lg transition" title="Contact Us">
  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.966 9.966 0 01-4.9-1.308L3 20l1.308-4.9A9.966 9.966 0 013 12c0-4.97 3.582-9 8-9s9 4.03 9 9z" />
  </svg>
</a>
<div id="toast" class="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-pink-600 text-white px-4 py-2 rounded shadow hidden z-50"></div>


<?php include 'includes/footer.php'; ?>

<!-- Scripts -->
<script src="https://unpkg.com/aos@2.3.4/dist/aos.js"></script>
<script>AOS.init({ once: true, duration: 800, offset: 100 });</script>
<script src="https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.js"></script>
<script src="ajax/assets/js/drawer.js"></script>
<script>
gsap.registerPlugin(ScrollTrigger);

// Animate heading underline
document.addEventListener('DOMContentLoaded', () => {
  const lines = document.querySelectorAll('.heading-underline');
  lines.forEach(line => {
    line.classList.remove('w-0');
    line.classList.add('w-64');
    setTimeout(() => {
      line.classList.remove('w-64');
      line.classList.add('w-[120px]');
    }, 1000);
    setTimeout(() => {
      line.classList.add('shimmer-glow');
    }, 2000);
  });
});

// Hero animation
gsap.from("#heroTitle", { duration: 1, y: -50, opacity: 0, ease: "power2.out" });
gsap.from("#heroSubtitle", { duration: 1.2, y: 30, opacity: 0, delay: 0.3 });

  const swiper = new Swiper('.swiper', {
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    effect: 'fade', // you can use 'slide' or 'fade'
    speed: 1000
  });

// Scroll reveals
[".category-card", ".product-card", ".about-text", ".about-image"].forEach((selector, i) => {
  gsap.from(selector, {
    scrollTrigger: {
      trigger: selector,
      start: "top 90%",
      toggleActions: "play none none none"
    },
    y: 40,
    opacity: 0,
    duration: 0.8,
    delay: i * 0.1
  });
});

// Banner Swiper
const bannerSwiper = new Swiper('.banner-swiper', {
  loop: true,
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
  },
  pagination: {
    el: '.banner-swiper .swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.banner-swiper .swiper-button-next',
    prevEl: '.banner-swiper .swiper-button-prev',
  },
  effect: 'slide',
  speed: 800,
});



// Wishlist & Cart Toggle
document.addEventListener('click', e => {
  if (e.target.closest('.wishlist-icon-btn')) {
    const btn = e.target.closest('.wishlist-icon-btn');
    const id = btn.dataset.id;

    fetch('ajax/add-to-wishlist', {
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
    fetch('ajax/add-to-cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: 'product_id=' + id + '&quantity=1'
    }).then(() => {
      updateCartCount?.();
      showToast('Added to Cart');
    });
  }
});

//document.addEventListener("DOMContentLoaded", () => fetchProducts(true));

</script>

</body>
</html>
