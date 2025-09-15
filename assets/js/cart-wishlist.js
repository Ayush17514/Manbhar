// cart-wishlist.js

document.querySelectorAll('.addToWishlist').forEach(button => {
    button.addEventListener('click', function () {
        const productId = this.dataset.productId;
        fetch('/ajax/add-to-wishlist.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ product_id: productId })
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    document.getElementById('wishlistCount').innerText = data.count;
                    document.getElementById('wishlistDrawer').classList.remove('translate-x-full');
                    document.getElementById('wishlistDrawerContent').innerHTML = data.drawer_html;
                } else {
                    alert('Error adding to wishlist');
                }
            });
    });
});

document.querySelectorAll('.addToCart').forEach(button => {
    button.addEventListener('click', function () {
        const productId = this.dataset.productId;
        fetch('/ajax/add-to-cart.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ product_id: productId })
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    document.getElementById('cartCount').innerText = data.count;
                    document.getElementById('cartDrawer').classList.remove('translate-x-full');
                    document.getElementById('cartDrawerContent').innerHTML = data.drawer_html;
                } else {
                    alert('Error adding to cart');
                }
            });
    });
});
