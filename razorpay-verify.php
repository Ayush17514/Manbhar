<?php
session_start();
require 'includes/db.php';
require 'config/razorpay.php';
require 'vendor/autoload.php';

use Razorpay\Api\Api;
use Razorpay\Api\Errors\SignatureVerificationError;

$success = true;
$error = "Payment Failed";

if (empty($_GET['payment_id']) === false)
{
    $api = new Api(RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET);

    try
    {
        // Please note that the razorpay order ID must
        // come from a trusted source (session here, but
        // could be database or something else)
        $attributes = array(
            'razorpay_order_id' => $_GET['order_id'],
            'razorpay_payment_id' => $_GET['payment_id'],
            'razorpay_signature' => $_GET['signature']
        );

        $api->utility->verifyPaymentSignature($attributes);
    }
    catch(SignatureVerificationError $e)
    {
        $success = false;
        $error = 'Razorpay Error : ' . $e->getMessage();
    }
}

if ($success === true)
{
    $order_id = $_GET['order_id'];
    $payment_id = $_GET['payment_id'];

    $stmt = $conn->prepare("UPDATE orders SET payment_status = 'Paid', razorpay_payment_id = ? WHERE id = ?");
    $stmt->bind_param("si", $payment_id, $order_id);
    $stmt->execute();

    header("Location: checkout-success.php");
    exit();
}
else
{
    $html = "<p>Your payment failed</p>
             <p>{$error}</p>";
}

echo $html;

