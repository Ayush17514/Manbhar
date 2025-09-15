<?php
session_start();
$lastPage = $_SESSION['last_page'] ?? "index.php";
$scrollPos = $_SESSION['scroll_position'] ?? 0;
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Order Success</title>
  <script>
    setTimeout(function(){
      window.location.href = "<?php echo $lastPage; ?>#scroll-<?php echo $scrollPos; ?>";
    }, 3000);
  </script>
</head>
<body class="bg-gray-50 flex items-center justify-center h-screen">
  <div class="bg-white shadow-lg rounded-lg p-8 text-center">
    <h2 class="text-2xl font-bold text-green-600">✅ Order Placed Successfully!</h2>
    <p class="mt-4 text-gray-600">Redirecting you back to where you were...</p>
  </div>
</body>
</html>
