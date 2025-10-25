<?php
header('Content-Type: application/json');
require_once 'supabase_config.php'; // contains $supabase_url and $supabase_key

// Read incoming JSON data
$input = json_decode(file_get_contents('php://input'), true);
if (!$input) {
    echo json_encode(['success' => false, 'message' => 'Invalid request data']);
    exit;
}

$short_title = $input['short_title'] ?? '';
$full_title = $input['full_title'] ?? '';
$topic_tags = $input['topic_tags'] ?? '';
$description = $input['description'] ?? '';
$status = $input['status'] ?? 'draft';

if (empty($short_title) || empty($full_title)) {
    echo json_encode(['success' => false, 'message' => 'Short and Full title are required']);
    exit;
}

// Prepare data for Supabase
$data = [
    'short_title' => $short_title,
    'full_title' => $full_title,
    'topic_tags' => $topic_tags,
    'description' => $description,
    'status' => $status,
    'created_at' => date('c'),
    'updated_at' => date('c')
];

// Send POST request to Supabase REST API
$url = "$supabase_url/rest/v1/news"; // replace "news" with your table name if different
$options = [
    'http' => [
        'method'  => 'POST',
        'header'  => "Content-Type: application/json\r\n" .
                     "apikey: $supabase_key\r\n" .
                     "Authorization: Bearer $supabase_key\r\n" .
                     "Prefer: return=representation",
        'content' => json_encode($data)
    ]
];

$context  = stream_context_create($options);
$response = file_get_contents($url, false, $context);

if ($response === FALSE) {
    echo json_encode(['success' => false, 'message' => 'Error connecting to Supabase']);
    exit;
}

echo json_encode(['success' => true, 'message' => 'News saved successfully']);
?>
