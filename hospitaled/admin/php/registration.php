
<?php
header('Content-Type: application/json');
require_once 'supabase_config.php';

$name = $_POST['name'] ?? '';
$email = $_POST['email'] ?? '';
$password = $_POST['password'] ?? '';

if (!$name || !$email || !$password) {
    echo json_encode(['success' => false, 'message' => 'All fields are required']);
    exit;
}

// Hash the password
$hashedPassword = password_hash($password, PASSWORD_BCRYPT);

// Prepare ok insert
$data = [
    'full_name' => $name,
    'email' => $email,
    'password' => $hashedPassword
];

$ch = curl_init($supabase_url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "apikey: $supabase_key",
    "Authorization: Bearer $supabase_key",
    "Content-Type: application/json",
    "Prefer: return=representation"
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlError = curl_error($ch);
curl_close($ch);

// Decode response (Supabase usually returns JSON with error details)
$responseData = json_decode($response, true);

// Handle success or failure
if ($httpCode === 201) {
    echo json_encode([
        'success' => true,
        'message' => 'Registration successful',
        'data' => $responseData
    ]);
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Registration failed',
        'httpCode' => $httpCode,
        'response' => $responseData,
        'curlError' => $curlError
    ]);
}


?>
