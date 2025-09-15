<?php
session_start();
require_once 'includes/db.php';
require_once 'includes/header.php';

if (!isset($_SESSION['user_id']) || $_SESSION['user_type'] !== 'admin') {
    header('Location: /index');
    exit;
}

if (isset($_GET['delete_product'])) {
    $pid = intval($_GET['delete_product']);
    $conn->query("DELETE FROM products WHERE id = $pid");
    header('Location: /admin-panel');
    exit;
}

$categories = [
  "Rings", "Necklaces", "Earrings", "Bracelets", "Pendants",
  "Anklets", "Gold Chains", "Bangles", "Mangalsutras", "Nose Pin",
  "Kada", "Cufflink", "Gold Idol", "Name Pendants", "Rakhi Jewellery",
  "Customised Jewellery", "Other"
];
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Admin Panel</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 py-12">
  <div class="max-w mx-auto px-4 py-20 sticky-offset">
    <div class="flex min-h-screen">
        <aside class="w-80 bg-gray-100 shadow-md py-6 px-4 space-y-4">
            <h2 class="text-xl font-bold text-pink-700 mb-6">Admin Panel</h2>
            <nav class="flex flex-col space-y-2 text-gray-700">
                <a href="/admin-panel" class="hover:text-pink-600">➕ Add Product</a>
                <a href="/manage-products" class="hover:text-pink-600">📦 Manage Products</a>
                <a href="/users" class="hover:text-pink-600">👥 View Users</a>
                <a href="/analytics" class="hover:text-pink-600">📈 Analytical</a>
                <a href="/logout" class="text-red-500 hover:underline mt-10">Logout</a>
            </nav>
        </aside>

    <!-- Main Content -->
    <main class="flex-1 p-8 max-w-5xl bg-white">
            <h1 class="text-3xl font-bold text-pink-700 mb-6">Add New Product</h1>

        <?php if (isset($_GET['success'])): ?>
          <div class="bg-green-100 text-green-800 px-4 py-2 mb-4 rounded">
            ✅ Product added successfully!
          </div>
        <?php endif; ?>

        <form action="/ajax/add-product.php" method="POST" enctype="multipart/form-data" class="space-y-4 bg-pink-50 p-6 rounded shadow">
          <input type="text" name="title" placeholder="Product Title" class="w-full border p-2 rounded" required />
          <textarea name="description" placeholder="Short Description" class="w-full border p-2 rounded" required></textarea>

          <input type="text" name="size" placeholder="Size (e.g. 7, Medium)" class="w-full border p-2 rounded" />
          <input type="text" name="dimensions" placeholder="Dimensions (e.g. 2x2 cm)" class="w-full border p-2 rounded" />

          <select name="material" class="w-full border p-2 rounded">
            <option value="">-- Select Material --</option>
            <option value="Gold">Gold</option>
            <option value="Diamond">Diamond</option>
            <option value="Silver">Silver</option>
            <option value="Brass">Brass</option>
          </select>

          <input type="text" name="stones" placeholder="Stones Used (e.g. Ruby, Emerald)" class="w-full border p-2 rounded" />
          <input type="number" step="0.01" name="gross_weight" placeholder="Gross Weight (grams)" class="w-full border p-2 rounded" />
          <input type="number" step="0.01" name="metal_weight" placeholder="Metal Weight (grams)" class="w-full border p-2 rounded" />
          <input type="number" step="0.01" name="stone_weight" placeholder="Stone Weight (grams)" class="w-full border p-2 rounded" />
          <input type="number" name="price" placeholder="Price" class="w-full border p-2 rounded" required step="0.01" />

          <label class="block font-medium">Category</label>
          <select name="category" class="w-full border p-2 rounded" id="category-select" onchange="handleCategoryChange(this)">
            <?php foreach ($categories as $cat): ?>
              <option value="<?= htmlspecialchars($cat) ?>"><?= htmlspecialchars($cat) ?></option>
            <?php endforeach; ?>
          </select>

          <div id="custom-category" class="hidden">
            <input type="text" name="new_category" placeholder="If Other, enter new category" class="w-full border p-2 rounded" />
          </div>

          <input type="text" name="tag" placeholder="Tag (e.g., New, Bestseller)" class="w-full border p-2 rounded" />

          <label class="block font-medium">Upload Images</label>
          <div id="imageInputs">
            <input type="file" name="images[]" accept="image/*" class="w-full border p-2 rounded mb-2" onchange="previewImages(event)" />
          </div>
          <button type="button" onclick="addImageInput()" class="text-sm text-blue-600 hover:underline">+ Add More Images</button>

          <div id="imagePreview" class="flex flex-wrap gap-4"></div>

          <label class="block font-medium">Upload Product Video (optional)</label>
          <input type="file" name="video" accept="video/*" class="w-full border p-2 rounded" />

          <textarea name="additional_info" placeholder="Additional Details" class="w-full border p-2 rounded"></textarea>

          <button type="submit" class="bg-pink-600 text-white px-6 py-2 rounded hover:bg-pink-700">Submit Product</button>
        </form>
      </main>
    </div>
  </div>

  <script>
    function addImageInput() {
      const imageInputs = document.getElementById('imageInputs');
      const input = document.createElement('input');
      input.type = 'file';
      input.name = 'images[]';
      input.accept = 'image/*';
      input.className = 'w-full border p-2 rounded mb-2';
      input.onchange = previewImages;
      imageInputs.appendChild(input);
    }

    function previewImages(event) {
      const previewContainer = document.getElementById('imagePreview');
      const input = event.target;

      Array.from(input.files).forEach(file => {
        const reader = new FileReader();
        reader.onload = e => {
          const img = document.createElement('img');
          img.src = e.target.result;
          img.className = 'preview-img rounded shadow';
          previewContainer.appendChild(img);
        };
        reader.readAsDataURL(file);
      });
    }

    function handleCategoryChange(select) {
      const customField = document.getElementById("custom-category");
      if (select.value === "Other") {
        customField.classList.remove("hidden");
      } else {
        customField.classList.add("hidden");
      }
    }
  </script>
</body>
</html>
