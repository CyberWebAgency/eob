<?php
// Include header
require_once "includes/header.php";
require_once "includes/functions.php";

// Process delete request
if(isset($_GET['action']) && $_GET['action'] === 'delete' && isset($_GET['id']) && isset($_GET['csrf_token'])) {
    if($_GET['csrf_token'] === $_SESSION['csrf_token']) {
        $id = $_GET['id'];
        
        // Find and delete the associated image file
        $result = mysqli_query($conn, "SELECT image FROM technologies WHERE id = $id");
        if ($result && mysqli_num_rows($result) > 0) {
            $row = mysqli_fetch_assoc($result);
            deleteFile($row['image']);
        }
        
        // Delete the database record
        if (mysqli_query($conn, "DELETE FROM technologies WHERE id = $id")) {
            $_SESSION['success'] = "Technology deleted successfully.";
        } else {
            $_SESSION['error'] = "Error deleting technology: " . mysqli_error($conn);
        }
        
        header("Location: technology.php");
        exit;
    } else {
        $_SESSION['error'] = "Invalid request.";
        header("Location: technology.php");
        exit;
    }
}

// Process form submission
if($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['csrf_token'])) {
    if($_POST['csrf_token'] === $_SESSION['csrf_token']) {
        $title = trim($_POST["title"]);
        $description = trim($_POST["description"]);
        $status = $_POST["status"];
        $order_number = isset($_POST["order_number"]) ? intval($_POST["order_number"]) : 0;
        $id = isset($_POST["id"]) && !empty($_POST["id"]) ? $_POST["id"] : null;
        
        if($id) {
            // Update existing technology
            
            // Get current image for possible deletion
            $currentImage = '';
            $result = mysqli_query($conn, "SELECT image FROM technologies WHERE id = $id");
            if ($result && mysqli_num_rows($result) > 0) {
                $row = mysqli_fetch_assoc($result);
                $currentImage = $row['image'];
            }
            
            // Handle image upload with automatic old image deletion
            $image_path = handleFileUpload("image", "uploads/technology/", $currentImage);
            
            $sql = "UPDATE technologies SET title = ?, description = ?, status = ?, order_number = ?";
            $params = array($title, $description, $status, $order_number);
            $types = "sssi";
            
            if($image_path) {
                $sql .= ", image = ?";
                $params[] = $image_path;
                $types .= "s";
            }
            
            $sql .= " WHERE id = ?";
            $params[] = $id;
            $types .= "i";
            
            if($stmt = mysqli_prepare($conn, $sql)) {
                mysqli_stmt_bind_param($stmt, $types, ...$params);
                if(mysqli_stmt_execute($stmt)) {
                    $_SESSION['success'] = "Technology updated successfully.";
                } else {
                    $_SESSION['error'] = "Error updating technology: " . mysqli_error($conn);
                }
                mysqli_stmt_close($stmt);
            }
        } else {
            // Insert new technology
            
            // Handle image upload for new technology
            $image_path = handleFileUpload("image", "uploads/technology/");
            
            $sql = "INSERT INTO technologies (title, description, image, status, order_number) VALUES (?, ?, ?, ?, ?)";
            if($stmt = mysqli_prepare($conn, $sql)) {
                mysqli_stmt_bind_param($stmt, "ssssi", $title, $description, $image_path, $status, $order_number);
                if(mysqli_stmt_execute($stmt)) {
                    $_SESSION['success'] = "Technology added successfully.";
                } else {
                    $_SESSION['error'] = "Error adding technology: " . mysqli_error($conn);
                }
                mysqli_stmt_close($stmt);
            }
        }
        
        // Prevent form resubmission
        header("Location: technology.php");
        exit;
    } else {
        $_SESSION['error'] = "Invalid request.";
        header("Location: technology.php");
        exit;
    }
}

// Fetch all technologies
$technologies = array();
$sql = "SELECT * FROM technologies ORDER BY order_number ASC, created_at DESC";
if($result = mysqli_query($conn, $sql)) {
    while($row = mysqli_fetch_assoc($result)) {
        $technologies[] = $row;
    }
    mysqli_free_result($result);
}
?>

<!-- Page Title -->
<script>
    document.getElementById('page-title').textContent = 'Technology Management';
</script>

<!-- Flash Messages -->
<?php if(isset($_SESSION['success'])): ?>
    <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
        <span class="block sm:inline"><?php echo $_SESSION['success']; unset($_SESSION['success']); ?></span>
    </div>
<?php endif; ?>

<?php if(isset($_SESSION['error'])): ?>
    <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
        <span class="block sm:inline"><?php echo $_SESSION['error']; unset($_SESSION['error']); ?></span>
    </div>
<?php endif; ?>

