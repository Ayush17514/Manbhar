// main.js

// --- Drawer Functions ---
// Assumes toggleDrawer, loadWishlistDrawer, loadCartDrawer are defined elsewhere (e.g., drawer.js)
function openWishlist() {
    loadWishlistDrawer();
    toggleDrawer('wishlistDrawer');
}

function closeWishlist() {
    toggleDrawer('wishlistDrawer');
}

function openCart() {
    loadCartDrawer();
    toggleDrawer('cartDrawer');
}

function closeCart() {
    toggleDrawer('cartDrawer');
}


// --- Wishlist & Cart API Functions ---

function updateWishlistCount() {
  fetch('/ajax/wishlist-count.php')
    .then(res => res.json())
    .then(data => {
        document.querySelectorAll('#wishlistCount').forEach(el => el.textContent = data.count);
    })
    .catch(err => console.error('Failed to update wishlist count:', err));
}

function updateCartCount() {
  fetch('/ajax/cart-count.php')
    .then(res => res.json())
    .then(data => {
        document.querySelectorAll('#cartCount').forEach(el => el.textContent = data.count);
    })
    .catch(err => console.error('Failed to update cart count:', err));
}

function showToast(msg) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.remove('hidden');
  setTimeout(() => toast.classList.add('hidden'), 2500);
}

function toggleWishlist(productId) {
  if (!productId) return;
  fetch('/ajax/add-to-wishlist.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: 'product_id=' + encodeURIComponent(productId)
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      updateWishlistCount();
      showToast(data.action === 'added' ? 'Added to Wishlist 💖' : 'Removed from Wishlist');
      if (document.getElementById('wishlistDrawer')?.classList.contains('translate-x-0')) {
        loadWishlistDrawer();
      }
    } else {
      showToast(data.error || 'Something went wrong.');
    }
  })
  .catch(err => {
      console.error('toggleWishlist error:', err);
      showToast('Error connecting to server.');
  });
}

function addToCart(productId, quantity = 1, btnElement = null) {
  if (!productId) return;

  // --- Live Preview Animation ---
  if (btnElement && typeof gsap !== 'undefined') {
    const productCard = btnElement.closest('.product-card'); 
    const productImage = productCard ? productCard.querySelector('img') : null;
    const cartIcon = document.getElementById('cartButton');

    if (productImage && cartIcon) {
      const imageRect = productImage.getBoundingClientRect();
      const cartRect = cartIcon.getBoundingClientRect();

      const flyingImage = productImage.cloneNode(true);
      flyingImage.style.position = 'fixed';
      flyingImage.style.left = imageRect.left + 'px';
      flyingImage.style.top = imageRect.top + 'px';
      flyingImage.style.width = imageRect.width + 'px';
      flyingImage.style.height = imageRect.height + 'px';
      flyingImage.style.zIndex = '9999';
      flyingImage.style.pointerEvents = 'none';
      document.body.appendChild(flyingImage);

      gsap.to(flyingImage, {
        left: cartRect.left + cartRect.width / 2,
        top: cartRect.top + cartRect.height / 2,
        width: 0,
        height: 0,
        opacity: 0.5,
        duration: 1,
        onComplete: () => {
          flyingImage.remove();
          gsap.fromTo(cartIcon, { scale: 1.5 }, { scale: 1, duration: 0.3 });
        }
      });
    }
  }

  fetch('/ajax/add-to-cart.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `product_id=${encodeURIComponent(productId)}&quantity=${encodeURIComponent(quantity)}`
  })
  .then(res => res.json())
  .then(data => {
      if(data.success) {
        setTimeout(() => {
            showToast('Added to Cart 🛒');
            updateCartCount();
        }, 1000);

        const cartDrawerBody = document.getElementById('cartDrawerBody');
        if (cartDrawerBody && data.drawer_html) {
            cartDrawerBody.innerHTML = data.drawer_html;
        }
      } else {
        showToast(data.error || 'Failed to add to cart.');
      }
  })
  .catch(err => {
      console.error('addToCart error:', err);
      showToast('Error connecting to server.');
  });
}

function removeFromWishlist(productId) {
    fetch('/ajax/remove-from-wishlist.php', {
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

function removeFromCart(productId) {
    fetch('/ajax/remove-from-cart.php', {
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

// --- Event Tracking & Initialization ---

function sendEvent(data) {
  fetch('/ajax/track-event.php', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' }
  }).then(res => res.json())
    .then(res => console.log('Event tracked:', res))
    .catch(err => console.error('Tracking error:', err));
}

function initPage(productId = null) {
  if (productId) {
      sendEvent({ event_type: 'view_product', product_id: productId });
  }

  document.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const pid = btn.dataset.productId || productId;
      if (pid) {
        addToCart(pid, 1, btn);
        sendEvent({ event_type: 'button_click', button_name: 'Add to Cart', product_id: pid });
      }
    });
  });

  document.querySelectorAll('.wishlist-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const pid = btn.dataset.productId || productId;
      if (pid) {
        toggleWishlist(pid);
        sendEvent({ event_type: 'button_click', button_name: 'Wishlist', product_id: pid });
      }
    });
  });

  const checkoutBtn = document.getElementById('checkoutBtn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => sendEvent({ event_type: 'checkout' }));
  }

  const searchForm = document.getElementById('searchForm');
  if (searchForm) {
    searchForm.addEventListener('submit', (e) => {
      const queryInput = document.getElementById('searchInput');
      if (queryInput && queryInput.value.trim() !== '') {
        sendEvent({ event_type: 'search', search_query: queryInput.value.trim() });
      }
    });
  }
  
  updateWishlistCount();
  updateCartCount();
  
  const wishlistButton = document.getElementById('wishlistButton');
  if(wishlistButton) wishlistButton.addEventListener('click', openWishlist);
  
  const cartButton = document.getElementById('cartButton');
  if(cartButton) cartButton.addEventListener('click', openCart);
}
