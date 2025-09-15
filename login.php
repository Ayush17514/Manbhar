<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);
session_start();
require_once "includes/db.php";

// Handle Login
if ($_SERVER["REQUEST_METHOD"] === "POST" && $_POST["action"] === "login") {
    $email = trim($_POST["email"]);
    $password = trim($_POST["password"]);

    $stmt = $conn->prepare("SELECT id, name, email, password, usertype FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $res = $stmt->get_result();
    if ($res->num_rows > 0) {
        $user = $res->fetch_assoc();
        if (password_verify($password, $user["password"])) {
            $_SESSION["user_id"] = $user["id"];
            $_SESSION["user_type"] = $user["usertype"];
            $_SESSION["user_name"] = $user["name"];
            $_SESSION["user_email"] = $user["email"];
            header("Location: /index");
            exit();
        } else {
            $error = "Invalid password.";
        }
    } else {
        $error = "No account found.";
    }
    $stmt->close();
}

// Handle Signup
if ($_SERVER["REQUEST_METHOD"] === "POST" && $_POST["action"] === "signup") {
    $name = trim($_POST["name"]);
    $email = trim($_POST["email"]);
    $password = password_hash(trim($_POST["password"]), PASSWORD_DEFAULT);
    $usertype = "customer";

    $checkStmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
    $checkStmt->bind_param("s", $email);
    $checkStmt->execute();
    $result = $checkStmt->get_result();
    if ($result->num_rows > 0) {
        $error = "Email already in use.";
    } else {
        $stmt = $conn->prepare("INSERT INTO users (name, email, password, usertype) VALUES (?, ?, ?, ?)");
        $stmt->bind_param("ssss", $name, $email, $password, $usertype);
        if ($stmt->execute()) {
            $_SESSION["user_id"] = $stmt->insert_id;
            $_SESSION["user_type"] = $usertype;
            $_SESSION["user_name"] = $name;
            $_SESSION["user_email"] = $email;
            header("Location: /index");
            exit();
        } else {
            $error = "Signup failed.";
        }
        $stmt->close();
    }
    $checkStmt->close();
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Login | Manbhar</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://accounts.google.com/gsi/client" async defer></script>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Poppins', sans-serif; }
    .transition-slide { transition: transform 0.7s ease-in-out; }
  </style>
</head>
<body class="flex items-center justify-center min-h-screen bg-gray-100 px-4">
  <div class="relative w-full max-w-5xl h-[650px] bg-white rounded-2xl shadow-2xl overflow-hidden">
    <!-- Sliding Container -->
    <div id="slider" class="w-[200%] flex h-full transition-slide translate-x-0">

      <!-- Login Panel -->
      <div class="w-1/2 flex">
        <div class="hidden md:block md:w-1/2">
          <img src="uploads/carousel/1000276121.jpg" alt="login" class="w-full h-full object-cover"/>
        </div>
        <div class="w-full md:w-1/2 p-10 flex flex-col justify-center">
          <h2 class="text-3xl font-semibold text-center mb-6">Welcome Back</h2>
          <form method="POST" class="space-y-4">
            <input type="hidden" name="action" value="login">
            <input type="email" name="email" placeholder="Email" required class="w-full px-4 py-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-[#8a5a3b] outline-none">
            <input type="password" name="password" placeholder="Password" required class="w-full px-4 py-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-[#8a5a3b] outline-none">
            <button type="submit" class="w-full py-3 bg-[#8a5a3b] hover:bg-[#623e28] text-white rounded-lg font-medium">Login</button>
          </form>
          <div class="flex justify-between items-center text-sm mt-3">
            <button class="text-gray-600 hover:text-[#8a5a3b]">Forgot password?</button>
            <p>New here? <button onclick="toggleForm()" class="text-[#62260d] font-semibold">Sign Up</button></p>
          </div>
          <!-- Google Sign-In -->
          <div class="mt-6 text-center">
            <div id="g_id_onload"
                data-client_id="YOUR_GOOGLE_CLIENT_ID"
                data-context="signin"
                data-ux_mode="popup"
                data-callback="handleCredentialResponse"
                data-auto_prompt="false"></div>
            <div class="g_id_signin"
                data-type="standard"
                data-size="large"
                data-theme="outline"
                data-text="sign_in_with"
                data-shape="rectangular"
                data-logo_alignment="left"></div>
          </div>
        </div>
      </div>

      <!-- Signup Panel -->
      <div class="w-1/2 flex">
        <div class="w-full md:w-1/2 p-10 flex flex-col justify-center order-2 md:order-1">
          <h2 class="text-3xl font-semibold text-center mb-6">Create Account</h2>
          <form method="POST" class="space-y-4">
            <input type="hidden" name="action" value="signup">
            <input type="text" name="name" placeholder="Full Name" required class="w-full px-4 py-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-[#8a5a3b] outline-none">
            <input type="email" name="email" placeholder="Email" required class="w-full px-4 py-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-[#8a5a3b] outline-none">
            <input type="password" name="password" placeholder="Password" required class="w-full px-4 py-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-[#8a5a3b] outline-none">
            <button type="submit" class="w-full py-3 bg-[#8a5a3b] hover:bg-[#623e28] text-white rounded-lg font-medium">Sign Up</button>
          </form>
          <p class="text-sm text-center mt-4">Already have an account? <button onclick="toggleForm()" class="text-[#62260d] font-semibold">Sign In</button></p>
          <!-- Google Sign-In -->
          <div class="mt-6 text-center">
            <div id="g_id_onload"
                data-client_id="YOUR_GOOGLE_CLIENT_ID"
                data-context="signin"
                data-ux_mode="popup"
                data-callback="handleCredentialResponse"
                data-auto_prompt="false"></div>
            <div class="g_id_signin"
                data-type="standard"
                data-size="large"
                data-theme="outline"
                data-text="sign_in_with"
                data-shape="rectangular"
                data-logo_alignment="left"></div>
          </div>
        </div>
        <div class="hidden md:block md:w-1/2 order-1 md:order-2">
          <img src="uploads/carousel/1000276121.jpg" alt="signup" class="w-full h-full object-cover"/>
        </div>
      </div>
    </div>
  </div>

  <script>
    function toggleForm() {
      const slider = document.getElementById('slider');
      if (slider.classList.contains('translate-x-0')) {
        slider.classList.remove('translate-x-0');
        slider.classList.add('-translate-x-1/2');
      } else {
        slider.classList.remove('-translate-x-1/2');
        slider.classList.add('translate-x-0');
      }
    }
    function handleCredentialResponse(response) {
      console.log("Google token:", response.credential);
    }
  </script>
</body>
</html>
