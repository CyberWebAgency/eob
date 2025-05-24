<?php
// Database configuration
define('DB_SERVER', 'localhost');
define('DB_USERNAME', 'root');
define('DB_PASSWORD', '');
define('DB_NAME', 'eastocyon_db');

// Attempt to connect to MySQL database
$conn = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Create database if not exists
$sql = "CREATE DATABASE IF NOT EXISTS " . DB_NAME;
if ($conn->query($sql) === FALSE) {
    die("Error creating database: " . $conn->error);
}

// Select the database
$conn->select_db(DB_NAME);

// Create necessary tables if they don't exist
$tables = [
    "CREATE TABLE IF NOT EXISTS users (
        id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )",
    
    "CREATE TABLE IF NOT EXISTS news (
        id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        image VARCHAR(255),
        published_date DATETIME DEFAULT CURRENT_TIMESTAMP,
        status ENUM('active', 'inactive') DEFAULT 'active'
    )",
    
    "CREATE TABLE IF NOT EXISTS team (
        id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        position VARCHAR(100) NOT NULL,
        bio TEXT,
        image VARCHAR(255),
        order_number INT(11) DEFAULT 0,
        status ENUM('active', 'inactive') DEFAULT 'active'
    )",
    
    "CREATE TABLE IF NOT EXISTS collaborators (
        id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        description TEXT,
        logo VARCHAR(255),
        website VARCHAR(255),
        type ENUM('collaborator', 'investor') NOT NULL,
        status ENUM('active', 'inactive') DEFAULT 'active'
    )",
    
    "CREATE TABLE IF NOT EXISTS products (
        id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        description TEXT,
        image VARCHAR(255),
        order_number INT(11) DEFAULT 0,
        status ENUM('active', 'inactive') DEFAULT 'active'
    )"
];

foreach ($tables as $sql) {
    if ($conn->query($sql) === FALSE) {
        echo "Error creating table: " . $conn->error;
    }
}

// Insert default admin user if not exists
$checkAdmin = $conn->query("SELECT * FROM users WHERE username = 'admin' LIMIT 1");
if ($checkAdmin->num_rows == 0) {
    $default_password = password_hash("admin123", PASSWORD_DEFAULT);
    $sql = "INSERT INTO users (username, password) VALUES ('admin', '$default_password')";
    $conn->query($sql);
}
?> 