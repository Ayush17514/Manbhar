// main.js
function openWishlist() {
    loadWishlistDrawer();
    toggleDrawer('wishlistDrawer');
}

function closeWishlist() {
    toggleDrawer('wishlistDrawer');
}

// === Open / Close Cart ===
function openCart() {
    loadCartDrawer();
    toggleDrawer('cartDrawer');
}

function closeCart() {
    toggleDrawer('cartDrawer');
}

// === Remove from Wishlist ===
function removeFromWishlist(productId) {
    fetch('ajax/remove-from-wishlist.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: 'product_id=' + encodeURIComponent(productId)
    })
        .then(() => {
            updateWishlistCount();
            loadWishlistDrawer();
        })
        .catch(err => console.error(err));
}

// === Remove from Cart ===
function removeFromCart(productId) {
    fetch('ajax/remove-from-cart.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: 'product_id=' + encodeURIComponent(productId)
    })
        .then(() => {
            updateCartCount();
            loadCartDrawer();
        })
        .catch(err => console.error(err));
}

function initTracking(productId = null) {
  // Track product view
  if (productId) sendEvent({ event_type: 'view_product', product_id: productId });

  // Track Add to Cart buttons
  document.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', () => {
      const pid = btn.dataset.productId || productId;
      sendEvent({ event_type: 'button_click', button_name: 'Add to Cart', product_id: pid });
    });
  });

  // Track Wishlist buttons
  document.querySelectorAll('.wishlist-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const pid = btn.dataset.productId || productId;
      sendEvent({ event_type: 'button_click', button_name: 'Wishlist', product_id: pid });
    });
  });

  // Track Checkout button
  const checkoutBtn = document.getElementById('checkoutBtn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      sendEvent({ event_type: 'checkout' });
    });
  }

  // Track search form
  const searchForm = document.getElementById('searchForm');
  if (searchForm) {
    searchForm.addEventListener('submit', (e) => {
      const queryInput = document.getElementById('searchInput');
      if (queryInput && queryInput.value.trim() !== '') {
        sendEvent({ event_type: 'search', search_query: queryInput.value.trim() });
      }
    });
  }
}

// Helper to send event to PHP
function sendEvent(data) {
  fetch('/ajax/track-event.php', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' }
  }).then(res => res.json())
    .then(res => console.log('Event tracked:', res))
    .catch(err => console.error('Tracking error:', err));
}
