<?php
// Include header
require_once "includes/header.php";
require_once "includes/functions.php";

// Flash message handling
if (isset($_SESSION['flash_message'])) {
    echo $_SESSION['flash_message'];
    unset($_SESSION['flash_message']);
}

// Set page action (default: list)
$action = isset($_GET['action']) ? $_GET['action'] : 'list';

// Handle delete action
if ($action === 'delete' && isset($_GET['id'], $_GET['csrf_token'])) {
    if ($_GET['csrf_token'] !== $_SESSION['csrf_token']) {
        $_SESSION['flash_message'] = "<div class='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4'>Invalid request.</div>";
        header("Location: products.php");
        exit;
    }
    $id = intval($_GET['id']);
    // Remove old image
    $res = $conn->query("SELECT image FROM products WHERE id = $id");
    if ($res && $res->num_rows) {
        $row = $res->fetch_assoc();
        deleteFile($row['image']);
    }
    // Delete record
    if ($conn->query("DELETE FROM products WHERE id = $id")) {
        $_SESSION['success'] = "Product deleted successfully.";
    } else {
        $_SESSION['error'] = "Error deleting product: " . $conn->error;
    }
    header("Location: products.php");
    exit;
}

// Handle add/edit form submission
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!isset($_POST['csrf_token']) || $_POST['csrf_token'] !== $_SESSION['csrf_token']) {
        $_SESSION['flash_message'] = "<div class='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4'>Invalid request.</div>";
        header("Location: products.php");
        exit;
    }
    $name               = $conn->real_escape_string($_POST['name']);
    $category           = $conn->real_escape_string($_POST['category']);
    $short_description  = $conn->real_escape_string($_POST['short_description']);
    $description        = $conn->real_escape_string($_POST['description']);
    $features           = $conn->real_escape_string($_POST['features']);
    $order_number       = isset($_POST['order_number']) ? intval($_POST['order_number']) : 0;
    $status             = $conn->real_escape_string($_POST['status']);

    if (isset($_POST['add'])) {
        // Upload new product image
        $image = handleFileUpload('image', 'uploads/products/');
        
        $sql = "INSERT INTO products 
                (name, category, short_description, description, features, image, order_number, status) 
                VALUES 
                ('$name','$category','$short_description','$description','$features','$image',$order_number,'$status')";
        if ($conn->query($sql)) {
            $_SESSION['success'] = "Product added successfully.";
        } else {
            $_SESSION['error'] = "Error adding product: " . $conn->error;
        }
        header("Location: products.php");
        exit;
    }
    elseif (isset($_POST['update'], $_POST['id'])) {
        $id = intval($_POST['id']);
        
        // Get current image for possible deletion
        $currentImage = '';
        $res = $conn->query("SELECT image FROM products WHERE id = $id");
        if ($res && $res->num_rows) {
            $old = $res->fetch_assoc();
            $currentImage = $old['image'];
        }
        
        // Upload new image if provided
        $image = handleFileUpload('image', 'uploads/products/', $currentImage);
        $imageUpdate = $image ? ", image = '$image'" : "";
        
        $sql = "UPDATE products SET 
                    name='$name', category='$category', short_description='$short_description',
                    description='$description', features='$features', order_number=$order_number,
                    status='$status'$imageUpdate
                WHERE id = $id";
        if ($conn->query($sql)) {
            $_SESSION['success'] = "Product updated successfully.";
        } else {
            $_SESSION['error'] = "Error updating product: " . $conn->error;
        }
        header("Location: products.php");
        exit;
    }
}
?>

<!-- Page Title -->
<script>
    document.getElementById('page-title').textContent = 'Products Management';
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

<?php if(isset($_SESSION['flash_message'])): ?>
    <?php echo $_SESSION['flash_message']; unset($_SESSION['flash_message']); ?>
<?php endif; ?>

