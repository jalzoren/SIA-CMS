<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');

require_once '../../admin/php/supabase_config.php';

try {
    // Fetch published news articles from Supabase, ordered by creation date (newest first)
    $url = "$supabase_url/rest/v1/news?status=eq.published&order=created_at.desc";
    
    $options = [
        'http' => [
            'method'  => 'GET',
            'header'  => "Content-Type: application/json\r\n" .
                         "apikey: $supabase_key\r\n" .
                         "Authorization: Bearer $supabase_key\r\n"
        ]
    ];
    
    $context = stream_context_create($options);
    $response = file_get_contents($url, false, $context);
    
    if ($response === FALSE) {
        throw new Exception('Error connecting to Supabase');
    }
    
    $news_articles = json_decode($response, true);
    
    if (json_last_error() !== JSON_ERROR_NONE) {
        throw new Exception('Error parsing response from Supabase');
    }
    
    // Return the news articles
    echo json_encode([
        'success' => true,
        'data' => $news_articles,
        'count' => count($news_articles)
    ]);
    
} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
}
?>
