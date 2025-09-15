/*document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("productGrid");
  let offset = 0;
  const limit = 9;

  function loadProducts() {
    fetch(`/api/get-products.php?limit=${limit}&offset=${offset}`)
      .then(res => res.json())
      .then(products => {
        products.forEach(p => {
          grid.innerHTML += `
            <div class="border rounded shadow p-4">
              <img src="${p.image}" class="w-full h-64 object-cover mb-2" />
              <h3 class="font-bold">${p.title}</h3>
              <p class="text-sm text-gray-600">${p.description}</p>
              <div class="mt-2 flex justify-between items-center">
                <span class="text-pink-600 font-semibold">₹${p.price}</span>
                <button class="bg-pink-600 text-white px-3 py-1 rounded">Add</button>
              </div>
            </div>`;
        });
        offset += limit;
      });
  }

  // Load initially and on scroll
  loadProducts();
  window.addEventListener('scroll', () => {
    if (window.scrollY + window.innerHeight >= document.body.offsetHeight - 100) {
      loadProducts();
    }
  });
});
