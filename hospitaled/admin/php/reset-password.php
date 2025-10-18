<?php
header('Content-Type: application/json');
require_once 'supabase_config.php';

$email = $_POST['email'] ?? '';
$code = $_POST['code'] ?? '';
$newPassword = $_POST['new_password'] ?? '';

if (!$email || !$code || !$newPassword) {
    echo json_encode(['success' => false, 'message' => 'All fields are required']);
    exit;
}

// Verify code and expiry
$ch = curl_init("$supabase_url?email=eq.$email&reset_code=eq.$code&code_expiry=gt." . date('c'));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "apikey: $supabase_key",
    "Authorization: Bearer $supabase_key",
    "Content-Type: application/json"
]);
$response = curl_exec($ch);
curl_close($ch);

$user = json_decode($response, true);
if (empty($user)) {
    echo json_encode(['success' => false, 'message' => 'Invalid code or expired']);
    exit;
}

// Hash new password
$hashedPassword = password_hash($newPassword, PASSWORD_BCRYPT);

// Update password and clear reset code
$ch = curl_init("$supabase_url?email=eq.$email");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "PATCH");
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode([
    'password' => $hashedPassword,
    'reset_code' => null,
    'code_expiry' => null
]));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "apikey: $supabase_key",
    "Authorization: Bearer $supabase_key",
    "Content-Type: application/json",
    "Prefer: return=representation"
]);
curl_exec($ch);
curl_close($ch);

echo json_encode(['success' => true, 'message' => 'Password reset successfully']);
