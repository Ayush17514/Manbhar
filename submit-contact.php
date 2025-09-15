<?php
session_start();

// Sanitize inputs
$name = trim($_POST['name'] ?? '');
$email = trim($_POST['email'] ?? '');
$message = trim($_POST['message'] ?? '');

// Validate inputs
if ($name && filter_var($email, FILTER_VALIDATE_EMAIL) && $message) {

    // Email settings
    $to = "manbharcadjewellery22@gmail.com";  // 📧 Replace with your actual receiving email
    $subject = "New Contact Message from $name";
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    // Email body
    $body = "You have received a new message from your website:\n\n";
    $body .= "Name: $name\n";
    $body .= "Email: $email\n\n";
    $body .= "Message:\n$message\n";

    // Send mail
    if (mail($to, $subject, $body, $headers)) {
        $_SESSION['contact_success'] = "✅ Your message has been sent successfully!";
    } else {
        $_SESSION['contact_error'] = "❌ Failed to send your message. Please try again later.";
    }
} else {
    $_SESSION['contact_error'] = "❗ Please fill in all fields correctly.";
}

// Redirect back
header('Location: contact.php');
exit;
