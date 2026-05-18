# Manbhar Jewellers - E-commerce Website

## Project Description
Manbhar Jewellers is a modern, full-featured e-commerce platform built with PHP and MySQL. It provides a seamless online shopping experience for customers and a comprehensive management system for administrators. The frontend is designed with Tailwind CSS for a responsive and elegant user interface, while the backend handles everything from user authentication to order processing and payment gateway integration.

---

## Key Features

### Customer-Facing
- **User Authentication:** Secure registration and login system for users.
- **Product Catalog:** Browse products by category, view detailed product pages, and search for specific items.
- **Shopping Cart & Wishlist:** Users can add products to a shopping cart for purchase or a wishlist for later.
- **OTP Verification:** Secure checkout process with One-Time Password (OTP) verification sent to the user's phone.
- **Secure Payments:** Integrated with the **Razorpay** payment gateway for secure online transactions.
- **Cash on Delivery (COD):** Option for users to pay upon delivery.
- **User Dashboard:** A personal dashboard for users to view their order history and track order status.
- **Order Details:** A dedicated page to view the complete details of a specific order, including items, shipping address, and payment status.

### Admin-Facing
- **Admin Panel:** A secure area for administrators to manage the e-commerce store.
- **Product Management:** Full CRUD (Create, Read, Update, Delete) functionality for products.
- **Order Management:** View and manage all customer orders.
- **User Management:** View all registered users on the platform.

---

## Technology Stack
- **Backend:** PHP
- **Database:** MySQL
- **Frontend:** HTML, Tailwind CSS, JavaScript
- **Payment Gateway:** Razorpay
- **Dependency Management:**
    - **Composer** (PHP): For managing backend packages like the Razorpay SDK.
    - **npm** (Node.js): For managing frontend development dependencies like Tailwind CSS.

---

## Installation Guide

Follow these steps to set up the project on your local machine.

### Prerequisites
- A local web server environment (e.g., XAMPP, WAMP, MAMP).
- PHP, MySQL, and Apache.
- Node.js and npm (for frontend development).
- Composer (for PHP dependencies).

### 1. Clone the Repository
```bash
git clone https://github.com/Ayush17514/Manbhar.git
cd Manbhar
```

### 2. Backend Setup
1.  **Start Services:** Ensure your Apache and MySQL services are running.
2.  **Create Database:** Create a new MySQL database named `jewelry_site`.
3.  **Import Schema:** Import the database structure and sample data using the `seed.sql` file.
    ```bash
    mysql -u root -p jewelry_site < seed.sql
    ```
4.  **Install PHP Dependencies:** Install the required PHP packages using Composer.
    ```bash
    composer install
    ```

### 3. Frontend Setup
1.  **Install Node Modules:** Install the necessary frontend dependencies.
    ```bash
    npm install
    ```
2.  **Build CSS:** Compile the Tailwind CSS files to generate the final `output.css`.
    ```bash
    npm run build:css
    ```
    *This command should be run whenever you make changes to `tailwind.config.js` or the class names in your `.php` or `.js` files.*

### 4. Configuration
1.  **Database Configuration:**
    - Create a new file: `config/db.php`.
    - Add the following code and update it with your MySQL database credentials.
      ```php
      <?php
      // Database configuration
      define('DB_SERVER', 'localhost');
      define('DB_USERNAME', 'root');
      define('DB_PASSWORD', '');
      define('DB_NAME', 'jewelry_site');

      // Create connection
      $conn = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);

      // Check connection
      if ($conn->connect_error) {
          die("Connection failed: " . $conn->connect_error);
      }
      ?>
      ```

2.  **Razorpay Configuration:**
    - Create a new file: `config/razorpay.php`.
    - Add the following code and replace the placeholders with your actual Razorpay Key ID and Key Secret.
      ```php
      <?php
      // Razorpay API configuration
      define('RAZORPAY_KEY_ID', 'YOUR_KEY_ID');
      define('RAZORPAY_KEY_SECRET', 'YOUR_KEY_SECRET');
      ?>
      ```

### 5. Running the Application
1.  Move the project folder (`Manbhar`) to your web server's root directory (e.g., `htdocs` in XAMPP).
2.  Open your web browser and navigate to: `http://localhost/Manbhar`

---

## Important Project Structure Points
- **`config/`:** This directory contains configuration files for the database and external APIs. It is excluded from Git to protect sensitive credentials.
- **`vendor/`:** Contains PHP dependencies installed by Composer. Excluded from Git.
- **`node_modules/`:** Contains frontend dependencies installed by npm. Excluded from Git.
- **`/assets/css/output.css`:** This is a generated file. The source is `/assets/css/input.css` and the Tailwind configuration.
