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
if ($action == 'delete' && isset($_GET['id']) && isset($_GET['csrf_token'])) {
    if ($_GET['csrf_token'] !== $_SESSION['csrf_token']) {
        $_SESSION['flash_message'] = '<div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">Invalid request.</div>';
        header("Location: team.php");
        exit;
    }
    $id = $_GET['id'];
    $result = $conn->query("SELECT photo FROM team_members WHERE id = $id");
    if ($result && $result->num_rows > 0) {
        $row = $result->fetch_assoc();
        deleteFile($row['photo']);
    }
    if ($conn->query("DELETE FROM team_members WHERE id = $id")) {
        $_SESSION['success'] = "Team member deleted successfully.";
    } else {
        $_SESSION['error'] = "Error deleting team member: " . $conn->error;
    }
    header("Location: team.php");
    exit;
}

// Form processing for add/edit actions
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (!isset($_POST['csrf_token']) || $_POST['csrf_token'] !== $_SESSION['csrf_token']) {
        $_SESSION['error'] = "Invalid request.";
        header("Location: team.php");
        exit;
    }

    $name         = $conn->real_escape_string($_POST['name']);
    $title        = $conn->real_escape_string($_POST['title']);
    $member_type  = $conn->real_escape_string($_POST['member_type']);
    $bio          = $conn->real_escape_string($_POST['bio']);
    $linkedin     = $conn->real_escape_string($_POST['linkedin']);
    $twitter      = $conn->real_escape_string($_POST['twitter']);
    $email        = $conn->real_escape_string($_POST['email']);
    $order_number = isset($_POST['order_number']) ? intval($_POST['order_number']) : 0;
    $status       = $conn->real_escape_string($_POST['status']);

    if (isset($_POST['add'])) {
        // Upload new photo
        $photo = handleFileUpload("photo", "uploads/team/");
        
        $sql = "INSERT INTO team_members 
                (name, title, member_type, bio, linkedin, twitter, email, photo, order_number, status) 
                VALUES 
                ('$name', '$title', '$member_type', '$bio', '$linkedin', '$twitter', '$email', '$photo', $order_number, '$status')";
        if ($conn->query($sql)) {
            $_SESSION['success'] = "Team member added successfully.";
        } else {
            $_SESSION['error'] = "Error adding team member: " . $conn->error;
        }
        header("Location: team.php");
        exit;
    } elseif (isset($_POST['update'], $_POST['id'])) {
        $id = $_POST['id'];
        
        // Get current photo
        $currentPhoto = '';
        $res = $conn->query("SELECT photo FROM team_members WHERE id = $id");
        if ($res && $res->num_rows > 0) {
            $r = $res->fetch_assoc();
            $currentPhoto = $r['photo'];
        }
        
        // Upload new photo if provided, which will automatically delete old one
        $photo = handleFileUpload("photo", "uploads/team/", $currentPhoto);
        $photoUpdate = $photo ? ", photo = '$photo'" : "";

        $sql = "UPDATE team_members SET 
                    name='$name', 
                    title='$title', 
                    member_type='$member_type', 
                    bio='$bio',
                    linkedin='$linkedin', 
                    twitter='$twitter', 
                    email='$email', 
                    order_number=$order_number,
                    status='$status'
                $photoUpdate
                WHERE id=$id";
        if ($conn->query($sql)) {
            $_SESSION['success'] = "Team member updated successfully.";
        } else {
            $_SESSION['error'] = "Error updating team member: " . $conn->error;
        }
        header("Location: team.php");
        exit;
    }
}
?>

