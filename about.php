<?php include 'includes/header.php'; ?>

<!-- Hero -->
<section class="relative h-[80vh] bg-cover bg-center" style="background-image: url('assets/images/about-hero.jpg');">
  <div class="absolute inset-0 bg-black/50 flex items-center justify-center">
    <div class="text-white text-center px-6 max-w-3xl">
      <h1 class="text-5xl font-bold mb-4 tracking-wide">About Manbhar</h1>
      <p class="text-lg leading-relaxed">
        At <strong>Manbhar</strong>, jewelry isn't just an accessory — it's a story, a legacy, a piece of you.  
        We blend timeless traditions with cutting-edge CAD technology to design jewelry that resonates with your essence.
      </p>
    </div>
  </div>
</section>

<!-- About Section -->
<section class="bg-[#fdfaf6] py-20">
  <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center px-6">

    <!-- Left Content -->
    <div>
      <h2 class="text-sm font-semibold text-[#c59d5f] tracking-widest mb-2">ABOUT MANBHAR</h2>
      <h1 class="text-4xl md:text-5xl font-[Marcellus] text-gray-800 leading-tight mb-6">
        Crafting Luxury jewelry
      </h1>
      <p class="text-gray-600 text-lg leading-relaxed mb-8">
        Manbhar is a custom-designed jewelry brand rooted in elegance and craftsmanship.  
        Every piece is created with precision by experienced CAD jewelry designers and crafted using top-grade materials.  
        We operate on an order-based system, ensuring exclusivity and uniqueness in every product.
      </p>

      <!-- Stats -->
      <div class="grid grid-cols-2 gap-6 mb-8">
        <div class="bg-[#f8f1e9] p-6 rounded-lg text-center">
          <h3 class="text-3xl font-bold text-[#c59d5f]">52+</h3>
          <p class="text-gray-700">Unique Designs</p>
        </div>
        <div class="bg-[#f8f1e9] p-6 rounded-lg text-center">
          <h3 class="text-3xl font-bold text-[#c59d5f]">250+</h3>
          <p class="text-gray-700">Happy Clients</p>
        </div>
      </div>

      <a href="contact.php" class="inline-block px-6 py-3 bg-[#153448] text-white rounded-lg font-semibold shadow hover:bg-[#1d4960] transition">
        More About Us
      </a>
    </div>

    <!-- Right Image with Circle Style -->
    <div class="relative flex justify-center">
      <div class="relative w-[400px] h-[400px] rounded-full overflow-hidden border-[8px] border-[#f3e4d5] shadow-xl">
        <img src="assets/images/about-model.jpg" alt="About Manbhar" class="w-full h-full object-cover">
      </div>
      <!-- Small overlay circle -->
      <div class="absolute -bottom-10 -left-10 w-[180px] h-[180px] rounded-full overflow-hidden border-4 border-white shadow-md">
        <img src="assets/images/about-detail.jpg" alt="Detail shot" class="w-full h-full object-cover">
      </div>
    </div>

  </div>
</section>

<?php include 'includes/footer.php'; ?>
