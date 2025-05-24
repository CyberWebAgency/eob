<?php
require_once 'config.php';

// Get all news articles
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    try {
        $limit = intval(getParam('limit', 10));
        $page = intval(getParam('page', 1));
        $offset = ($page - 1) * $limit;
        
        // MySQLi doesn't support named parameters, so we use positional parameters
        $sql = "SELECT * FROM news WHERE status = 'active' ORDER BY date DESC LIMIT ?, ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ii", $offset, $limit);
        $stmt->execute();
        $result = $stmt->get_result();
        
        if ($result->num_rows > 0) {
            $news = [];
            while ($row = $result->fetch_assoc()) {
                $news[] = $row;
            }
            sendResponse(200, "News retrieved successfully", $news);
        } else {
            sendResponse(200, "No news found", []);
        }
    } catch (Exception $e) {
        sendResponse(500, "Database error: " . $e->getMessage());
    }
} else {
    sendResponse(405, "Method not allowed");
}
?> 