<?php
// Start output buffering
ob_start();

// Start session if not already started
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Check if the user is logged in, if not redirect to login page
if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
    header("location: login.php");
    exit;
}

// CSRF Protection - Generate token if it doesn't exist
if (!isset($_SESSION['csrf_token'])) {
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
}

// Include database connection
require_once "../config/database.php";
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>East Ocyon Bio - Admin Dashboard</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        primary: '#2563eb',
                        secondary: '#64748b',
                        light: {
                            DEFAULT: '#ffffff',
                            darker: '#f8fafc',
                            dark: '#f1f5f9'
                        }
                    }
                }
            }
        }
    </script>
</head>
<body class="bg-gray-50 text-gray-800 min-h-screen">
    <div class="flex h-screen">
        <!-- Sidebar -->
        <nav class="w-64 bg-white border-r border-gray-200 fixed h-full shadow-sm">
            <div class="p-4">
                <div class="text-center border-b border-gray-200 pb-4 mb-4">
                    <h5 class="text-xl font-semibold text-gray-800">East Ocyon Bio</h5>
                    <p class="text-gray-500 text-sm">Admin Panel</p>
                </div>
                <ul class="space-y-2">
                    <li>
                        <a href="index.php" class="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-primary rounded-lg transition-colors duration-200 <?php echo basename($_SERVER['PHP_SELF']) == 'index.php' ? 'bg-gray-50 text-primary' : ''; ?>">
                            <i class="fas fa-tachometer-alt w-5"></i>
                            <span>Dashboard</span>
                        </a>
                    </li>
                    <li>
                        <a href="news.php" class="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-primary rounded-lg transition-colors duration-200 <?php echo basename($_SERVER['PHP_SELF']) == 'news.php' ? 'bg-gray-50 text-primary' : ''; ?>">
                            <i class="fas fa-newspaper w-5"></i>
                            <span>News/Blogs</span>
                        </a>
                    </li>
                    <li>
                        <a href="team.php" class="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-primary rounded-lg transition-colors duration-200 <?php echo basename($_SERVER['PHP_SELF']) == 'team.php' ? 'bg-gray-50 text-primary' : ''; ?>">
                            <i class="fas fa-users w-5"></i>
                            <span>Team</span>
                        </a>
                    </li>
                    <li>
                        <a href="collaborators.php" class="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-primary rounded-lg transition-colors duration-200 <?php echo basename($_SERVER['PHP_SELF']) == 'collaborators.php' ? 'bg-gray-50 text-primary' : ''; ?>">
                            <i class="fas fa-handshake w-5"></i>
                            <span>Collaborators & Investors</span>
                        </a>
                    </li>
                    <li>
                        <a href="products.php" class="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-primary rounded-lg transition-colors duration-200 <?php echo basename($_SERVER['PHP_SELF']) == 'products.php' ? 'bg-gray-50 text-primary' : ''; ?>">
                            <i class="fas fa-flask w-5"></i>
                            <span>Products</span>
                        </a>
                    </li>
                    <li>
                        <a href="technology.php" class="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-primary rounded-lg transition-colors duration-200 <?php echo basename($_SERVER['PHP_SELF']) == 'technology.php' ? 'bg-gray-50 text-primary' : ''; ?>">
                            <i class="fas fa-microscope w-5"></i>
                            <span>Technology</span>
                        </a>
                    </li>
                    <li class="mt-8">
                        <a href="logout.php?csrf_token=<?php echo $_SESSION['csrf_token']; ?>" class="flex items-center px-4 py-2 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors duration-200">
                            <i class="fas fa-sign-out-alt w-5"></i>
                            <span>Logout</span>
                        </a>
                    </li>
                </ul>
            </div>
        </nav>

        <!-- Main Content -->
        <main class="ml-64 flex-1 p-8">
            <div class="bg-white rounded-xl p-6 mb-6 shadow-sm">
                <div class="flex justify-between items-center">
                    <h1 id="page-title" class="text-2xl font-semibold text-gray-800">Dashboard</h1>
                    <div class="text-gray-500">
                        <?php echo date("F j, Y"); ?>
                    </div>
                </div>
            </div>
            <!-- Content will be filled here -->
         