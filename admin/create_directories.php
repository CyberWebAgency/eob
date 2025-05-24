<?php
// Create required upload directories
$directories = [
    '../uploads',
    '../uploads/news',
    '../uploads/team',
    '../uploads/products',
    '../uploads/collaborators',
    '../uploads/technology'
];

$allCreated = true;
$errors = [];

foreach ($directories as $dir) {
    if (!file_exists($dir)) {
        if (!mkdir($dir, 0777, true)) {
            $allCreated = false;
            $errors[] = "Failed to create directory: $dir";
        } else {
            chmod($dir, 0777); // Ensure permissions are set correctly
            echo "Created directory: $dir with full permissions<br>";
        }
    } else {
        // Directory exists, ensure it has correct permissions
        chmod($dir, 0777);
        echo "Directory $dir already exists, set permissions to 777<br>";
    }
}

if ($allCreated) {
    echo "<div style='color: green; margin-top: 20px;'>All directories created successfully!</div>";
} else {
    echo "<div style='color: red; margin-top: 20px;'>Errors occurred:</div>";
    echo "<ul>";
    foreach ($errors as $error) {
        echo "<li>$error</li>";
    }
    echo "</ul>";
    echo "<div style='margin-top: 10px;'>You may need to create these directories manually and set permissions to 777</div>";
}

echo "<div style='margin-top: 20px;'><a href='login.php'>Go to Login Page</a></div>";
?> 