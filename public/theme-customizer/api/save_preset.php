<?php
/**
 * Theme Customizer — Save a New Preset
 * 
 * POST /api/save_preset.php
 * Body: { "name": "...", "config": { ... } }
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);

if (!$input || empty($input['name']) || empty($input['config'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Name and config are required']);
    exit;
}

$dataFile = __DIR__ . '/../data/presets.json';
$dataDir = dirname($dataFile);

if (!is_dir($dataDir)) {
    mkdir($dataDir, 0755, true);
}

$presets = [];
if (file_exists($dataFile)) {
    $presets = json_decode(file_get_contents($dataFile), true) ?: [];
}

$newPreset = [
    'id' => uniqid(),
    'name' => htmlspecialchars($input['name']),
    'config' => $input['config'],
    'createdAt' => date('Y-m-d H:i:s')
];

$presets[] = $newPreset;

file_put_contents($dataFile, json_encode($presets, JSON_PRETTY_PRINT));

echo json_encode($newPreset);
