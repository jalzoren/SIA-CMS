<?php
header('Content-Type: application/json');
require_once 'supabase_config.php';

$email = $_POST['email'] ?? '';
$password = $_POST['password'] ?? '';

if (!$email || !$password) {
    echo json_encode(['success' => false, 'message' => 'All fields are required']);
    exit;
}

// Fetch user by email
$ch = curl_init("$supabase_url?email=eq.$email");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "apikey: $supabase_key",
    "Authorization: Bearer $supabase_key",
    "Content-Type: application/json",
]);
$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

$userData = json_decode($response, true);

// Check if user exists
if ($httpCode !== 200 || empty($userData)) {
    echo json_encode(['success' => false, 'message' => 'Email not found']);
    exit;
}

// Verify password
$user = $userData[0];
if (!password_verify($password, $user['password'])) {
    echo json_encode(['success' => false, 'message' => 'Incorrect password']);
    exit;
}

// Success
echo json_encode(['success' => true, 'message' => 'Login successful']);
?>
