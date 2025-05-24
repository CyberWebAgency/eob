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
$action = $_GET['action'] ?? 'list';

// Handle delete action
if ($action === 'delete' && isset($_GET['id'], $_GET['csrf_token'])) {
    if ($_GET['csrf_token'] !== $_SESSION['csrf_token']) {
        $_SESSION['flash_message'] = '<div class="mb-4 px-4 py-2 rounded bg-red-100 text-red-800">Invalid request.</div>';
        header("Location: news.php");
        exit;
    }
    $id = (int)$_GET['id'];
    $res = $conn->query("SELECT image FROM news WHERE id = $id");
    if ($res && $res->num_rows) {
        $row = $res->fetch_assoc();
        deleteFile($row['image']);
    }
    if ($conn->query("DELETE FROM news WHERE id = $id")) {
        $_SESSION['success'] = "News deleted successfully.";
    } else {
        $_SESSION['error'] = "Error deleting news: " . $conn->error;
    }
    header("Location: news.php");
    exit;
}

// Form processing for add/edit
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    if (!isset($_POST['csrf_token']) || $_POST['csrf_token'] !== $_SESSION['csrf_token']) {
        $_SESSION['flash_message'] = '<div class="mb-4 px-4 py-2 rounded bg-red-100 text-red-800">Invalid request.</div>';
        header("Location: news.php");
        exit;
    }
    $title   = $conn->real_escape_string($_POST['title']);
    
    // Use htmlspecialchars_decode to preserve HTML formatting from TinyMCE
    $content = $conn->real_escape_string($_POST['content']);
    
    $date    = $conn->real_escape_string($_POST['date']);
    $status  = $conn->real_escape_string($_POST['status']);

    if (isset($_POST['add'])) {
        // Upload new image
        $image = handleFileUpload("image", "uploads/news/");
        
        $sql = "INSERT INTO news (title, content, date, image, status) VALUES ('$title','$content','$date','$image','$status')";
        if ($conn->query($sql)) {
            $_SESSION['success'] = "News added successfully.";
        } else {
            $_SESSION['error'] = "Error adding news: " . $conn->error;
        }
        header("Location: news.php");
        exit;
    } elseif (isset($_POST['update'], $_POST['id'])) {
        $id = (int)$_POST['id'];
        
        // Get current image
        $currentImage = '';
        $res = $conn->query("SELECT image FROM news WHERE id = $id");
        if ($res && $res->num_rows) {
            $row = $res->fetch_assoc();
            $currentImage = $row['image'];
        }
        
        // Upload new image if provided, which will automatically delete old one
        $image = handleFileUpload("image", "uploads/news/", $currentImage);
        $imageUpdate = $image ? ", image = '$image'" : "";
        
        $sql = "UPDATE news SET title='$title', content='$content', date='$date', status='$status'$imageUpdate WHERE id = $id";
        if ($conn->query($sql)) {
            $_SESSION['success'] = "News updated successfully.";
        } else {
            $_SESSION['error'] = "Error updating news: " . $conn->error;
        }
        header("Location: news.php");
        exit;
    }
}
?>

<!-- Page Title -->
<script>
    document.getElementById('page-title').textContent = 'News Management';
</script>

