<?php
// Include header
require_once "includes/header.php";
require_once "includes/functions.php";

// Flash message handling
if (isset($_SESSION['flash_message'])) {
    echo '<div class="max-w-7xl mx-auto p-4">' . $_SESSION['flash_message'] . '</div>';
    unset($_SESSION['flash_message']);
}

// Set page action (default: list)
$action = $_GET['action'] ?? 'list';

// Handle delete action
if ($action === 'delete' && isset($_GET['id']) && isset($_GET['csrf_token'])) {
    if ($_GET['csrf_token'] !== $_SESSION['csrf_token']) {
        $_SESSION['flash_message'] = '<div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">Invalid request.</div>';
        header("Location: collaborators.php");
        exit;
    }
    $id = (int)$_GET['id'];
    $res = $conn->query("SELECT image FROM collaborators WHERE id = $id");
    if ($res && $res->num_rows) {
        $row = $res->fetch_assoc();
        deleteFile($row['image']);
    }
    if ($conn->query("DELETE FROM collaborators WHERE id = $id")) {
        $_SESSION['success'] = "Collaborator/Investor deleted successfully.";
    } else {
        $_SESSION['error'] = "Error deleting: " . $conn->error;
    }
    header("Location: collaborators.php");
    exit;
}

// Form processing
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!isset($_POST['csrf_token']) || $_POST['csrf_token'] !== $_SESSION['csrf_token']) {
        $_SESSION['flash_message'] = '<div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">Invalid request.</div>';
        header("Location: collaborators.php");
        exit;
    }
    
    $name = $conn->real_escape_string($_POST['title']);
    $description = $conn->real_escape_string($_POST['description']);
    $website = $conn->real_escape_string($_POST['link']);
    $order_number = isset($_POST['order_number']) ? intval($_POST['order_number']) : 0;
    $status = $conn->real_escape_string($_POST['status']);
    
    if (isset($_POST['add'])) {
        // Upload image for new collaborator
        $image = handleFileUpload("image", "uploads/collaborators/");
        
        $sql = "INSERT INTO collaborators 
                (title, description, image, link, order_number, status) 
                VALUES 
                ('$name', '$description', '$image', '$website', $order_number, '$status')";
        if ($conn->query($sql)) {
            $_SESSION['success'] = "Collaborator/Investor added successfully.";
        } else {
            $_SESSION['error'] = "Error adding: " . htmlspecialchars($conn->error);
        }
        header("Location: collaborators.php");
        exit;
    } elseif (isset($_POST['update'], $_POST['id'])) {
        $id = (int)$_POST['id'];
        
        // Get current image
        $currentImage = '';
        $res = $conn->query("SELECT image FROM collaborators WHERE id = $id");
        if ($res && $old = $res->fetch_assoc()) {
            $currentImage = $old['image'];
        }
        
        // Upload and update image if provided
        $image = handleFileUpload("image", "uploads/collaborators/", $currentImage);
        $imageUpdate = $image ? ", image='$image'" : "";
        
        $sql = "UPDATE collaborators 
                SET title='$name', description='$description', link='$website', order_number=$order_number, status='$status'$imageUpdate 
                WHERE id=$id";
        if ($conn->query($sql)) {
            $_SESSION['success'] = "Collaborator/Investor updated successfully.";
        } else {
            $_SESSION['error'] = "Error updating: " . htmlspecialchars($conn->error);
        }
        header("Location: collaborators.php");
        exit;
    }
}
?>

<!-- Page Title -->
<script>
    document.getElementById('page-title').textContent = 'Collaborators & Investors';
</script>

<!-- Flash Messages -->
<?php if(isset($_SESSION['success'])): ?>
    <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4 mx-6" role="alert">
        <span class="block sm:inline"><?php echo $_SESSION['success']; unset($_SESSION['success']); ?></span>
    </div>
<?php endif; ?>

<?php if(isset($_SESSION['error'])): ?>
    <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 mx-6" role="alert">
        <span class="block sm:inline"><?php echo $_SESSION['error']; unset($_SESSION['error']); ?></span>
    </div>
