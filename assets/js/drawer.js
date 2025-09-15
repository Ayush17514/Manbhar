// drawer.js

document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  updateWishlistCount();

  document.getElementById('wishlistButton').addEventListener('click', function () {
    loadWishlistDrawer();
    toggleDrawer('wishlistDrawer');
  });

  document.getElementById('cartButton').addEventListener('click', function () {
    loadCartDrawer();
    toggleDrawer('cartDrawer');
  });
});

function loadWishlistDrawer() {
  fetch('ajax/load-wishlist.php')
    .then(res => res.json())
    .then(data => {
      const el = document.getElementById('wishlistDrawerBody');
      el.innerHTML = data.items.length
        ? data.items.map(item => `
              <div class="flex items-center mb-4 border-b pb-2">
                  <img src="${item.image}" class="w-16 h-16 object-cover rounded mr-4" alt="${item.title}">
                  <div class="flex-1">
                      <h4 class="font-medium text-gray-700">${item.title}</h4>
                      <p class="text-pink-600 font-semibold">₹${item.price}</p>
                  </div>
                  <button onclick="removeFromWishlist(${item.id})" class="text-red-500 text-xl font-bold ml-2">&times;</button>
              </div>
          `).join('')
        : '<p class="text-center text-gray-500 py-6">Your wishlist is empty.</p>';
    });
}
function loadCartDrawer() {
  fetch('ajax/load-cart.php')
    .then(res => res.json())
    .then(data => {
      const el = document.getElementById('cartDrawerBody');

      if (!data.items.length) {
        el.innerHTML = '<p class="text-center text-gray-500 py-6">Your cart is empty.</p>';
        return;
      }

      const itemsHTML = data.items.map(item => `
        <div class="flex items-center mb-4 border-b pb-3">
          <img src="${item.image}" class="w-16 h-16 object-cover rounded mr-4" alt="${item.title}">
          <div class="flex-1">
              <h4 class="font-medium text-gray-700">${item.title}</h4>
              <p class="text-pink-600 font-semibold">₹${item.price.toFixed(2)}</p>

              <!-- Quantity Control -->
              <div class="flex items-center gap-1 mt-1">
                <button class="text-black px-2 py-1 " onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                <span class="text-sm text-gray-700 min-w-[20px] text-center border rounded ">${item.quantity}</span>
                <button class="text-black px-2 py-1 " onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
              </div>

              <p class="text-sm text-gray-500 mt-1">Subtotal: ₹${(item.price * item.quantity).toFixed(2)}</p>
          </div>
          <button onclick="removeFromCart(${item.id})" class="text-red-500 text-xl font-bold ml-2">&times;</button>
        </div>
      `).join('');

      el.innerHTML = `
        <div class="flex flex-col h-full max-h-[90vh]">
          <div class="flex-1 overflow-y-auto pr-2">
            ${itemsHTML}
          </div>

          <div class="border-t p-4 text-sm space-y-1">
            <div class="flex justify-between text-gray-700">
              <span>Subtotal</span>
              <span>₹${data.subtotal.toFixed(2)}</span>
            </div>
            <div class="flex justify-between text-gray-700">
              <span>GST (3%)</span>
              <span>₹${data.gst.toFixed(2)}</span>
            </div>
            <div class="flex justify-between text-gray-700">
              <span>Shipping Charges</span>
              <span>₹${data.shipping.toFixed(2)}</span>
            </div>
            <hr class="my-2 border-gray-300">
            <div class="flex justify-between text-black text-lg font-bold">
              <span>Total</span>
              <span>₹${data.grandTotal.toFixed(2)}</span>
            </div>
            <button onclick="proceedToCheckout()" class="w-full mt-4 bg-pink-600 text-white py-2 rounded hover:bg-pink-700 transition">
              Proceed to Checkout
            </button>
          </div>
        </div>
      `;
    });
}
function updateQuantity(productId, newQty) {
  if (newQty < 1) return;

  fetch('ajax/update-cart-quantity.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `product_id=${productId}&quantity=${newQty}`
  })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        loadCartDrawer(); // Reload cart UI with updated quantity
        updateCartCount?.();
      } else {
        alert(data.message || 'Could not update quantity.');
      }
    });
}



function toggleDrawer(drawerId) {
  const drawer = document.getElementById(drawerId);
  drawer.classList.toggle("translate-x-full");
}

function updateCartCount() {
  fetch('ajax/cart-count.php')
    .then(res => res.json())
    .then(data => {
      document.getElementById('cartCount').innerText = data.count || 0;
    });
}

function updateWishlistCount() {
  fetch('ajax/wishlist-count.php')
    .then(res => res.json())
    .then(data => {
      document.getElementById('wishlistCount').innerText = data.count || 0;
    });
}

function proceedToCheckout() {
  window.location.href = '../checkout.php';
}

function addToCart(productId) {
  fetch('ajax/add-to-cart.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: 'product_id=' + encodeURIComponent(productId)
  })
    .then(() => {
      alert('Added to cart!');
      toggleDrawer('cartDrawer');
      loadCartDrawer();
      updateCartCount();
    })
    .catch(err => console.error(err));
}

function addToWishlist(productId) {
  fetch('ajax/add-to-wishlist.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: 'product_id=' + encodeURIComponent(productId)
  })
    .then(() => {
      alert('Added to wishlist!');
      toggleDrawer('wishlistDrawer');
      loadWishlistDrawer();
      updateWishlistCount();
    })
    .catch(err => console.error(err));
}

function removeFromCart(productId) {
  fetch('ajax/remove-from-cart.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: 'product_id=' + encodeURIComponent(productId)
  })
    .then(() => {
      loadCartDrawer();
      updateCartCount();
    })
    .catch(err => console.error(err));
}

function removeFromWishlist(productId) {
  fetch('ajax/remove-from-wishlist.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: 'product_id=' + encodeURIComponent(productId)
  })
    .then(() => {
      loadWishlistDrawer();
      updateWishlistCount();
    })
    .catch(err => console.error(err));
}