<!-- Add/Edit Form -->
<div class="bg-white rounded-xl p-6 mb-6 shadow-sm">
    <h2 class="text-xl font-semibold text-gray-800 mb-4">Add New Technology</h2>
    <form action="technology.php" method="POST" enctype="multipart/form-data" class="space-y-4">
        <input type="hidden" name="csrf_token" value="<?php echo $_SESSION['csrf_token']; ?>">
        <input type="hidden" name="id" id="edit_id">
        
        <div>
            <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
            <input type="text" name="title" id="title" required
                   class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50">
        </div>
        
        <div>
            <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
            <textarea name="description" id="description" rows="4" required
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"></textarea>
        </div>
        
        <div>
            <label for="image" class="block text-sm font-medium text-gray-700">Image</label>
            <input type="file" name="image" id="image" accept="image/*"
                   class="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary-dark">
        </div>
        
        <div>
            <label for="order_number" class="block text-sm font-medium text-gray-700">Display Order</label>
            <input type="number" name="order_number" id="order_number" min="0" step="1" value="0" required
                   class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50">
            <p class="text-xs text-gray-500 mt-1">Lower numbers display first. Use 0 for default ordering.</p>
        </div>
        
        <div>
            <label for="status" class="block text-sm font-medium text-gray-700">Status</label>
            <select name="status" id="status" required
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50">
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
            </select>
        </div>
        
        <div class="flex justify-end space-x-3">
            <button type="button" onclick="resetForm()"
                    class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                Reset
            </button>
            <button type="submit"
                    class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                Save Technology
            </button>
        </div>
    </form>
</div>

<!-- Technologies List -->
<div class="bg-white rounded-xl p-6 shadow-sm">
    <h2 class="text-xl font-semibold text-gray-800 mb-4">Technologies</h2>
    <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
                <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
                <?php foreach($technologies as $tech): ?>
                <tr>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm font-medium text-gray-900"><?php echo htmlspecialchars($tech['order_number']); ?></div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <?php if($tech['image']): ?>
                            <img src="../<?php echo htmlspecialchars($tech['image']); ?>" alt="<?php echo htmlspecialchars($tech['title']); ?>" class="h-12 w-12 object-cover rounded">
                        <?php else: ?>
                            <div class="h-12 w-12 bg-gray-200 rounded flex items-center justify-center">
                                <i class="fas fa-image text-gray-400"></i>
                            </div>
                        <?php endif; ?>
                    </td>
                    <td class="px-6 py-4">
                        <div class="text-sm font-medium text-gray-900"><?php echo htmlspecialchars($tech['title']); ?></div>
                        <div class="text-sm text-gray-500"><?php echo substr(htmlspecialchars($tech['description']), 0, 100) . '...'; ?></div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full <?php echo $tech['status'] == 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'; ?>">
                            <?php echo ucfirst($tech['status']); ?>
                        </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button onclick='editTechnology(<?php echo json_encode($tech); ?>)'
                                class="text-primary hover:text-primary-dark mr-3">
                            <i class="fas fa-edit"></i> Edit
                        </button>
                        <button onclick="confirmDelete(<?php echo $tech['id']; ?>)"
                                class="text-red-600 hover:text-red-900">
                            <i class="fas fa-trash"></i> Delete
                        </button>
                    </td>
                </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    </div>
</div>

<script>
function editTechnology(tech) {
    try {
        // Set form values
        document.getElementById('edit_id').value = tech.id;
        document.getElementById('title').value = tech.title;
        document.getElementById('description').value = tech.description;
        document.getElementById('status').value = tech.status;
        document.getElementById('order_number').value = tech.order_number || 0;
        
        // Get the form heading using a more specific selector
        const formHeading = document.querySelector('.bg-white.rounded-xl.p-6.mb-6 h2');
        if (formHeading) {
            formHeading.textContent = 'Edit Technology';
        }
        
        // Scroll to the form
        document.querySelector('form').scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
        console.error("Error while editing technology:", error, tech);
        alert("Failed to load technology data for editing. Please try again.");
    }
}

function resetForm() {
    document.getElementById('edit_id').value = '';
    document.getElementById('title').value = '';
    document.getElementById('description').value = '';
    document.getElementById('status').value = 'active';
    document.getElementById('order_number').value = '0';
    document.getElementById('image').value = '';
    
    // Get the form heading using a more specific selector
    const formHeading = document.querySelector('.bg-white.rounded-xl.p-6.mb-6 h2');
    if (formHeading) {
        formHeading.textContent = 'Add New Technology';
    }
}

function confirmDelete(id) {
    // Use the function defined in footer.php
    const currentPage = window.location.pathname.split('/').pop();
    const deleteUrl = `${currentPage}?action=delete&id=${id}&csrf_token=<?php echo $_SESSION['csrf_token']; ?>`;
    
    // Set the delete URL with CSRF token
    document.getElementById('confirmDeleteBtn').href = deleteUrl;
    
    // Show the modal
    openModal();
}
</script>

<?php require_once "includes/footer.php"; ?>