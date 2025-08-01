<?php
require_once 'config.php';

// Get all technology
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    try {
        $sql = "SELECT * FROM technologies WHERE status = 'active' ORDER BY order_number ASC";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $result = $stmt->get_result();
        
        if ($result->num_rows > 0) {
            $technology = [];
            while ($row = $result->fetch_assoc()) {
                $technology[] = $row;
            }
            sendResponse(200, "Technology retrieved successfully", $technology);
        } else {
            sendResponse(200, "No technology found", []);
        }
    } catch (Exception $e) {
        sendResponse(500, "Database error: " . $e->getMessage());
    }
} else {
    sendResponse(405, "Method not allowed");
}
?> 