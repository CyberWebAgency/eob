<?php
// Include header
include("includes/header.php");

// Get stats for dashboard
$stats = [
    'news' => 0,
    'team' => 0,
    'collaborators' => 0,
    'products' => 0
];

// Get news count
$result = $conn->query("SELECT COUNT(*) as count FROM news");
if ($result) {
    $row = $result->fetch_assoc();
    $stats['news'] = $row['count'];
}

// Get team count
$result = $conn->query("SELECT COUNT(*) as count FROM team_members");
if ($result) {
    $row = $result->fetch_assoc();
    $stats['team'] = $row['count'];
}

// Get collaborators count
$result = $conn->query("SELECT COUNT(*) as count FROM collaborators");
if ($result) {
    $row = $result->fetch_assoc();
    $stats['collaborators'] = $row['count'];
}

// Get products count
$result = $conn->query("SELECT COUNT(*) as count FROM products");
if ($result) {
    $row = $result->fetch_assoc();
    $stats['products'] = $row['count'];
}

// Get latest updates
$latest_updates = [];

// Latest news
$result = $conn->query("SELECT id, title, date FROM news ORDER BY date DESC LIMIT 3");
if ($result) {
    while ($row = $result->fetch_assoc()) {
        $latest_updates[] = [
            'type' => 'News',
            'title' => $row['title'],
            'date' => $row['date'],
            'link' => 'news.php?action=edit&id=' . $row['id']
        ];
    }
}
?>

<div class="p-6 space-y-8">
  <!-- Stats Cards -->
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    <div class="bg-white border border-gray-200 rounded-lg shadow-sm p-4 flex flex-col justify-between h-full hover:shadow-md transition-shadow duration-200">
      <div class="flex items-center justify-between">
        <div>
          <h6 class="text-sm font-medium text-gray-600">News / Blogs</h6>
          <p class="mt-2 text-3xl font-semibold text-gray-800"><?php echo $stats['news']; ?></p>
        </div>
        <i class="fas fa-newspaper text-4xl text-primary"></i>
      </div>
      <a href="news.php" class="mt-4 text-sm font-medium text-primary hover:text-primary-dark">Manage News &rarr;</a>
    </div>

    <div class="bg-white border border-gray-200 rounded-lg shadow-sm p-4 flex flex-col justify-between h-full hover:shadow-md transition-shadow duration-200">
      <div class="flex items-center justify-between">
        <div>
          <h6 class="text-sm font-medium text-gray-600">Team Members</h6>
          <p class="mt-2 text-3xl font-semibold text-gray-800"><?php echo $stats['team']; ?></p>
        </div>
        <i class="fas fa-users text-4xl text-green-600"></i>
      </div>
      <a href="team.php" class="mt-4 text-sm font-medium text-green-600 hover:text-green-700">Manage Team &rarr;</a>
    </div>

    <div class="bg-white border border-gray-200 rounded-lg shadow-sm p-4 flex flex-col justify-between h-full hover:shadow-md transition-shadow duration-200">
      <div class="flex items-center justify-between">
        <div>
          <h6 class="text-sm font-medium text-gray-600">Collaborators & Investors</h6>
          <p class="mt-2 text-3xl font-semibold text-gray-800"><?php echo $stats['collaborators']; ?></p>
        </div>
        <i class="fas fa-handshake text-4xl text-indigo-600"></i>
      </div>
      <a href="collaborators.php" class="mt-4 text-sm font-medium text-indigo-600 hover:text-indigo-700">Manage Collaborators &rarr;</a>
    </div>

    <div class="bg-white border border-gray-200 rounded-lg shadow-sm p-4 flex flex-col justify-between h-full hover:shadow-md transition-shadow duration-200">
      <div class="flex items-center justify-between">
        <div>
          <h6 class="text-sm font-medium text-gray-600">Products</h6>
          <p class="mt-2 text-3xl font-semibold text-gray-800"><?php echo $stats['products']; ?></p>
        </div>
        <i class="fas fa-flask text-4xl text-yellow-600"></i>
      </div>
      <a href="products.php" class="mt-4 text-sm font-medium text-yellow-600 hover:text-yellow-700">Manage Products &rarr;</a>
    </div>
  </div>

  <!-- Recent Updates & Quick Actions -->
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <div class="bg-white border border-gray-200 rounded-lg shadow-sm">
      <div class="px-4 py-3 border-b border-gray-200">
        <h5 class="text-lg font-semibold text-gray-800">Recent Updates</h5>
      </div>
      <div class="p-4">
        <?php if (count($latest_updates) > 0): ?>
          <ul class="space-y-4">
            <?php foreach ($latest_updates as $update): ?>
              <li class="flex items-center justify-between">
                <div class="flex items-center space-x-2">
                  <span class="bg-primary bg-opacity-10 text-primary text-xs font-semibold px-2 py-1 rounded"><?php echo $update['type']; ?></span>
                  <a href="<?php echo $update['link']; ?>" class="text-gray-700 hover:text-primary"><?php echo $update['title']; ?></a>
                </div>
                <span class="text-sm text-gray-500">
                  <?php 
                    if (!empty($update['date'])) {
                      echo date('M d, Y', strtotime($update['date']));
                    } else {
                      echo "No date";
                    }
                  ?>
                </span>
              </li>
            <?php endforeach; ?>
          </ul>
        <?php else: ?>
          <p class="text-gray-500">No recent updates found.</p>
        <?php endif; ?>
      </div>
    </div>

    <div class="bg-white border border-gray-200 rounded-lg shadow-sm">
      <div class="px-4 py-3 border-b border-gray-200">
        <h5 class="text-lg font-semibold text-gray-800">Quick Actions</h5>
      </div>
      <div class="p-4 grid grid-cols-2 gap-4">
        <a href="news.php?action=add" class="bg-primary bg-opacity-10 hover:bg-opacity-20 text-primary flex items-center justify-center space-x-2 py-2 rounded transition-colors duration-200">
          <i class="fas fa-plus-circle"></i>
          <span>Add News</span>
        </a>
        <a href="team.php?action=add" class="bg-green-100 hover:bg-green-200 text-green-600 flex items-center justify-center space-x-2 py-2 rounded transition-colors duration-200">
          <i class="fas fa-plus-circle"></i>
          <span>Add Team Member</span>
        </a>
        <a href="collaborators.php?action=add" class="bg-indigo-100 hover:bg-indigo-200 text-indigo-600 flex items-center justify-center space-x-2 py-2 rounded transition-colors duration-200">
          <i class="fas fa-plus-circle"></i>
          <span>Add Collaborator</span>
        </a>
        <a href="products.php?action=add" class="bg-yellow-100 hover:bg-yellow-200 text-yellow-600 flex items-center justify-center space-x-2 py-2 rounded transition-colors duration-200">
          <i class="fas fa-plus-circle"></i>
          <span>Add Product</span>
        </a>
      </div>
    </div>
  </div>
</div>

<?php
// Include footer
include("includes/footer.php");
?>