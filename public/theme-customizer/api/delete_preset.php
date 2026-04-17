<?php
/**
 * Theme Customizer — Delete a Preset
 * 
 * DELETE /api/delete_preset.php?id=xxx
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'DELETE') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$id = $_GET['id'] ?? '';

if (empty($id)) {
    http_response_code(400);
    echo json_encode(['error' => 'ID is required']);
    exit;
}

$dataFile = __DIR__ . '/../data/presets.json';

if (!file_exists($dataFile)) {
    http_response_code(404);
    echo json_encode(['error' => 'No presets found']);
    exit;
}

$presets = json_decode(file_get_contents($dataFile), true) ?: [];

$presets = array_values(array_filter($presets, function ($p) use ($id) {
    return $p['id'] !== $id;
}));

file_put_contents($dataFile, json_encode($presets, JSON_PRETTY_PRINT));

echo json_encode(['success' => true]);
