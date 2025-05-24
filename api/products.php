<?php
require_once 'config.php';

// Get all products
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    try {
        $sql = "SELECT * FROM products WHERE status = 'active' ORDER BY order_number ASC";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $result = $stmt->get_result();
        
        if ($result->num_rows > 0) {
            $products = [];
            while ($row = $result->fetch_assoc()) {
                $products[] = $row;
            }
            sendResponse(200, "Products retrieved successfully", $products);
        } else {
            sendResponse(200, "No products found", []);
        }
    } catch (Exception $e) {
        sendResponse(500, "Database error: " . $e->getMessage());
    }
} else {
    sendResponse(405, "Method not allowed");
}
?> 