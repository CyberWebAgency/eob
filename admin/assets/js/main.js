/**
 * Main JavaScript functionality for EOB Admin Panel
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize any components that need JavaScript functionality
    console.log('Admin panel JS initialized');
    
    // Helper for handling AJAX requests
    window.makeAjaxRequest = function(url, method, data, callback) {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    callback(null, JSON.parse(xhr.responseText));
                } else {
                    callback(new Error('Request failed with status: ' + xhr.status));
                }
            }
        };
        xhr.send(JSON.stringify(data));
    };
});

// Additional initialization code can be added here 