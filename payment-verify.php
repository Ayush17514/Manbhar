<?php
session_start();
require 'includes/db.php';
require 'vendor/autoload.php';

use Square\SquareClient;
use Square\Environments;
use Square\Exceptions\ApiException;
use Square\Models\CreatePaymentRequest;
use Square\Models\Money;

// 1. Prepare Square client using environment credentials
$square = new SquareClient([
    'accessToken' => getenv('SQUARE_ACCESS_TOKEN'), // Sandbox or Production
    'environment' => Environments::Sandbox
]);

$order_number = $_POST['order_number'] ?? $_GET['order_number'] ?? null;
if (!$order_number) {
    $_SESSION['checkout_message'] = ['type'=>'error','text'=>'Invalid payment verification.'];
    header('Location: checkout_success.php');
    exit;
}

// 2. Fetch order to confirm its pending state
$stmt = $conn->prepare("SELECT grand_total, payment_status FROM orders WHERE order_number=? LIMIT 1");
$stmt->bind_param("s", $order_number);
$stmt->execute();
$order = $stmt->get_result()->fetch_assoc();
if (!$order) {
    $_SESSION['checkout_message'] = ['type'=>'error','text'=>'Order not found.'];
    header('Location: checkout_success.php');
    exit;
}

// 3. Only process if payment is still "Initiated"
if ($order['payment_status'] !== 'Initiated') {
    $_SESSION['checkout_message'] = ['type'=>'info','text'=>'Payment already processed.'];
    header('Location: checkout_success.php?order_number=' . urlencode($order_number));
    exit;
}

// Convert total to cents/paise (lowest currency unit)
$amountMoney = new Money();
$amountMoney->setAmount((int)round($order['grand_total'] * 100));
$amountMoney->setCurrency('INR');

// 4. Attempt to complete the payment via Square
$paymentsApi = $square->getPaymentsApi();
$paymentRequest = new CreatePaymentRequest(
    /* sourceId */ 'EXTERNAL', // Ideally a nonce or payment token
    /* idempotencyKey */ uniqid($order_number . '_'),
    $amountMoney
);

try {
    $response = $paymentsApi->createPayment($paymentRequest);
} catch (ApiException $e) {
    $_SESSION['checkout_message'] = ['type'=>'error','text'=>'Square API error: ' . $e->getMessage()];
    header('Location: checkout_success.php?order_number=' . urlencode($order_number));
    exit;
}

if ($response->isSuccess()) {
    // Payment succeeded
    $stmt = $conn->prepare("UPDATE orders SET payment_status='Paid' WHERE order_number=?");
    $stmt->bind_param("s", $order_number);
    $stmt->execute();

    $_SESSION['checkout_message'] = [
        'type' => 'success',
        'text' => 'Payment confirmed successfully for order ' . htmlspecialchars($order_number)
    ];
} else {
    // Payment failed
    $errors = $response->getErrors();
    $msg = 'Payment failed: ' . ($errors[0]->getDetail() ?? 'Unknown error');
    $stmt = $conn->prepare("UPDATE orders SET payment_status='Failed' WHERE order_number=?");
    $stmt->bind_param("s", $order_number);
    $stmt->execute();

    $_SESSION['checkout_message'] = ['type'=>'error','text'=> $msg];
}

// Final redirect to show result
header('Location: checkout_success.php?order_number=' . urlencode($order_number));
exit;
