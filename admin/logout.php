<?php
// Initialize the session
session_start();

// Check if CSRF token is valid (if this is a GET request with a token)
if (isset($_GET['csrf_token'])) {
    if ($_GET['csrf_token'] !== $_SESSION['csrf_token']) {
        // Invalid token, redirect to dashboard
        header("location: index.php");
        exit;
    }
} else {
    // No token provided, but for logout we'll continue anyway
    // In a more secure environment, you might want to require the token
}
 
// Unset all of the session variables
$_SESSION = array();
 
// Destroy the session
session_destroy();
 
// Redirect to login page
header("location: login.php");
exit;
?> 