<?php endif; ?>

<?php
// Handle different actions
if ($action === 'add'): ?>
    <div class="max-w-4xl mx-auto p-6">
      <div class="bg-white shadow rounded-lg overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-200">
          <h5 class="text-lg font-medium text-gray-900">Add Collaborator/Investor</h5>
        </div>
        <form action="collaborators.php" method="post" enctype="multipart/form-data" class="px-6 py-6 space-y-6">
          <input type="hidden" name="csrf_token" value="<?php echo $_SESSION['csrf_token']; ?>">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700">Title/Name <span class="text-red-500">*</span></label>
            <input type="text" id="name" name="name" required
                   class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
          </div>
          <div>
            <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
            <textarea id="description" name="description" rows="4"
                      class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea>
          </div>
          <div>
            <label for="logo" class="block text-sm font-medium text-gray-700">Logo/Image</label>
            <input type="file" id="logo" name="logo" data-preview="logoPreview"
                   class="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100">
            <img id="logoPreview" class="hidden mt-2 w-32 h-32 object-cover rounded-md" alt="Preview">
          </div>
          <div>
            <label for="website" class="block text-sm font-medium text-gray-700">Website URL</label>
            <input type="url" id="website" name="website" placeholder="https://example.com"
                   class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
          </div>
          <div>
            <label for="status" class="block text-sm font-medium text-gray-700">Status</label>
            <select id="status" name="status"
                    class="mt-1 block w-full border-gray-300 bg-white rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <div class="flex space-x-3">
            <button type="submit" name="add"
                    class="inline-flex justify-center py-2 px-4 bg-indigo-600 text-white text-sm font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Save
            </button>
            <a href="collaborators.php"
               class="inline-flex justify-center py-2 px-4 bg-white text-gray-700 text-sm font-medium border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Cancel
            </a>
          </div>
        </form>
      </div>
    </div>
<?php elseif ($action === 'edit' && isset($_GET['id'])):
    $id     = (int)$_GET['id'];
    $result = $conn->query("SELECT * FROM collaborators WHERE id = $id");
    if ($result && $collaborator = $result->fetch_assoc()): ?>
      <div class="max-w-4xl mx-auto p-6">
        <div class="bg-white shadow rounded-lg overflow-hidden">
          <div class="px-6 py-4 border-b border-gray-200">
            <h5 class="text-lg font-medium text-gray-900">Edit Collaborator/Investor</h5>
          </div>
          <form action="collaborators.php" method="post" enctype="multipart/form-data" class="px-6 py-6 space-y-6">
            <input type="hidden" name="csrf_token" value="<?php echo $_SESSION['csrf_token']; ?>">
            <input type="hidden" name="id" value="<?php echo $collaborator['id']; ?>">
            <div>
              <label for="name" class="block text-sm font-medium text-gray-700">Title/Name <span class="text-red-500">*</span></label>
              <input type="text" id="name" name="name" required
                     value="<?php echo htmlspecialchars($collaborator['title']); ?>"
                     class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            </div>
            <div>
              <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
              <textarea id="description" name="description" rows="4"
                        class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"><?php echo htmlspecialchars($collaborator['description']); ?></textarea>
            </div>
            <?php if ($collaborator['image']): ?>
              <div>
                <img src="../<?php echo $collaborator['image']; ?>"
                     class="w-32 h-32 object-cover rounded-md" alt="Current Logo">
                <p class="mt-2 text-sm text-gray-500">Current logo</p>
              </div>
            <?php endif; ?>
            <div>
              <label for="logo" class="block text-sm font-medium text-gray-700">Logo/Image</label>
              <input type="file" id="logo" name="logo" data-preview="logoPreview"
                     class="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100">
              <img id="logoPreview" class="hidden mt-2 w-32 h-32 object-cover rounded-md" alt="Preview">
              <p class="mt-1 text-sm text-gray-500">Leave empty to keep current logo</p>
            </div>
            <div>
              <label for="website" class="block text-sm font-medium text-gray-700">Website URL</label>
              <input type="url" id="website" name="website" placeholder="https://example.com"
                     value="<?php echo htmlspecialchars($collaborator['link']); ?>"
                     class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            </div>
            <div>
              <label for="status" class="block text-sm font-medium text-gray-700">Status</label>
              <select id="status" name="status"
                      class="mt-1 block w-full border-gray-300 bg-white rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                <option value="active" <?php echo ($collaborator['status'] === 'active') ? 'selected' : ''; ?>>Active</option>
                <option value="inactive" <?php echo ($collaborator['status'] === 'inactive') ? 'selected' : ''; ?>>Inactive</option>
              </select>
            </div>
            <div class="flex space-x-3">
              <button type="submit" name="update"
                      class="inline-flex justify-center py-2 px-4 bg-indigo-600 text-white text-sm font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Update
              </button>
              <a href="collaborators.php"
                 class="inline-flex justify-center py-2 px-4 bg-white text-gray-700 text-sm font-medium border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Cancel
              </a>
            </div>
          </form>
        </div>
      </div>
    <?php else: ?>
      <div class="max-w-4xl mx-auto p-4">
        <div class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4">Collaborator/Investor not found.</div>
      </div>
    <?php endif; ?>
