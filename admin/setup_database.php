<?php
// Database connection settings
$host = "localhost";
$username = "root";
$password = "";
$database = "eob_database";

// Connect to MySQL
$conn = new mysqli($host, $username, $password);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Create database if it doesn't exist
$sql = "CREATE DATABASE IF NOT EXISTS $database";
if ($conn->query($sql) === TRUE) {
    echo "Database created or already exists successfully<br>";
} else {
    die("Error creating database: " . $conn->error);
}

// Select the database
$conn->select_db($database);

// Read the SQL file
$sql = file_get_contents('db_setup.sql');

// Execute the SQL commands
if ($conn->multi_query($sql)) {
    echo "Database tables created successfully<br>";
    
    // Process all result sets to clear the buffer
    do {
        if ($result = $conn->store_result()) {
            $result->free();
        }
    } while ($conn->more_results() && $conn->next_result());
    
    echo "Database setup completed successfully!<br><br>";
    echo "Next steps:<br>";
    echo "1. <a href='create_directories.php'>Create Upload Directories</a><br>";
    echo "2. <a href='login.php'>Go to Login Page</a>";
} else {
    echo "Error executing SQL: " . $conn->error;
}

// Close connection
$conn->close();
?> 