            </main>
        </div>
    </div>
    
    <!-- Delete confirmation modal -->
    <div id="deleteConfirmModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 hidden overflow-y-auto h-full w-full z-50" role="dialog" aria-labelledby="deleteConfirmModalLabel" aria-hidden="true">
        <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div class="mt-3">
                <div class="flex items-center justify-between border-b pb-3">
                    <h3 class="text-lg font-medium text-gray-900" id="deleteConfirmModalLabel">Confirm Deletion</h3>
                    <button type="button" class="text-gray-400 hover:text-gray-500" onclick="closeModal()">
                        <span class="sr-only">Close</span>
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="mt-4">
                    <p class="text-gray-600">Are you sure you want to delete this item?</p>
                    <p class="text-red-500 text-sm mt-2">This action cannot be undone.</p>
                </div>
                <div class="mt-6 flex justify-end space-x-3">
                    <button type="button" onclick="closeModal()" class="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400">
                        Cancel
                    </button>
                    <a href="#" id="confirmDeleteBtn" class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500">
                        Delete
                    </a>
                </div>
            </div>
        </div>
    </div>
    
    <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
    <script>
        // Modal functions
        function openModal() {
            document.getElementById('deleteConfirmModal').classList.remove('hidden');
        }
        
        function closeModal() {
            document.getElementById('deleteConfirmModal').classList.add('hidden');
        }
        
        // Close modal when clicking outside
        window.onclick = function(event) {
            const modal = document.getElementById('deleteConfirmModal');
            if (event.target === modal) {
                closeModal();
            }
        }

        // Delete confirmation function
        function openDeleteModal(deleteUrl) {
            const confirmBtn = document.getElementById('confirmDeleteBtn');
            confirmBtn.href = deleteUrl;
            openModal();
        }

        // Prevent form resubmission on page refresh
        if (window.history.replaceState) {
            window.history.replaceState(null, null, window.location.href);
        }

        // Set active link in sidebar
        document.addEventListener('DOMContentLoaded', function() {
            const currentPage = window.location.pathname.split('/').pop() || 'index.php';
            const activeLink = document.querySelector(`nav a[href="${currentPage}"]`);
            if (activeLink) {
                activeLink.classList.add('bg-gray-50', 'text-primary');
            }
        });
    </script>
    <script src="assets/js/main.js"></script>
</body>
</html> 