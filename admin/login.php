<?php
// Initialize the session
session_start();
 
// Check if the user is already logged in, if yes then redirect to dashboard
if(isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] === true){
    header("location: index.php");
    exit;
}

// CSRF Protection - Generate token if it doesn't exist
if (!isset($_SESSION['login_csrf_token'])) {
    $_SESSION['login_csrf_token'] = bin2hex(random_bytes(32));
}

// Flash message handling
if (isset($_SESSION['login_flash_message'])) {
    $login_err = $_SESSION['login_flash_message'];
    unset($_SESSION['login_flash_message']);
}
 
// Include database connection file
require_once "../config/database.php";
 
// Define variables and initialize with empty values
$username = $password = "";
$username_err = $password_err = $login_err = "";
 
// Processing form data when form is submitted
if($_SERVER["REQUEST_METHOD"] == "POST"){
    // Verify CSRF token
    if (!isset($_POST['csrf_token']) || $_POST['csrf_token'] !== $_SESSION['login_csrf_token']) {
        $_SESSION['login_flash_message'] = "Invalid request. Please try again.";
        header("Location: login.php");
        exit;
    }
    
    // Check if username is empty
    if(empty(trim($_POST["username"]))){
        $username_err = "Please enter username.";
    } else{
        $username = trim($_POST["username"]);
    }
    
    // Check if password is empty
    if(empty(trim($_POST["password"]))){
        $password_err = "Please enter your password.";
    } else{
        $password = trim($_POST["password"]);
    }
    
    // Validate credentials
    if(empty($username_err) && empty($password_err)){
        // Prepare a select statement
        $sql = "SELECT id, username, password FROM users WHERE username = ?";
        
        if($stmt = $conn->prepare($sql)){
            // Bind variables to the prepared statement as parameters
            $stmt->bind_param("s", $param_username);
            
            // Set parameters
            $param_username = $username;
            
            // Attempt to execute the prepared statement
            if($stmt->execute()){
                // Store result
                $stmt->store_result();
                
                // Check if username exists, if yes then verify password
                if($stmt->num_rows == 1){                    
                    // Bind result variables
                    $stmt->bind_result($id, $username, $hashed_password);
                    if($stmt->fetch()){
                        if(password_verify($password, $hashed_password)){
                            // Password is correct, so start a new session
                            session_regenerate_id(true); // Prevent session fixation attacks
                            
                            // Store data in session variables
                            $_SESSION["loggedin"] = true;
                            $_SESSION["id"] = $id;
                            $_SESSION["username"] = $username;                            
                            
                            // Generate a new CSRF token for the dashboard
                            $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
                            
                            // Redirect user to dashboard
                            header("location: index.php");
                            exit;
                        } else{
                            // Password is not valid
                            $_SESSION['login_flash_message'] = "Invalid username or password.";
                            header("Location: login.php");
                            exit;
                        }
                    }
                } else{
                    // Username doesn't exist
                    $_SESSION['login_flash_message'] = "Invalid username or password.";
                    header("Location: login.php");
                    exit;
                }
            } else{
                $_SESSION['login_flash_message'] = "Oops! Something went wrong. Please try again later.";
                header("Location: login.php");
                exit;
            }

            // Close statement
            $stmt->close();
        }
    }
    
    // Close connection
    $conn->close();
}
?>
 
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - East Ocyon Bio Admin</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        primary: '#007bff',
                        secondary: '#6c757d',
                        dark: {
                            DEFAULT: '#1a1a1a',
                            lighter: '#2d2d2d',
                            light: '#363636'
                        }
                    }
                }
            }
        }
    </script>
</head>
<body class="bg-gradient-to-br from-dark to-dark-lighter min-h-screen flex items-center justify-center p-4">
    <div class="w-full max-w-md">
        <div class="bg-dark-lighter rounded-2xl shadow-2xl overflow-hidden relative">
            <!-- Gradient line at the top -->
            <div class="h-1 bg-gradient-to-r from-primary to-green-400"></div>
            
            <div class="p-8">
                <div class="text-center mb-8">
                    <h2 class="text-3xl font-bold text-white mb-2">East Ocyon Bio</h2>
                    <p class="text-gray-400">Admin Login</p>
                </div>
                
                <?php 
                if(!empty($login_err)){
                    echo '<div class="bg-red-500/10 border border-red-500/20 text-red-500 rounded-lg p-4 mb-6 flex items-center">
                            <i class="fas fa-exclamation-circle mr-2"></i>
                            ' . $login_err . '
                          </div>';
                }        
                ?>

                <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="post">
                    <input type="hidden" name="csrf_token" value="<?php echo $_SESSION['login_csrf_token']; ?>">
                    
                    <div class="mb-6">
                        <label class="block text-gray-300 text-sm font-medium mb-2">
                            <i class="fas fa-user mr-2"></i>Username
                        </label>
                        <input type="text" name="username" 
                               class="w-full px-4 py-3 bg-dark border border-gray-700 rounded-lg text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors <?php echo (!empty($username_err)) ? 'border-red-500' : ''; ?>" 
                               value="<?php echo $username; ?>">
                        <?php if(!empty($username_err)): ?>
                            <p class="mt-1 text-sm text-red-500"><?php echo $username_err; ?></p>
                        <?php endif; ?>
                    </div>
                    
                    <div class="mb-6">
                        <label class="block text-gray-300 text-sm font-medium mb-2">
                            <i class="fas fa-lock mr-2"></i>Password
                        </label>
                        <input type="password" name="password" 
                               class="w-full px-4 py-3 bg-dark border border-gray-700 rounded-lg text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors <?php echo (!empty($password_err)) ? 'border-red-500' : ''; ?>">
                        <?php if(!empty($password_err)): ?>
                            <p class="mt-1 text-sm text-red-500"><?php echo $password_err; ?></p>
                        <?php endif; ?>
                    </div>
                    
                    <button type="submit" class="w-full bg-gradient-to-r from-primary to-blue-600 text-white font-medium py-3 px-4 rounded-lg hover:opacity-90 transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center">
                        <i class="fas fa-sign-in-alt mr-2"></i>
                        Login
                    </button>
                    
                    <p class="mt-6 text-center text-gray-500 text-sm">
                        Default credentials: admin / admin123
                    </p>
                </form>
            </div>
        </div>
    </div>
</body>
</html> 