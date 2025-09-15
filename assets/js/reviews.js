// assets/js/reviews.js
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("review-form");
    const list = document.getElementById("review-list");
    const product_id = form.dataset.productId;

    function loadReviews() {
        fetch(`ajax/fetch-reviews.php?product_id=${product_id}`)
            .then(res => res.json())
            .then(data => {
                list.innerHTML = data.map(r => `
          <div class="border-b py-3">
            <p class="font-semibold">${r.name}</p>
            <p class="text-yellow-500">${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}</p>
            <p>${r.comment}</p>
            <small class="text-gray-400">${new Date(r.created_at).toLocaleString()}</small>
          </div>`).join('');
            });
    }

    form.addEventListener("submit", e => {
        e.preventDefault();
        const formData = new FormData(form);
        fetch("ajax/submit-review.php", {
            method: "POST",
            body: new URLSearchParams(formData)
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    form.reset();
                    loadReviews();
                } else {
                    alert(data.error || "Failed to submit review.");
                }
            });
    });

    loadReviews();
});
