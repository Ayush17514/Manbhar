<?php include 'includes/header.php'; ?>

<section class="bg-white py-12 pt-28">
  <div class="max-w-7xl mx-auto px-6 md:px-12">
    <div class="grid md:grid-cols-2 gap-16 items-start">

      <!-- Contact Form -->
      <div>
        <h2 class="text-4xl font-bold text-gray-800 mb-4">Get in Touch</h2>
        <p class="text-gray-500 mb-10 text-lg leading-relaxed">
          Whether you want to customize a piece or inquire about an order, we’re here to help you make moments memorable.
        </p>
<?php if (!empty($_SESSION['contact_success'])): ?>
  <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
    <?= $_SESSION['contact_success']; unset($_SESSION['contact_success']); ?>
  </div>
<?php elseif (!empty($_SESSION['contact_error'])): ?>
  <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
    <?= $_SESSION['contact_error']; unset($_SESSION['contact_error']); ?>
  </div>
<?php endif; ?>

        <form action="submit-contact.php" method="POST" class="space-y-6">
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
            <input type="text" name="name" required class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400" placeholder="Ayush Agrawal">
          </div>

          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
            <input type="email" name="email" required class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400" placeholder="you@example.com">
          </div>

          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-1">Message</label>
            <textarea name="message" rows="5" required class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400" placeholder="Write your message here..."></textarea>
          </div>

          <button type="submit" class="bg-pink-600 hover:bg-pink-700 text-white font-medium px-6 py-2 rounded-lg transition duration-300 shadow">
            Send Message
          </button>
        </form>
      </div>

      <!-- Contact Info -->
      <div class="bg-pink-50 rounded-xl p-8 shadow-sm space-y-6">
        <h3 class="text-xl font-semibold text-gray-800 mb-4">Contact Details</h3>

        <div class="flex items-start gap-4">
          <p class="text-gray-600">📍 Manbhar CAD-840, Bagru Walo Ka Rasta, near Vijay Clinic, Chandpole, Purani Basti,Jaipur,Rajasthan 302001</p>
        </div>

        <div class="flex items-start gap-4">
          <p class="text-gray-600">✉️ manbharcadjewellery22@gmail.com</p>
        </div>

        <div class="flex items-start gap-4">
          <p class="text-gray-600">📞 +91 8852884944</p>
        </div>

        <div class="flex gap-4 mt-6">
          <!-- Instagram -->
    <a href="https://www.instagram.com/manbhar_cad_jewelry/?utm_source=qr&r=nametag" class="text-gray-500 hover:text-pink-600 transition" aria-label="Instagram">
      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zm4.25 3a5.25 5.25 0 1 1 0 10.5A5.25 5.25 0 0 1 12 6.5zm0 1.5a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5zm5-1.25a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5z"/>
      </svg>
    </a>

    <!-- Facebook -->
    <a href="https://www.facebook.com/share/1AtufCCVUp/" class="text-gray-500 hover:text-pink-600 transition" aria-label="Facebook">
      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M22 12a10 10 0 1 0-11.5 9.9v-7h-2v-2.9h2v-2.2c0-2 1.2-3.1 3-3.1.9 0 1.8.2 1.8.2v2h-1c-1 0-1.3.6-1.3 1.2v1.9h2.4l-.4 2.9h-2v7A10 10 0 0 0 22 12z"/>
      </svg>
    </a>

    <!-- WhatsApp -->
    <a href="https://wa.me/qr/PPJXDAEGTRRHB1" class="text-gray-500 hover:text-pink-600 transition" aria-label="WhatsApp">
      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2a10 10 0 0 0-8.5 15.5L2 22l4.8-1.5A10 10 0 1 0 12 2zm0 1.8a8.2 8.2 0 0 1 6.9 12.4l-.5.9.8 3-3.2-1a8.2 8.2 0 0 1-4 .8 8.2 8.2 0 0 1-6.8-12.7A8.2 8.2 0 0 1 12 3.8zm4.2 10.8c-.3-.2-1.8-.9-2.1-1-.3-.1-.5-.2-.7.2s-.8 1-.9 1.1c-.2.1-.4.2-.8.1a6.3 6.3 0 0 1-2.6-2.2c-.2-.4 0-.6.1-.7.1-.2.3-.4.4-.6l.2-.3c.1-.2.1-.4 0-.6s-.6-1.6-.9-2.2-.5-.5-.7-.5h-.6a1 1 0 0 0-.7.3 2.8 2.8 0 0 0-.9 2c0 .6.2 1.2.6 1.8a11.6 11.6 0 0 0 6.7 5.7c.5.1.9.2 1.2.1.5-.1 1.5-.6 1.7-1.2s.2-1.1.1-1.2z"/>
      </svg>
    </a>
        </div>
      </div>
    </div>
  </div>
</section>

<?php include 'includes/footer.php'; ?>
