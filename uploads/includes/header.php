<?php
session_start();
require_once __DIR__ . '/db.php';

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
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Poppins:wght@400;500;600&display=swap" rel="stylesheet">
<style>
  body {
    @apply font-[Poppins];
  }

  h1, h2, h3 {
    font-family: 'Playfair Display', serif;
  }
</style>

</head>
<body class="bg-[#f9f6f2] text-[#2f2f2f] font-[Poppins]">
<!-- Loader (visible once per 24 hours) -->
<div id="jewelry-loader" class="fixed inset-0 z-[9999] flex items-center justify-center backdrop-blur-sm bg-white/30 transition-opacity duration-500">
  <img id="iconLoader" src="/uploads/icons/earrings.png" class="w-14 h-14 opacity-0 transition-opacity duration-300 ease-in-out" alt="loading icon" />
</div>

<!-- Preload icons (hidden) -->
<div class="hidden fixed opacity-0">
  <img src="/uploads/icons/earrings.png" />
  <img src="/uploads/icons/diamond-ring.png" />
  <img src="/uploads/icons/pendant.png" />
  <img src="/uploads/icons/jewelry (1).png" />
  <img src="/uploads/icons/box.png" />
  <img src="/uploads/icons/earrings (1).png" />
</div>


<header class="bg-white/90 backdrop-blur-md fixed top-0 left-0 w-full z-50 shadow-md transition-all">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex justify-between items-center h-16">
      
      <!-- Logo + Mobile Toggle -->
      <div class="flex items-center">
        <button id="mobileMenuToggle" class="md:hidden mr-4 text-gray-600 hover:text-pink-500 transition">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2"
               viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </button>
        <a href="index.php" class="flex items-center">
          <img src="/uploads/3.png" alt="Logo" class="h-12 w-auto transition-transform hover:scale-105">
        </a>
      </div>

      <!-- Search Bar (Always Visible) -->
      <div class="hidden sm:flex items-center w-1/3 mx-4">
        <input type="text" placeholder="Search jewelry..."
               class="w-full px-4 py-1 text-sm rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-300 transition">
      </div>

      <!-- Desktop Nav -->
      <nav class="hidden md:flex space-x-8 text-gray-700 font-medium">
        <a href="index.php" class="hover:text-pink-500 transition">Home</a>
        <a href="collections.php" class="hover:text-pink-500 transition">Collection</a>
        <a href="services.php" class="hover:text-pink-500 transition">Services</a>
        <a href="about.php" class="hover:text-pink-500 transition">About</a>
        <a href="contact.php" class="hover:text-pink-500 transition">Contact</a>
      </nav>


      <!-- Icons -->
<div class="flex items-center space-x-4">
  <!-- Wishlist -->
  <button id="wishlistButton" class="relative hover:text-pink-600 transition">
    <!-- Heart icon -->
    <svg class="h-6 w-6 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21.364l-7.682-7.682a4.5 4.5 0 010-6.364z" />
    </svg>
    <span id="wishlistCount" class="absolute -top-1 -right-1 text-xs bg-pink-500 text-white rounded-full px-1">0</span>
  </button>

  <!-- Cart -->
<button id="cartButton" class="relative hover:text-pink-600 transition">
  <img src="/uploads/shopping-bag (1).png" alt="Cart" class="h-6 w-6 ">
  <span id="cartCount" class="absolute -top-1 -right-1 text-xs bg-pink-500 text-white rounded-full px-1">0</span>
</button>
</div>


        <!-- User Dropdown -->
        <?php if ($isLoggedIn): ?>
          <div class="relative">
            <button id="userDropdownToggle" class="flex items-center space-x-1 text-gray-700 font-medium hover:text-pink-600 transition">
              <span><?= htmlspecialchars($userName) ?></span>
              <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M19 9l-7 7-7-7"/>
              </svg>
            </button>
            <div id="userDropdown" class="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg hidden transition-all">
              <?php if ($userType === 'admin'): ?>
                <a href="admin-panel.php" class="block px-4 py-2 hover:bg-gray-100 text-red-600 font-semibold">Admin Panel</a>
              <?php endif; ?>
              <a href="dashboard.php" class="block px-4 py-2 hover:bg-gray-100">Dashboard</a>
              <a href="profile.php" class="block px-4 py-2 hover:bg-gray-100">Profile</a>
              <a href="logout.php" class="block px-4 py-2 hover:bg-gray-100">Logout</a>
            </div>
          </div>
        <?php else: ?>
          <a href="login.php"
             class="bg-pink-50 text-pink-500 px-4 py-2 rounded-full font-semibold border border-pink-300 hover:bg-pink-100 transition">
            Login/SignUp
          </a>
        <?php endif; ?>
      </div>
    </div>
  </div>

  <!-- Mobile Menu -->
  <div id="mobileNavMenu" class="md:hidden hidden border-t bg-white shadow-inner">
    <div class="flex flex-col px-6 py-4 space-y-2 text-gray-700 font-medium">
      <a href="index.php" class="hover:text-pink-500 transition">Home</a>
      <a href="collections.php" class="hover:text-pink-500 transition">Collection</a>
      <a href="about.php" class="hover:text-pink-500 transition">About</a>
      <a href="contact.php" class="hover:text-pink-500 transition">Contact</a>
    </div>
  </div>
</header>
<!-- Drawers -->
<div id="wishlistDrawer"
     class="fixed right-0 top-0 w-80 bg-white shadow-lg h-full z-50 transform translate-x-full transition-transform duration-300 p-4 overflow-y-auto">
  <h2 class="text-xl font-bold text-pink-700 mb-4">Your Wishlist</h2>
  <div id="wishlistDrawerBody">Loading...</div>
  <button onclick="toggleDrawer('wishlistDrawer')" class="absolute top-4 right-4 text-gray-500 hover:text-pink-600">✕</button>
</div>

<div id="cartDrawer"
     class="fixed right-0 top-0 w-80 bg-white shadow-lg h-full z-50 transform translate-x-full transition-transform duration-300 p-4 overflow-y-auto">
  <h2 class="text-xl font-bold text-pink-700 mb-4">Your Cart</h2>
  <div id="cartDrawerBody">Loading...</div>
  <button onclick="toggleDrawer('cartDrawer')" class="absolute top-4 right-4 text-gray-500 hover:text-pink-600">✕</button>
</div>

<script>
  document.addEventListener("DOMContentLoaded", function () {
    // Toggle dropdown
    const dropdownBtn = document.getElementById("userDropdownToggle");
    const dropdown = document.getElementById("userDropdown");
    dropdownBtn?.addEventListener("click", function () {
      dropdown.classList.toggle("hidden");
    });

    // Mobile menu
    document.getElementById("mobileMenuToggle").addEventListener("click", function () {
      document.getElementById("mobileNavMenu").classList.toggle("hidden");
    });

    document.addEventListener("click", function (e) {
      if (!dropdownBtn.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown?.classList.add("hidden");
      }
    });
  });
</script>
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

  // Use the page path as a key (e.g., "/collections.php")
  const pageKey = "manbhar_loader_shown_" + window.location.pathname;

  if (!sessionStorage.getItem(pageKey)) {
    // Show loader
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
          sessionStorage.setItem(pageKey, "true"); // Mark this page as shown
        }, 500);
      }, 2000);
    });
  } else {
    loader.remove(); // Skip loader
  }
</script>