<?php
// Render pages
if ($action === 'add' || $action === 'edit'):
    $product = null;
    if ($action === 'edit' && isset($_GET['id'])) {
        $id = intval($_GET['id']);
        $result = $conn->query("SELECT * FROM products WHERE id = $id");
        if ($result && $result->num_rows) {
            $product = $result->fetch_assoc();
        }
    }
    if ($action === 'edit' && !$product) {
        echo "<div class='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4'>Product not found.</div>";
    } else {
?>
    <div class="bg-white rounded-xl p-6 mb-6 shadow-sm">
        <h2 class="text-xl font-semibold text-gray-800 mb-4"><?php echo $action === 'add' ? 'Add Product' : 'Edit Product'; ?></h2>
        <form action="products.php" method="post" enctype="multipart/form-data" class="space-y-4">
          <input type="hidden" name="csrf_token" value="<?php echo $_SESSION['csrf_token']; ?>">
          <?php if ($action === 'edit'): ?>
          <input type="hidden" name="id" value="<?php echo $product['id']; ?>">
          <?php endif; ?>
          
          <div>
            <label class="block text-sm font-medium text-gray-700" for="name">Product Name <span class="text-red-500">*</span></label>
            <input class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50" 
                   id="name" name="name" value="<?php echo isset($product) ? htmlspecialchars($product['name']) : ''; ?>" required>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700" for="category">Category <span class="text-red-500">*</span></label>
            <input class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50" 
                   id="category" name="category" value="<?php echo isset($product) ? htmlspecialchars($product['category']) : ''; ?>" required placeholder="e.g. Diagnostics, Therapeutics">
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700" for="short_description">Short Description</label>
            <input class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50" 
                   id="short_description" name="short_description" value="<?php echo isset($product) ? htmlspecialchars($product['short_description']) : ''; ?>" placeholder="Brief one-line description">
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700" for="description">Full Description</label>
            <textarea class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50" 
                      id="description" name="description" rows="4"><?php echo isset($product) ? htmlspecialchars($product['description']) : ''; ?></textarea>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700" for="features">Key Features</label>
            <textarea class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50" 
                      id="features" name="features" rows="4" placeholder="Enter each feature on a new line"><?php echo isset($product) ? htmlspecialchars($product['features']) : ''; ?></textarea>
            <p class="mt-1 text-sm text-gray-500">Enter each feature on a new line</p>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700" for="image">Product Image</label>
            <?php if (isset($product) && $product['image']): ?>
              <div class="mt-2">
                <img src="../<?php echo $product['image']; ?>" class="h-32 w-32 object-cover rounded-md mb-2" alt="Current Image">
                <p class="text-sm text-gray-500">Current image (upload new to replace)</p>
              </div>
            <?php endif; ?>
            <input type="file" name="image" id="image" accept="image/*" data-preview="imagePreview"
                   class="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary-dark">
            <img id="imagePreview" class="mt-2 h-32 w-32 object-cover rounded-md hidden" alt="Preview">
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700" for="order_number">Display Order</label>
            <input class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50" 
                   id="order_number" name="order_number" type="number" value="<?php echo isset($product) ? $product['order_number'] : '0'; ?>" min="0">
            <p class="mt-1 text-sm text-gray-500">Lower numbers will be displayed first</p>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700" for="status">Status</label>
            <select class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50" id="status" name="status">
              <option value="active" <?php echo (isset($product) && $product['status'] == 'active') ? 'selected' : ''; ?>>Active</option>
              <option value="inactive" <?php echo (isset($product) && $product['status'] == 'inactive') ? 'selected' : ''; ?>>Inactive</option>
            </select>
          </div>
          
          <div class="flex justify-end space-x-3">
            <a href="products.php" class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
              Cancel
            </a>
            <button type="submit" name="<?php echo $action === 'add' ? 'add' : 'update'; ?>"
                    class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
              <?php echo $action === 'add' ? 'Save Product' : 'Update Product'; ?>
            </button>
          </div>
        </form>
    </div>
<?php 
    }
else:
    $result = $conn->query("SELECT * FROM products ORDER BY order_number, name");
?>
    <!-- Products List -->
    <div class="mb-4 flex justify-end">
        <a href="products.php?action=add" class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
            <i class="fas fa-plus mr-2"></i> Add Product
        </a>
    </div>
    
    <div class="bg-white rounded-xl p-6 shadow-sm">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">Products</h2>
        <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                    <tr>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    <?php if ($result && $result->num_rows > 0): ?>
                        <?php while ($row = $result->fetch_assoc()): ?>
                            <tr>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <?php if($row['image']): ?>
                                        <img src="../<?php echo htmlspecialchars($row['image']); ?>" alt="<?php echo htmlspecialchars($row['name']); ?>" class="h-12 w-12 object-cover rounded">
                                    <?php else: ?>
                                        <div class="h-12 w-12 bg-gray-200 rounded flex items-center justify-center">
                                            <i class="fas fa-box text-gray-400"></i>
                                        </div>
                                    <?php endif; ?>
                                </td>
                                <td class="px-6 py-4">
                                    <div class="text-sm font-medium text-gray-900"><?php echo htmlspecialchars($row['name']); ?></div>
                                    <div class="text-sm text-gray-500"><?php echo htmlspecialchars($row['short_description']); ?></div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="text-sm text-gray-900"><?php echo htmlspecialchars($row['category']); ?></div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full <?php echo $row['status'] == 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'; ?>">
                                        <?php echo ucfirst($row['status']); ?>
                                    </span>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <a href="products.php?action=edit&id=<?php echo $row['id']; ?>"
                                       class="text-primary hover:text-primary-dark mr-3">
                                        <i class="fas fa-edit"></i> Edit
                                    </a>
                                    <button onclick="confirmDelete(<?php echo $row['id']; ?>)"
                                            class="text-red-600 hover:text-red-900">
                                        <i class="fas fa-trash"></i> Delete
                                    </button>
                                </td>
                            </tr>
                        <?php endwhile; ?>
                    <?php else: ?>
                        <tr>
                            <td colspan="5" class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">No products found</td>
                        </tr>
                    <?php endif; ?>
                </tbody>
            </table>
        </div>
    </div>
<?php endif; ?>

<script>
function confirmDelete(id) {
    // Use the openDeleteModal function defined in footer.php
    const currentPage = window.location.pathname.split('/').pop();
    const deleteUrl = `${currentPage}?action=delete&id=${id}&csrf_token=<?php echo $_SESSION['csrf_token']; ?>`;
    
    // Call the shared modal function
    openDeleteModal(deleteUrl);
}

// Image preview for file upload
document.addEventListener('DOMContentLoaded', function() {
    const fileInputs = document.querySelectorAll('input[type="file"][data-preview]');
    fileInputs.forEach(input => {
        input.onchange = function() {
            const previewId = this.getAttribute('data-preview');
            const preview = document.getElementById(previewId);
            
            if (this.files && this.files[0]) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    preview.src = e.target.result;
                    preview.classList.remove('hidden');
                }
                reader.readAsDataURL(this.files[0]);
            }
        };
    });
});
</script>

<?php require_once "includes/footer.php"; ?>