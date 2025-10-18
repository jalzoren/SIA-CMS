<?php
header('Content-Type: application/json');
require_once 'supabase_config.php';

$email = $_POST['email'] ?? '';
$code = $_POST['code'] ?? '';

if (!$email || !$code) {
    echo json_encode(['success' => false, 'message' => 'Missing email or code']);
    exit;
}

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
    echo json_encode(['success' => false, 'message' => 'Invalid or expired code']);
} else {
    echo json_encode(['success' => true, 'message' => 'Code verified']);
}
?>
