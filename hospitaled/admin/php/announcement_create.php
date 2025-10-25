<?php
header('Content-Type: application/json');
require_once 'supabase_config.php'; // your file with $supabase_url and $supabase_key

// Collect POST data
$shortTitle = $_POST['short_title'] ?? '';
$fullTitle = $_POST['full_title'] ?? '';
$topicTags = $_POST['topic_tags'] ?? '';
$description = $_POST['description'] ?? '';
$status = $_POST['status'] ?? 'draft'; // default to draft
$scheduledAt = $_POST['scheduled_at'] ?? null;

// Validate inputs
if (!$shortTitle || !$fullTitle) {
    echo json_encode(['success' => false, 'message' => 'Short title and full title are required']);
    exit;
}

// Data payload
$data = [[
    'short_title' => $shortTitle,
    'full_title' => $fullTitle,
    'topic_tags' => $topicTags,
    'description' => $description,
    'status' => $status,
    'scheduled_at' => $scheduledAt
]];

// Supabase REST endpoint for the table
$apiUrl = $supabase_url . '/rest/v1/announcements';

$ch = curl_init($apiUrl);
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

$responseData = json_decode($response, true);

if ($httpCode === 201) {
    echo json_encode([
        'success' => true,
        'message' => 'Announcement created successfully',
        'data' => $responseData
    ]);
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Failed to create announcement',
        'httpCode' => $httpCode,
        'response' => $responseData,
        'curlError' => $curlError
    ]);
}
?>
