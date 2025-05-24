<?php
/**
 * Common utility functions for the admin panel
 */

/**
 * Handle file uploads with automatic old file deletion
 * 
 * @param string $inputName Name of the file input field
 * @param string $uploadDir Directory to upload files to (relative to project root)
 * @param string $oldFilePath Path to the old file to delete (if any)
 * @return string Path to the uploaded file (relative to project root) or empty string if no file uploaded
 */
function handleFileUpload($inputName, $uploadDir = 'uploads/', $oldFilePath = '') {
    // Create target directory path with '../' prefix to start from project root
    $targetDir = "../" . $uploadDir;
    
    // Make sure the target directory exists
    if (!file_exists($targetDir)) {
        mkdir($targetDir, 0777, true);
    }
    
    // Check if a file was uploaded
    if (isset($_FILES[$inputName]) && $_FILES[$inputName]["name"]) {
        $fileName = basename($_FILES[$inputName]["name"]);
        
        // Create a unique filename to avoid conflicts
        $uniqueFileName = time() . '_' . uniqid() . '_' . $fileName;
        
        // Clean up filename to remove special characters
        $uniqueFileName = preg_replace('/[^a-zA-Z0-9.\-_]/', '', $uniqueFileName);
        
        // Full path to the new file
        $targetFilePath = $targetDir . $uniqueFileName;
        
        // Get file extension
        $fileType = strtolower(pathinfo($targetFilePath, PATHINFO_EXTENSION));
        
        // Allowed file types
        $allowTypes = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'];
        
        // Check if file type is allowed
        if (in_array($fileType, $allowTypes)) {
            // Upload the file
            if (move_uploaded_file($_FILES[$inputName]["tmp_name"], $targetFilePath)) {
                // Delete old file if it exists
                if (!empty($oldFilePath) && file_exists("../" . $oldFilePath)) {
                    // Attempt to delete the old file
                    unlink("../" . $oldFilePath);
                }
                
                // Return the path relative to the project root (without the leading "../")
                return $uploadDir . $uniqueFileName;
            }
        }
    }
    
    // If we get here, no new file was uploaded
    return "";
}

/**
 * Delete a file if it exists
 * 
 * @param string $filePath Path to the file (relative to project root)
 * @return bool True if file was deleted or doesn't exist, false otherwise
 */
function deleteFile($filePath) {
    if (empty($filePath)) {
        return true; // Nothing to delete
    }
    
    $fullPath = "../" . $filePath;
    
    if (file_exists($fullPath)) {
        return unlink($fullPath);
    }
    
    return true; // File doesn't exist
}
?> 