<?php
/**
 * Theme Customizer — Load All Presets
 * 
 * GET /api/load_presets.php
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$dataFile = __DIR__ . '/../data/presets.json';

if (!file_exists($dataFile)) {
    echo json_encode([]);
    exit;
}

$presets = json_decode(file_get_contents($dataFile), true) ?: [];

echo json_encode($presets);
