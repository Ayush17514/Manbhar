<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);
session_start();
require_once "includes/db.php";

// Handle Login
if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_POST["action"]) && $_POST["action"] === "login") {
    $email = trim($_POST["email"] ?? '');
    $password = trim($_POST["password"] ?? '');

    // Allow Admin credentials test@manbhar or registered users
    if (($email === "Admin" || $email === "admin" || $email === "admin@manbhar.com" || $email === "manbharcadjewellery22@gmail.com") && $password === "test@manbhar") {
        $_SESSION["user_id"] = 1;
        $_SESSION["user_type"] = "admin";
        $_SESSION["user_name"] = "Admin";
        $_SESSION["user_email"] = "admin@manbhar.com";
        header("Location: admin");
        exit();
    }

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
            header("Location: index");
            exit();
        } else {
            $error = "Invalid password. Please try again.";
        }
    } else {
        $error = "No account found with this email.";
    }
    $stmt->close();
}

// Handle Signup (Account type is strictly customer)
if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_POST["action"]) && $_POST["action"] === "signup") {
    $name = trim($_POST["name"] ?? '');
    $email = trim($_POST["email"] ?? '');
    $phone = trim($_POST["phone"] ?? '');
    $password = password_hash(trim($_POST["password"] ?? ''), PASSWORD_DEFAULT);
    $usertype = "customer"; // Account type is customer only

    if (empty($name) || empty($email) || empty($phone) || strlen($phone) < 10) {
        $error = "Full Name, valid Email, and 10-digit Phone Number are required.";
    } else {
        $checkStmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
        $checkStmt->bind_param("s", $email);
        $checkStmt->execute();
        $result = $checkStmt->get_result();
        if ($result->num_rows > 0) {
            $error = "Email is already registered. Please sign in.";
        } else {
            $stmt = $conn->prepare("INSERT INTO users (name, email, password, usertype) VALUES (?, ?, ?, ?)");
            $stmt->bind_param("ssss", $name, $email, $password, $usertype);
            if ($stmt->execute()) {
                $_SESSION["user_id"] = $stmt->insert_id;
                $_SESSION["user_type"] = $usertype;
                $_SESSION["user_name"] = $name;
                $_SESSION["user_email"] = $email;
                header("Location: index");
                exit();
            } else {
                $error = "Registration failed. Please try again.";
            }
            $stmt->close();
        }
        $checkStmt->close();
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Account Access | Manbhar Fine Jewelry</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Plus Jakarta Sans', sans-serif; }
    .font-serif { font-family: 'Cinzel', serif; }
    .transition-slide { transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1); }
  </style>
</head>
<body class="flex items-center justify-center min-h-screen bg-gray-50 px-4 py-8">
  <div class="relative w-full max-w-md bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
    
    <!-- Top Bar -->
    <div class="bg-[#273639] text-white p-6 relative">
      <div class="flex items-center justify-between">
        <div>
          <h2 id="header-title" class="text-2xl font-serif font-bold text-white">Welcome Back</h2>
          <p id="header-subtitle" class="text-xs text-gray-300 mt-1">Please enter your details to sign in.</p>
        </div>
        <a href="index" class="text-xs font-semibold text-white/80 hover:text-white bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full transition">
          Close
        </a>
      </div>
    </div>

    <!-- Error Alert -->
    <?php if (isset($error) && !empty($error)): ?>
      <div class="mx-6 mt-4 p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center gap-2">
        <span class="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0"></span>
        <span><?= htmlspecialchars($error) ?></span>
      </div>
    <?php endif; ?>

    <!-- Main Container -->
    <div class="p-6">
      <!-- Tabs Switcher -->
      <div class="grid grid-cols-2 rounded-xl bg-gray-100 p-1 mb-5">
        <button
          type="button"
          id="btn-tab-login"
          onclick="showLoginTab()"
          class="py-2 text-xs font-bold rounded-lg transition bg-white text-[#273639] shadow-xs"
        >
          Sign In
        </button>
        <button
          type="button"
          id="btn-tab-signup"
          onclick="showSignupTab()"
          class="py-2 text-xs font-bold rounded-lg transition text-gray-500 hover:text-gray-900"
        >
          Create Account
        </button>
      </div>

      <!-- Google Auth Button -->
      <a href="index" class="w-full py-2.5 px-4 bg-white hover:bg-gray-50 border border-gray-300 rounded-xl font-semibold text-xs sm:text-sm text-gray-700 shadow-xs flex items-center justify-center gap-3 transition mb-4">
        <svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17Z"/>
          <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.15C3.29 21.41 7.37 24 12 24Z"/>
          <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.26C.46 8.17 0 9.99 0 12s.46 3.83 1.26 5.42l4.02-3.15Z"/>
          <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.37 0 3.29 2.59 1.26 6.58l4.02 3.15c.95-2.83 3.6-4.98 6.72-4.98Z"/>
        </svg>
        <span>Continue with Google</span>
      </a>

      <!-- Divider -->
      <div class="relative flex items-center justify-center mb-4">
        <div class="border-t border-gray-200 w-full"></div>
        <span class="bg-white px-3 text-[10px] font-bold uppercase tracking-wider text-gray-400 shrink-0">OR</span>
        <div class="border-t border-gray-200 w-full"></div>
      </div>

      <!-- Login Form -->
      <div id="login-form-container">
        <form method="POST" class="space-y-3.5">
          <input type="hidden" name="action" value="login">
          <div>
            <label class="block text-xs font-semibold text-gray-700 mb-1">Email Address <span class="text-rose-500">*</span></label>
            <input type="text" name="email" placeholder="you@example.com" required class="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#273639] outline-none">
          </div>

          <div>
            <div class="flex items-center justify-between mb-1">
              <label class="block text-xs font-semibold text-gray-700">Password <span class="text-rose-500">*</span></label>
            </div>
            <input type="password" name="password" placeholder="••••••••" required class="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#273639] outline-none">
          </div>

          <button type="submit" class="w-full py-3 bg-[#273639] hover:bg-[#3C4A4C] text-white font-bold rounded-xl text-sm transition shadow-md mt-2">
            Sign In
          </button>
        </form>
      </div>

      <!-- Signup Form -->
      <div id="signup-form-container" class="hidden">
        <form method="POST" class="space-y-3.5">
          <input type="hidden" name="action" value="signup">
          <div>
            <label class="block text-xs font-semibold text-gray-700 mb-1">Full Name <span class="text-rose-500">*</span></label>
            <input type="text" name="name" placeholder="Your full name" required class="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#273639] outline-none">
          </div>

          <div>
            <label class="block text-xs font-semibold text-gray-700 mb-1">Email Address <span class="text-rose-500">*</span></label>
            <input type="email" name="email" placeholder="you@example.com" required class="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#273639] outline-none">
          </div>

          <div>
            <label class="block text-xs font-semibold text-gray-700 mb-1">Phone Number <span class="text-rose-500">*</span></label>
            <div class="flex rounded-xl border border-gray-200 bg-gray-50 focus-within:bg-white focus-within:ring-2 focus-within:ring-[#273639] overflow-hidden">
              <span class="px-3 py-2.5 bg-gray-100 border-r border-gray-200 text-xs font-bold text-gray-700 select-none">🇮🇳 +91</span>
              <input type="tel" name="phone" placeholder="10-digit mobile" maxlength="10" required class="w-full px-3 py-2.5 text-sm bg-transparent outline-none">
            </div>
          </div>

          <div>
            <label class="block text-xs font-semibold text-gray-700 mb-1">Password <span class="text-rose-500">*</span></label>
            <input type="password" name="password" placeholder="••••••••" required class="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#273639] outline-none">
          </div>

          <button type="submit" class="w-full py-3 bg-[#273639] hover:bg-[#3C4A4C] text-white font-bold rounded-xl text-sm transition shadow-md mt-2">
            Create Account
          </button>
        </form>
      </div>

    </div>
  </div>

  <script>
    function showLoginTab() {
      document.getElementById('login-form-container').classList.remove('hidden');
      document.getElementById('signup-form-container').classList.add('hidden');
      
      document.getElementById('btn-tab-login').className = 'py-2 text-xs font-bold rounded-lg transition bg-white text-[#273639] shadow-xs';
      document.getElementById('btn-tab-signup').className = 'py-2 text-xs font-bold rounded-lg transition text-gray-500 hover:text-gray-900';

      document.getElementById('header-title').innerText = 'Welcome Back';
      document.getElementById('header-subtitle').innerText = 'Please enter your details to sign in.';
    }

    function showSignupTab() {
      document.getElementById('login-form-container').classList.add('hidden');
      document.getElementById('signup-form-container').classList.remove('hidden');
      
      document.getElementById('btn-tab-signup').className = 'py-2 text-xs font-bold rounded-lg transition bg-white text-[#273639] shadow-xs';
      document.getElementById('btn-tab-login').className = 'py-2 text-xs font-bold rounded-lg transition text-gray-500 hover:text-gray-900';

      document.getElementById('header-title').innerText = 'Create Account';
      document.getElementById('header-subtitle').innerText = 'Please enter your details to register.';
    }
  </script>
</body>
</html>
