<?php
require_once 'config.php';

// Get all team members
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    try {
        $memberType = getParam('type', null);
        
        if ($memberType) {
            $sql = "SELECT * FROM team_members WHERE status = 'active' AND member_type = ?";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("s", $memberType);
        } else {
            $sql = "SELECT * FROM team_members WHERE status = 'active' ORDER BY order_number ASC";
            $stmt = $conn->prepare($sql);
        }
        
        $stmt->execute();
        $result = $stmt->get_result();
        
        if ($result->num_rows > 0) {
            $team = [];
            while ($row = $result->fetch_assoc()) {
                $team[] = $row;
            }
            sendResponse(200, "Team members retrieved successfully", $team);
        } else {
            sendResponse(200, "No team members found", []);
        }
    } catch (Exception $e) {
        sendResponse(500, "Database error: " . $e->getMessage());
    }
} else {
    sendResponse(405, "Method not allowed");
}
?> 