<!-- TinyMCE for Rich Text Editing -->
<script src="https://cdn.tiny.cloud/1/ijnnmh8l4u93hgbhhdziap5fv79hwtwk6a6tlab3kzro1rym/tinymce/6/tinymce.min.js" referrerpolicy="origin"></script>
<script>
  tinymce.init({
    selector: 'textarea.rich-text-editor',
    plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss',
    toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
    tinycomments_mode: 'embedded',
    tinycomments_author: 'Author name',
    mergetags_list: [
      { value: 'First.Name', title: 'First Name' },
      { value: 'Email', title: 'Email' },
    ],
    ai_request: (request, respondWith) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
    height: 400,
    promotion: false,
    branding: false,
    menubar: true,
    statusbar: true,
    image_advtab: true,
    convert_urls: false,
    entity_encoding: 'raw',
    extended_valid_elements: 'span[*],img[*],div[*],p[*]',
    content_style: `
      body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'; font-size: 16px; line-height: 1.6; }
      p { margin: 0 0 1em; }
      img { max-width: 100%; height: auto; }
      ul, ol { margin-bottom: 1em; padding-left: 2em; }
      h1, h2, h3, h4, h5, h6 { margin-top: 1.5em; margin-bottom: 0.5em; font-weight: 600; line-height: 1.3; }
      h1 { font-size: 2em; }
      h2 { font-size: 1.75em; }
      h3 { font-size: 1.5em; }
      h4 { font-size: 1.25em; }
      h5 { font-size: 1em; }
      h6 { font-size: 0.875em; }
      blockquote { border-left: 4px solid #ccc; margin-left: 0; padding-left: 1em; }
      table { border-collapse: collapse; width: 100%; }
      th, td { border: 1px solid #ccc; padding: 0.5em; }
      code { background-color: #f5f5f5; padding: 0.2em 0.4em; border-radius: 3px; font-family: monospace; }
    `
  });
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
// Render UI
if ($action === 'add') {
    ?>
    <div class="p-6">
      <div class="bg-white border border-gray-200 p-6 rounded-lg shadow-sm">
        <h2 class="text-2xl font-bold mb-4 text-gray-800">Add News</h2>
        <form action="news.php" method="post" enctype="multipart/form-data" class="space-y-4">
          <input type="hidden" name="csrf_token" value="<?php echo $_SESSION['csrf_token']; ?>">
          <div>
            <label for="title" class="block text-sm font-medium mb-1 text-gray-700">Title <span class="text-red-500">*</span></label>
            <input type="text" id="title" name="title" required class="w-full bg-white text-gray-800 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
          </div>
          <div>
            <label for="content" class="block text-sm font-medium mb-1 text-gray-700">Content <span class="text-red-500">*</span></label>
            <textarea id="content" name="content" rows="6" required class="w-full bg-white text-gray-800 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent rich-text-editor"></textarea>
            <p class="text-gray-500 text-sm mt-1">Use the rich text editor to format your content with headings, lists, links, images, and more.</p>
          </div>
          <div>
            <label for="date" class="block text-sm font-medium mb-1 text-gray-700">Publish Date <span class="text-red-500">*</span></label>
            <input type="date" id="date" name="date" value="<?php echo date('Y-m-d'); ?>" required class="w-full bg-white text-gray-800 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
          </div>
          <div>
            <label for="image" class="block text-sm font-medium mb-1 text-gray-700">Image</label>
            <input type="file" id="image" name="image" data-preview="imagePreview" class="w-full bg-white text-gray-800 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
            <img id="imagePreview" class="mt-2 w-32 h-32 object-cover rounded hidden" alt="Preview">
          </div>
          <div>
            <label for="status" class="block text-sm font-medium mb-1 text-gray-700">Status</label>
            <select id="status" name="status" class="w-full bg-white text-gray-800 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <div class="flex space-x-2">
            <button type="submit" name="add" class="bg-primary text-white font-semibold px-4 py-2 rounded hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">Save News</button>
            <a href="news.php" class="bg-gray-100 text-gray-700 font-semibold px-4 py-2 rounded hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2">Cancel</a>
          </div>
        </form>
      </div>
    </div>
    <?php
} elseif ($action === 'edit' && isset($_GET['id'])) {
    $id = (int)$_GET['id'];
    $res = $conn->query("SELECT * FROM news WHERE id = $id");
    if ($res && $res->num_rows) {
        $news = $res->fetch_assoc();
        ?>
        <div class="p-6">
          <div class="bg-white border border-gray-200 p-6 rounded-lg shadow-sm">
            <h2 class="text-2xl font-bold mb-4 text-gray-800">Edit News</h2>
            <form action="news.php" method="post" enctype="multipart/form-data" class="space-y-4">
              <input type="hidden" name="csrf_token" value="<?php echo $_SESSION['csrf_token']; ?>">
              <input type="hidden" name="id" value="<?php echo $news['id']; ?>">
              <div>
                <label for="title" class="block text-sm font-medium mb-1 text-gray-700">Title <span class="text-red-500">*</span></label>
                <input type="text" id="title" name="title" value="<?php echo htmlspecialchars($news['title']); ?>" required class="w-full bg-white text-gray-800 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
              </div>
              <div>
                <label for="content" class="block text-sm font-medium mb-1 text-gray-700">Content <span class="text-red-500">*</span></label>
                <textarea id="content" name="content" rows="6" required class="w-full bg-white text-gray-800 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent rich-text-editor"><?php echo $news['content']; ?></textarea>
                <p class="text-gray-500 text-sm mt-1">Use the rich text editor to format your content with headings, lists, links, images, and more.</p>
              </div>
              <div>
                <label for="date" class="block text-sm font-medium mb-1 text-gray-700">Publish Date <span class="text-red-500">*</span></label>
                <input type="date" id="date" name="date" value="<?php echo !empty($news['date'])?date('Y-m-d',strtotime($news['date'])):date('Y-m-d'); ?>" required class="w-full bg-white text-gray-800 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
              </div>
              <div>
                <label for="image" class="block text-sm font-medium mb-1 text-gray-700">Image</label>
                <?php if ($news['image']): ?>
                  <div class="mb-2">
                    <img src="../<?php echo $news['image']; ?>" class="w-32 h-32 object-cover rounded" alt="Current Image">
                    <p class="text-gray-500 text-sm">Current image</p>
                  </div>
                <?php endif; ?>
                <input type="file" id="image" name="image" data-preview="imagePreview" class="w-full bg-white text-gray-800 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                <img id="imagePreview" class="mt-2 w-32 h-32 object-cover rounded hidden" alt="Preview">
                <p class="text-gray-500 text-sm">Leave empty to keep current image</p>
              </div>
              <div>
                <label for="status" class="block text-sm font-medium mb-1 text-gray-700">Status</label>
                <select id="status" name="status" class="w-full bg-white text-gray-800 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                  <option value="active" <?php echo $news['status']=='active'?'selected':''; ?>>Active</option>
                  <option value="inactive" <?php echo $news['status']=='inactive'?'selected':''; ?>>Inactive</option>
                </select>
              </div>
              <div class="flex space-x-2">
                <button type="submit" name="update" class="bg-primary text-white font-semibold px-4 py-2 rounded hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">Update News</button>
                <a href="news.php" class="bg-gray-100 text-gray-700 font-semibold px-4 py-2 rounded hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2">Cancel</a>
              </div>
            </form>
          </div>
        </div>
        <?php
    } else {
        echo '<div class="mb-4 px-4 py-2 rounded bg-red-100 text-red-800">News not found.</div>';
    }
} else {
    $result = $conn->query("SELECT * FROM news ORDER BY date DESC");
    ?>
    <div class="p-6">
      <div class="flex justify-between items-center mb-4">
        <h1 class="text-2xl font-bold text-gray-800">News</h1>
        <a href="news.php?action=add" class="inline-flex items-center bg-primary text-white font-semibold px-4 py-2 rounded hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
          <i class="fas fa-plus mr-2"></i> Add News
        </a>
      </div>
      <div class="overflow-x-auto bg-white border border-gray-200 rounded-lg shadow-sm">
        <table class="min-w-full text-sm text-left text-gray-800">
          <thead class="bg-gray-50 text-gray-600 uppercase text-xs">
            <tr>
              <th class="px-6 py-3">Image</th>
              <th class="px-6 py-3">Title</th>
              <th class="px-6 py-3">Date</th>
              <th class="px-6 py-3">Status</th>
              <th class="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <?php if ($result && $result->num_rows): ?>
              <?php while ($row = $result->fetch_assoc()): ?>
                <tr class="hover:bg-gray-50">
                  <td class="px-6 py-4">
                    <?php if ($row['image']): ?>
                      <img src="../<?php echo $row['image']; ?>" class="w-12 h-12 object-cover rounded" alt="News Image">
                    <?php else: ?>
                      <span class="text-gray-500">No image</span>
                    <?php endif; ?>
                  </td>
                  <td class="px-6 py-4"><?php echo htmlspecialchars($row['title']); ?></td>
                  <td class="px-6 py-4">
                    <?php if ($row['date']): echo date('M d, Y', strtotime($row['date'])); else: ?>
                      <span class="text-gray-500">No date</span>
                    <?php endif; ?>
                  </td>
                  <td class="px-6 py-4">
                    <?php if ($row['status'] === 'active'): ?>
                      <span class="inline-block px-2 py-1 text-xs font-medium rounded bg-green-100 text-green-800">Active</span>
                    <?php else: ?>
                      <span class="inline-block px-2 py-1 text-xs font-medium rounded bg-gray-100 text-gray-600">Inactive</span>
                    <?php endif; ?>
                  </td>
                  <td class="px-6 py-4 flex space-x-2">
                    <a href="news.php?action=edit&id=<?php echo $row['id']; ?>" class="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                      <i class="fas fa-edit"></i>
                    </a>
                    <button onclick="confirmDelete(<?php echo $row['id']; ?>)" class="inline-flex items-center px-2 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
                      <i class="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              <?php endwhile; ?>
            <?php else: ?>
              <tr>
                <td colspan="6" class="px-6 py-4 text-center text-gray-500">No news articles found.</td>
              </tr>
            <?php endif; ?>
          </tbody>
        </table>
      </div>
    </div>
    <?php
}
?>

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