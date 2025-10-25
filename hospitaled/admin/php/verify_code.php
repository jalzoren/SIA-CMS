<?php
header('Content-Type: application/json');
require_once 'supabase_config.php'; // contains $supabase_url and $supabase_key

$email = $_POST['email'] ?? '';
$code = $_POST['code'] ?? '';

if (!$email || !$code) {
    echo json_encode(['success' => false, 'message' => 'Missing email or code']);
    exit;
}

// --- Step 1: Fetch the user record from Supabase by email ---
$ch = curl_init("$supabase_url?email=eq.$email&select=reset_code,code_expiry");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "apikey: $supabase_key",
    "Authorization: Bearer $supabase_key",
    "Content-Type: application/json"
]);
$response = curl_exec($ch);
curl_close($ch);

$data = json_decode($response, true);

// --- Step 2: Check if user exists ---
if (empty($data)) {
    echo json_encode(['success' => false, 'message' => 'No account found for this email.']);
    exit;
}

// --- Step 3: Extract the reset code and expiry ---
$stored_code = $data[0]['reset_code'] ?? '';
$expiry = $data[0]['code_expiry'] ?? '';

if (empty($stored_code) || empty($expiry)) {
    echo json_encode(['success' => false, 'message' => 'No reset code found.']);
    exit;
}

// --- Step 4: Compare codes and expiry ---
$current_time = new DateTime();
$expiry_time = new DateTime($expiry);

if ($code !== $stored_code) {
    echo json_encode(['success' => false, 'message' => 'Incorrect code.']);
    exit;
}

if ($current_time > $expiry_time) {
    echo json_encode(['success' => false, 'message' => 'Code has expired.']);
    exit;
}

// --- Step 5: Success ---
echo json_encode(['success' => true, 'message' => 'Code verified successfully.']);
?>