<?php else:
    // List all collaborators and investors
    $result = $conn->query("SELECT * FROM collaborators ORDER BY title");
?>
    <div class="max-w-7xl mx-auto p-6">
      <div class="flex justify-end mb-4">
        <a href="collaborators.php?action=add"
           class="inline-flex items-center px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          <i class="fas fa-plus mr-2"></i> Add Collaborator/Investor
        </a>
      </div>
      <div class="bg-white shadow rounded-lg overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <!-- <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th> -->
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title/Name</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Website</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <?php if ($result && $result->num_rows > 0): ?>
              <?php while ($row = $result->fetch_assoc()): ?>
                <tr>
                  <!-- <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"><?php echo $row['id']; ?></td> -->
                  <td class="px-6 py-4 whitespace-nowrap">
                    <?php if ($row['image']): ?>
                      <img src="../<?php echo $row['image']; ?>" class="w-12 h-12 object-contain rounded" alt="<?php echo htmlspecialchars($row['title']); ?>">
                    <?php else: ?>
                      <span class="text-gray-500 text-sm">No image</span>
                    <?php endif; ?>
                  </td>
                  <td class="px-6 py-4">
                    <div class="text-sm font-medium text-gray-900"><?php echo htmlspecialchars($row['title']); ?></div>
                    <?php if ($row['description']): ?>
                      <div class="text-sm text-gray-500 line-clamp-2"><?php echo htmlspecialchars(substr($row['description'], 0, 100)) . (strlen($row['description']) > 100 ? '...' : ''); ?></div>
                    <?php endif; ?>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm">
                    <?php if ($row['link']): ?>
                      <a href="<?php echo htmlspecialchars($row['link']); ?>" target="_blank" class="text-indigo-600 hover:text-indigo-900">
                        <i class="fas fa-external-link-alt mr-1"></i> Visit
                      </a>
                    <?php else: ?>
                      <span class="text-gray-500">No website</span>
                    <?php endif; ?>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full <?php echo $row['status']=='active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'; ?>">
                      <?php echo ucfirst($row['status']); ?>
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <a href="collaborators.php?action=edit&id=<?php echo $row['id']; ?>" class="text-indigo-600 hover:text-indigo-900 mr-2">
                      <i class="fas fa-edit"></i> Edit
                    </a>
                    <button onclick="confirmDelete(<?php echo $row['id']; ?>)" class="text-red-600 hover:text-red-900">
                      <i class="fas fa-trash"></i> Delete
                    </button>
                  </td>
                </tr>
              <?php endwhile; ?>
            <?php else: ?>
              <tr>
                <td colspan="6" class="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">No collaborators or investors found.</td>
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