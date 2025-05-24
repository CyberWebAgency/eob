<?php
// Enable CORS for API requests
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Database configuration
require_once "../config/database.php";

/**
 * Send JSON response
 * 
 * @param int $status HTTP status code
 * @param string $message Response message
 * @param array $data Response data
 */
function sendResponse($status, $message, $data = []) {
    http_response_code($status);
    echo json_encode([
        'status' => $status,
        'message' => $message,
        'data' => $data
    ]);
    exit;
}

/**
 * Filter and sanitize user input
 * 
 * @param string $data Data to sanitize
 * @return string Sanitized data
 */
function sanitizeInput($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

/**
 * Get query parameters with defaults
 * 
 * @param string $param Parameter name
 * @param mixed $default Default value
 * @return mixed Parameter value or default
 */
function getParam($param, $default = null) {
    return isset($_GET[$param]) ? sanitizeInput($_GET[$param]) : $default;
}
?> 