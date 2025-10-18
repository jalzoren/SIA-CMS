<?php
header('Content-Type: application/json');

// Supabase API credentials
$supabase_url = "https://lqqubgnpntfcyytexdvl.supabase.co/rest/v1/users";
$supabase_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxxcXViZ25wbnRmY3l5dGV4ZHZsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDcyOTE1MywiZXhwIjoyMDc2MzA1MTUzfQ.Vb7yjc-FvvbKW-Y4gFCmhNtCqw1PBCA2xS0CKtJZuG0"; // use SERVICE key for server side

$name = $_POST['name'] ?? '';
$email = $_POST['email'] ?? '';
$password = $_POST['password'] ?? '';

if (!$name || !$email || !$password) {
    echo json_encode(['success' => false, 'message' => 'All fields are required']);
    exit;
}

// Hash the password
$hashedPassword = password_hash($password, PASSWORD_BCRYPT);

// Prepare Supabase insert
$data = [
    'full_name' => $name,
    'email' => $email,
    'password' => $hashedPassword
];

$ch = curl_init("$supabase_url/rest/v1/users");
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
