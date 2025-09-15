<?php

session_start();
require_once 'db.php';

$isLoggedIn = isset($_SESSION['user_id']);
$userName = $isLoggedIn ? $_SESSION['user_name'] : null;
$userType = $_SESSION['user_type'] ?? 'customer';
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Jewelry Site</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="/assets/js/main.js" defer></script>
  <script src="/assets/js/drawer.js" defer></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Poppins:wght@400;500;600&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Antic&family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Marcellus&display=swap" rel="stylesheet">
<style>
/* Global Typography Styles */

/* Base body */
body {
  font-family: 'Poppins', sans-serif;
  font-size: 16px;
  line-height: 1.6;
  color: #2f2f2f;
  background-color: #fef9f5;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Headings */
h1, h2, h3, h4, h5, h6 {
  font-family: 'Marcellus', sans-serif;  /* Premium heading */
  font-weight: 600;
  margin-bottom: 0.5em;
  color: #273639; /* dark brand */
}
h1 { font-size: 2.5rem; }
h2 { font-size: 2rem; }
h3 { font-size: 1.75rem; }
h4 { font-size: 1.5rem; }
h5 { font-size: 1.25rem; }
h6 { font-size: 1rem; }

/* Paragraphs & spans */
p, span {
  font-family: 'Marcellus', sans-serif;
  font-size: 1rem;
  margin-bottom: 1em;
  color: #2f2f2f;
}
#scrollNav p {
  color: white !important;
}

/* Links */
a {
  font-family: 'Marcellus', sans-serif;
  text-decoration: none;
  color: #273639;
  transition: color 0.3s ease;
}
 /* a:hover {
  color: #e11d48; /* Tailwind pink-600 */
}
 */
/* Lists */
ul, ol {
  font-family: 'Poppins', sans-serif;
  margin: 1em 0;
  padding-left: 1.5em;
}
li {
  margin-bottom: 0.5em;
}

/* Strong & Emphasis */
strong, b {
  font-weight: 600;
  color: #111;
}
em, i {
  font-style: italic;
  color: #555;
}

/* Blockquotes */
blockquote {
  font-family: 'Marcellus', serif;
  font-size: 1.25rem;
  font-style: italic;
  color: #444;
  border-left: 4px solid #c59d5f;
  padding-left: 1em;
  margin: 1.5em 0;
}

/* Code snippets */
code {
  font-family: 'Courier New', monospace;
  background: #f3f3f3;
  padding: 2px 5px;
  border-radius: 4px;
  font-size: 0.95rem;
  color: #d6336c;
}

/* Tables */
table {
  width: 100%;
  border-collapse: collapse;
  margin: 1.5em 0;
  font-family: 'Poppins', sans-serif;
}
table th, table td {
  border: 1px solid #ddd;
  padding: 0.75em;
}
table th {
  background-color: #273639;
  color: white;
  text-align: left;
}
table tr:nth-child(even) {
  background-color: #f9f9f9;
}

</style>


</head>
<body class=" overflow-x-hidden w-full">


<!-- Loader -->
<div id="jewelry-loader" class="fixed inset-0 z-[9999] flex items-center justify-center backdrop-blur-sm bg-white/30 transition-opacity duration-500">
  <img id="iconLoader" src="/uploads/icons/earrings.png" class="w-14 h-14 opacity-0 transition-opacity duration-300 ease-in-out" alt="loading icon" />
</div>