<!-- Page Title -->
<script>
    document.getElementById('page-title').textContent = 'Team Management';
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
// Handle different actions
if ($action == 'add' || $action == 'edit') {
    $member = null;
    if ($action == 'edit' && isset($_GET['id'])) {
        $id = (int)$_GET['id'];
        $result = $conn->query("SELECT * FROM team_members WHERE id = $id");
        if ($result && $result->num_rows > 0) {
            $member = $result->fetch_assoc();
        }
    }
    ?>
    <div class="bg-white rounded-xl p-6 mb-6 shadow-sm">
        <h2 class="text-xl font-semibold text-gray-800 mb-4"><?php echo $action == 'add' ? 'Add Team Member' : 'Edit Team Member'; ?></h2>
        <form action="team.php" method="post" enctype="multipart/form-data" class="space-y-4">
            <input type="hidden" name="csrf_token" value="<?php echo $_SESSION['csrf_token']; ?>">
            <?php if ($action == 'edit' && $member): ?>
                <input type="hidden" name="id" value="<?php echo $member['id']; ?>">
            <?php endif; ?>
            
            <div>
                <label for="name" class="block text-sm font-medium text-gray-700">Name <span class="text-red-500">*</span></label>
                <input type="text" name="name" id="name" required value="<?php echo $member ? htmlspecialchars($member['name']) : ''; ?>"
                       class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50">
            </div>
            
            <div>
                <label for="title" class="block text-sm font-medium text-gray-700">Title/Position</label>
                <input type="text" name="title" id="title" value="<?php echo $member ? htmlspecialchars($member['title']) : ''; ?>"
                       class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50">
            </div>
            
            <div>
                <label for="member_type" class="block text-sm font-medium text-gray-700">Member Type <span class="text-red-500">*</span></label>
                <select name="member_type" id="member_type" required
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50">
                    <option value="">Select Type</option>
                    <option value="Leadership" <?php echo ($member && $member['member_type'] == 'Leadership') ? 'selected' : ''; ?>>Leadership</option>
                    <option value="Scientific Advisory Board" <?php echo ($member && $member['member_type'] == 'Scientific Advisory Board') ? 'selected' : ''; ?>>Scientific Advisory Board</option>
                    <option value="Team Members" <?php echo ($member && $member['member_type'] == 'Team Members') ? 'selected' : ''; ?>>Team Members</option>
                </select>
            </div>
            
            <div>
                <label for="bio" class="block text-sm font-medium text-gray-700">Biography</label>
                <textarea name="bio" id="bio" rows="4"
                          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"><?php echo $member ? htmlspecialchars($member['bio']) : ''; ?></textarea>
            </div>
            
            <div>
                <label for="photo" class="block text-sm font-medium text-gray-700">Photo</label>
                <?php if ($member && $member['photo']): ?>
                    <div class="mt-2">
                        <img src="../<?php echo $member['photo']; ?>" class="h-32 w-32 object-cover rounded-md mb-2" alt="Current Photo">
                        <p class="text-sm text-gray-500">Current photo (upload new to replace)</p>
                    </div>
                <?php endif; ?>
                <input type="file" name="photo" id="photo" accept="image/*"
                       class="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary-dark">
            </div>
            
            <div>
                <label for="linkedin" class="block text-sm font-medium text-gray-700">LinkedIn Profile URL</label>
                <input type="url" name="linkedin" id="linkedin" value="<?php echo $member ? htmlspecialchars($member['linkedin']) : ''; ?>"
                       placeholder="https://www.linkedin.com/in/username"
                       class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50">
            </div>
            
            <div>
                <label for="twitter" class="block text-sm font-medium text-gray-700">Twitter Profile URL</label>
                <input type="url" name="twitter" id="twitter" value="<?php echo $member ? htmlspecialchars($member['twitter']) : ''; ?>"
                       placeholder="https://twitter.com/username"
                       class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50">
            </div>
            
            <div>
                <label for="email" class="block text-sm font-medium text-gray-700">Email Address</label>
                <input type="email" name="email" id="email" value="<?php echo $member ? htmlspecialchars($member['email']) : ''; ?>"
                       class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50">
            </div>
            
            <div>
                <label for="order_number" class="block text-sm font-medium text-gray-700">Display Order</label>
                <input type="number" name="order_number" id="order_number" value="<?php echo $member ? intval($member['order_number']) : '0'; ?>"
                       min="0"
                       class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50">
                <p class="mt-1 text-sm text-gray-500">Lower numbers will be displayed first</p>
            </div>
            
            <div>
                <label for="status" class="block text-sm font-medium text-gray-700">Status</label>
                <select name="status" id="status" required
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50">
                    <option value="active" <?php echo ($member && $member['status'] == 'active') ? 'selected' : ''; ?>>Active</option>
                    <option value="inactive" <?php echo ($member && $member['status'] == 'inactive') ? 'selected' : ''; ?>>Inactive</option>
                </select>
            </div>
            
            <div class="flex justify-end space-x-3">
                <a href="team.php" class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                    Cancel
                </a>
                <button type="submit" name="<?php echo $action == 'add' ? 'add' : 'update'; ?>"
                        class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                    <?php echo $action == 'add' ? 'Add Team Member' : 'Update Team Member'; ?>
                </button>
            </div>
        </form>
    </div>
<?php } else { ?>
    <!-- Team Members List -->
    <div class="mb-4 flex justify-end">
        <a href="team.php?action=add" class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
            <i class="fas fa-plus mr-2"></i> Add Team Member
        </a>
    </div>
    
    <div class="bg-white rounded-xl p-6 shadow-sm">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">Team Members</h2>
        <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                    <tr>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Photo</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    <?php
                    $result = $conn->query("SELECT * FROM team_members ORDER BY member_type, order_number, name");
                    if ($result && $result->num_rows > 0):
                        while ($row = $result->fetch_assoc()):
                    ?>
                    <tr>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <?php if($row['photo']): ?>
                                <img src="../<?php echo htmlspecialchars($row['photo']); ?>" alt="<?php echo htmlspecialchars($row['name']); ?>" class="h-12 w-12 object-cover rounded-full">
                            <?php else: ?>
                                <div class="h-12 w-12 bg-gray-200 rounded-full flex items-center justify-center">
                                    <i class="fas fa-user text-gray-400"></i>
                                </div>
                            <?php endif; ?>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="text-sm font-medium text-gray-900"><?php echo htmlspecialchars($row['name']); ?></div>
                            <?php if($row['email']): ?>
                                <div class="text-sm text-gray-500"><?php echo htmlspecialchars($row['email']); ?></div>
                            <?php endif; ?>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="text-sm text-gray-900"><?php echo htmlspecialchars($row['title']); ?></div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="text-sm text-gray-900"><?php echo htmlspecialchars($row['member_type']); ?></div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full <?php echo $row['status'] == 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'; ?>">
                                <?php echo ucfirst($row['status']); ?>
                            </span>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <a href="team.php?action=edit&id=<?php echo $row['id']; ?>"
                               class="text-primary hover:text-primary-dark mr-3">
                                <i class="fas fa-edit"></i> Edit
                            </a>
                            <button onclick="confirmDelete(<?php echo $row['id']; ?>)"
                                    class="text-red-600 hover:text-red-900">
                                <i class="fas fa-trash"></i> Delete
                            </button>
                        </td>
                    </tr>
                    <?php
                        endwhile;
                    else:
                    ?>
                    <tr>
                        <td colspan="6" class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">No team members found</td>
                    </tr>
                    <?php endif; ?>
                </tbody>
            </table>
        </div>
    </div>
<?php } ?>

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