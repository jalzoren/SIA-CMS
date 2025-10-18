<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require '../../phpmailer/src/PHPMailer.php';
require '../../phpmailer/src/SMTP.php';
require '../../phpmailer/src/Exception.php';
require_once 'supabase_config.php';

header('Content-Type: application/json');

$email = $_POST['email'] ?? '';
if (!$email) {
    echo json_encode(['success' => false, 'message' => 'Email is required']);
    exit;
}

// STEP 1 — Check if email exists in Supabase
$ch = curl_init("$supabase_url?email=eq.$email");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "apikey: $supabase_key",
    "Authorization: Bearer $supabase_key"
]);
$response = curl_exec($ch);
curl_close($ch);

$userData = json_decode($response, true);

if (empty($userData)) {
    echo json_encode(['success' => false, 'message' => 'Email not found']);
    exit;
}

// STEP 2 — Check if a code already exists and hasn’t expired
$existing = $userData[0];
if (!empty($existing['code_expiry']) && strtotime($existing['code_expiry']) > time()) {
    echo json_encode(['success' => false, 'message' => 'A reset code was already sent. Please wait before requesting another.']);
    exit;
}

// STEP 3 — Generate a new reset code and expiry time
$code = rand(100000, 999999);
$expiry = date('c', strtotime('+60 seconds')); // Expires in 1 minute


// STEP 4 — Update Supabase record
$ch = curl_init("$supabase_url?email=eq.$email");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "PATCH");
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode([
    'reset_code' => $code,
    'code_expiry' => $expiry
]));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "apikey: $supabase_key",
    "Authorization: Bearer $supabase_key",
    "Content-Type: application/json",
    "Prefer: return=representation"
]);
$response = curl_exec($ch);
curl_close($ch);

// STEP 5 — Send email using PHPMailer
$mail = new PHPMailer(true);
try {
    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'plppasig2@gmail.com';
    $mail->Password   = 'bdtj hnji jdtk sbdw'; // App password, not your Gmail password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = 587;

    $mail->setFrom('plppasig2@gmail.com', 'Hospitaled');
    $mail->addAddress($email);

    $mail->isHTML(true);
    $mail->Subject = 'Hospitaled Password Reset Code';
    $mail->Body    = "
        <h3>Password Reset Request</h3>
        <p>Your verification code is:</p>
        <h2 style='color:#007bff;'>$code</h2>
        <p>This code will expire in 1 minute.</p>
        <br><p>If you didn’t request this, please ignore this message.</p>
    ";
    $mail->AltBody = "Your password reset code is: $code (expires in 15 minutes)";

    $mail->send();
    echo json_encode(['success' => true, 'message' => 'Reset code sent to your email']);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => "Mailer Error: {$mail->ErrorInfo}"]);
}
?>