<!-- Top Header (Always Visible) -->
<div class="bg-[#273639] fixed top-0 left-0 w-full z-50 shadow">
  <div class="max-w-8xl mx-auto px-4 flex justify-between items-center h-16">

    <!-- Left: Logo + Mobile Menu Toggle -->
    <div class="flex items-center">
      <button id="drawerToggle" class="md:hidden mr-4 text-white hover:text-pink-400">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
        </svg>
      </button>
      <a href="index" class="flex items-center">
        <img src="/uploads/manbhar logo.png" alt="Logo" class="h-12 w-auto pb-3  hover:scale-105 transition-transform ">
      </a>
    </div>

    <!-- Center: Desktop Search -->
    <div class="hidden md:flex items-center w-1/3 mx-4">
      <input type="text" placeholder="Search jewelry..." class="w-full px-4 py-1 text-sm rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-300 transition">
    </div>

    <!-- Right: Icons -->
    <div class="flex items-center space-x-4 text-white">

      <!-- Search-->
      <button class="relative hover:text-pink-300 transition md:hidden">
        <img src="/uploads/body/magnifiying-glass.png" alt="search icon" class="h-6 w-6">
      </button>

      <!-- Wishlist -->
      <button id="wishlistButton" class="relative hover:text-pink-300 transition">
        <img src="/uploads/body/love.png" alt="wishlist icon" class="h-6 w-6">
        <span id="wishlistCount" class="absolute -top-1 -right-1 text-xs bg-white text-[#273639] rounded-full px-1">0</span>
      </button>

      <!-- Cart -->
      <button id="cartButton" class="relative hover:text-pink-300 transition">
        <img src="/uploads/body/bag.png" alt="Cart icon" class="h-6 w-6">
        <span id="cartCount" class="absolute -top-1 -right-1 text-xs bg-white text-[#273639] rounded-full px-1">0</span>
      </button>

      <!-- Profile -->
      <?php if ($isLoggedIn): ?>
        <div class="relative">
          <button id="userDropdownToggle" class="flex items-center space-x-1 hover:text-pink-300">
            <span class="hidden md:inline text-white flex items-center"><?= htmlspecialchars($userName) ?></span>

            <img src="/uploads/body/profile-user.png" alt="profile" class="h-6 w-6">
            <!-- Down arrow -->
            <svg class="w-4 h-4 ml-1 hidden md:inline-block" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div id="userDropdown" class="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg hidden text-black z-50">
            <?php if ($userType === 'admin'): ?>
              <a href="admin-panel" class="block px-4 py-2 hover:bg-gray-100 text-red-600">Admin Panel</a>
            <?php endif; ?>
            <a href="dashboard" class="block px-4 py-2 hover:bg-gray-100">Dashboard</a>
            <a href="profile" class="block px-4 py-2 hover:bg-gray-100">Profile</a>
            <a href="logout" class="block px-4 py-2 hover:bg-gray-100">Logout</a>
          </div>
        </div>
      <?php else: ?>
        <a href="login" class="text-white px-4 py-2 rounded-full border transition hidden md:block">Login/SignUp</a>
        <a href="login" class="md:hidden">
          <img src="/uploads/body/profile-user.png" class="h-6 w-6" alt="login">
        </a>
      <?php endif; ?>
    </div>
  </div>
</div>

<!-- Secondary Desktop Nav -->
<div id="scrollNav" class="bg-[#3C4A4C] rounded-b-2xl fixed top-16 left-0 w-full z-40 transition-transform duration-300 ease-in-out hidden md:block">
  <div class="max-w-8xl mx-auto px-4">
    <nav class="flex justify-center space-x-8 py-2 text-white text-sm font-medium">
      <a href="index" class="hover:text-pink-300 transition text-white"><p>Home</p></a>
      <a href="/collections" class="hover:text-pink-300 transition text-white"><p>Collection</p></a>
      <a href="/services" class="hover:text-pink-300 transition text-white"><p>Services</p></a>
      <a href="/about" class="hover:text-pink-300 transition text-white"><p>About</p></a>
      <a href="/contact" class="hover:text-pink-300 transition text-white"><p>Contact</p></a>
    </nav>
  </div>
</div>

<!-- Mobile Drawer Nav -->
<div id="mobileDrawer" class="fixed top-0 left-0 h-full w-64 bg-[#eaf6f6] shadow-lg z-[60] p-6 md:hidden transform -translate-x-full transition-transform duration-300">
  <a href="index" class="flex items-center">
    <img src="/uploads/manbhar logo.png" alt="Logo" class="h-12 w-auto top-4 hover:scale-105 transition-transform">
  </a>
  <button id="drawerClose" class="absolute top-4 right-4 text-gray-500 hover:text-pink-600 text-xl">×</button>
  <nav class="mt-10 space-y-4 text-[#273639] font-semibold">
    <a href="/index" class="block hover:text-pink-500">Home</a>
    <a href="/collections" class="block hover:text-pink-500">Collections</a>
    <a href="/services" class="block hover:text-pink-500">Services</a>
    <a href="/about" class="block hover:text-pink-500">About</a>
    <a href="/contact" class="block hover:text-pink-500">Contact</a>
  </nav>
</div>



<!-- Drawers -->
<div id="wishlistDrawer" class="fixed right-0 top-0 w-64 bg-[#F0F0F0] text-[#273639] shadow-lg h-full z-50 transform translate-x-full transition-transform duration-300 p-4 overflow-y-auto">
  <h2 class="text-xl font-bold text-black mb-4">Your Wishlist</h2>
  <div id="wishlistDrawerBody">Loading...</div>
  <button onclick="toggleDrawer('wishlistDrawer')" class="absolute top-4 right-4 text-gray-500 hover:text-pink-600">✕</button>
</div>

<div id="cartDrawer" class="fixed right-0 top-0 w-64 bg-[#F0F0F0] text-white shadow-lg h-full z-50 transform translate-x-full transition-transform duration-300 p-4 overflow-y-auto">
  <h2 class="text-xl font-bold text-black mb-4">Your Cart</h2>
  <div id="cartDrawerBody" class="h-full flex flex-col max-h-[90vh]">Loading...</div>
  <button onclick="toggleDrawer('cartDrawer')" class="absolute top-4 right-4 text-gray-500 hover:text-pink-600">✕</button>
