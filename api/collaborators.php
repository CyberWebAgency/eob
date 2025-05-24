<?php
require_once 'config.php';

// Get all collaborators
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    try {
        $sql = "SELECT * FROM collaborators WHERE status = 'active' ORDER BY order_number ASC";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $result = $stmt->get_result();
        
        if ($result->num_rows > 0) {
            $collaborators = [];
            while ($row = $result->fetch_assoc()) {
                $collaborators[] = $row;
            }
            sendResponse(200, "Collaborators retrieved successfully", $collaborators);
        } else {
            sendResponse(200, "No collaborators found", []);
        }
    } catch (Exception $e) {
        sendResponse(500, "Database error: " . $e->getMessage());
    }
} else {
    sendResponse(405, "Method not allowed");
}
?> 