</div>

<!-- Toast -->
<div id="toast" class="fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-pink-600 text-white px-4 py-2 rounded shadow-lg hidden z-[9999] text-sm"></div>

<script src="/js/main.js"></script>
<script>
document.addEventListener('DOMContentLoaded', function() {
    // On product page, $product['id'] is available
    initTracking(<?= $product['id'] ?? 'null' ?>);
});
</script>

<script>
window.addEventListener('DOMContentLoaded', () => {
  // Ensure drawer starts closed on load
  const drawer = document.getElementById('mobileDrawer');
  drawer.classList.add('-translate-x-full');
});

const drawerToggle = document.getElementById('drawerToggle');
const drawer = document.getElementById('mobileDrawer');
const drawerClose = document.getElementById('drawerClose');

drawerToggle.addEventListener('click', () => {
  drawer.classList.remove('-translate-x-full');
  document.body.classList.add('overflow-hidden');
});

drawerClose.addEventListener('click', () => {
  drawer.classList.add('-translate-x-full');
  document.body.classList.remove('overflow-hidden');
});

document.addEventListener('click', (e) => {
  if (!drawer.contains(e.target) && !drawerToggle.contains(e.target)) {
    drawer.classList.add('-translate-x-full');
    document.body.classList.remove('overflow-hidden');
  }
});

  // Dropdown toggle
  const userBtn = document.getElementById("userDropdownToggle");
  const userDropdown = document.getElementById("userDropdown");
  userBtn?.addEventListener("click", () => userDropdown.classList.toggle("hidden"));

  // Scroll hide nav
  let lastScrollY = window.scrollY;
  const scrollNav = document.getElementById('scrollNav');
  window.addEventListener('scroll', () => {
    scrollNav.style.transform = window.scrollY > lastScrollY ? 'translateY(-100%)' : 'translateY(0)';
    lastScrollY = window.scrollY;
  });
</script>

<!-- Wishlist / Cart / Toast -->
<script>
function updateWishlistCount() {
  fetch('ajax/wishlist-count')
    .then(res => res.json())
    .then(data => document.querySelectorAll('#wishlistCount').forEach(el => el.textContent = data.count));
}

function updateCartCount() {
  fetch('ajax/cart-count')
    .then(res => res.json())
    .then(data => document.querySelectorAll('#cartCount').forEach(el => el.textContent = data.count));
}

function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.remove('hidden');
  setTimeout(() => toast.classList.add('hidden'), 1800);
}

function toggleWishlist(id, btn = null) {
  fetch('ajax/add-to-wishlist', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: 'product_id=' + id
  })
  .then(res => res.json())
  .then(data => {
    updateWishlistCount();
    showToast(data.action === 'added' ? 'Added to Wishlist 💖' : 'Removed from Wishlist');
  });
}

function addToCart(id) {
  fetch('ajax/add-to-cart', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: 'product_id=' + id + '&quantity=1'
  })
  .then(() => {
    updateCartCount();
    showToast('Added to Cart 🛒');
  });
}
</script>

<!-- Loader -->
<script>
  const loader = document.getElementById("jewelry-loader");
  const loaderImg = document.getElementById("iconLoader");

  const icons = [
    "/uploads/icons/earrings.png",
    "/uploads/icons/diamond-ring.png",
    "/uploads/icons/earrings (1).png",
    "/uploads/icons/pendant.png",
    "/uploads/icons/necklace.png",
    "/uploads/icons/box.png",
    "/uploads/icons/jewelry (1).png",
  ];

  const pageKey = "manbhar_loader_shown_" + window.location.pathname;

  if (!sessionStorage.getItem(pageKey)) {
    document.body.style.overflow = "hidden";
    loader.style.display = "flex";
    loaderImg.classList.add("opacity-100");

    let index = 1;
    const rotateIcons = () => {
      loaderImg.classList.remove("opacity-100");
      loaderImg.classList.add("opacity-0");
      setTimeout(() => {
        loaderImg.src = icons[index];
        loaderImg.classList.remove("opacity-0");
        loaderImg.classList.add("opacity-100");
        index = (index + 1) % icons.length;
      }, 300);
    };

    const interval = setInterval(rotateIcons, 700);
    window.addEventListener("load", () => {
      setTimeout(() => {
        loader.classList.add("opacity-0");
        clearInterval(interval);
        setTimeout(() => {
          loader.remove();
          document.body.style.overflow = "";
          sessionStorage.setItem(pageKey, "true");
        }, 500);
      }, 2000);
    });
  } else {
    loader.remove();
  }
</script>
