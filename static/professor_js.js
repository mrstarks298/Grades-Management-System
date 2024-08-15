document.addEventListener('DOMContentLoaded', function() {
    // Toggle sidebar
    document.getElementById('sidebarToggle').addEventListener('click', function() {
        var sidebar = document.getElementById('sidebar');
        var content = document.querySelector('.content');
        sidebar.classList.toggle('active');
        content.classList.toggle('active');
        this.classList.toggle('active');
        
        // Toggle the arrow direction
        var arrowIcon = this.querySelector('i');
        if (sidebar.classList.contains('active')) {
            arrowIcon.classList.remove('bx-chevron-left');
            arrowIcon.classList.add('bx-chevron-right');
        } else {
            arrowIcon.classList.remove('bx-chevron-right');
            arrowIcon.classList.add('bx-chevron-left');
        }
    });

    // Toggle dark mode
    document.getElementById('darkModeToggle').addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        if (document.body.classList.contains('dark-mode')) {
            this.innerHTML = '<i class="bx bx-sun"></i>';
        } else {
            this.innerHTML = '<i class="bx bx-moon"></i>';
        }
        
        // Save preference to localStorage
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('darkMode', 'enabled');
        } else {
            localStorage.removeItem('darkMode');
        }
    });

    // Load dark mode preference
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
        document.getElementById('darkModeToggle').innerHTML = '<i class="bx bx-sun"></i>';
    }

    // File upload handling
    document.querySelector('.upload-form').addEventListener('submit', function(e) {
        e.preventDefault();
        var formData = new FormData(this);
        
        fetch('/professor_dashboard', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                showMessage(data.message, 'success');
                location.reload();
            } else {
                showMessage(data.message, 'error');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            showMessage('An error occurred while uploading the file. Please try again.', 'error');
        });
    });

    // Function to display messages (success or error)
    function showMessage(message, type) {
        var messageContainer = document.getElementById('messageContainer');
        var alertClass = type === 'success' ? 'alert-success' : 'alert-danger';
        messageContainer.innerHTML = `<div class="alert ${alertClass}">${message}</div>`;
        messageContainer.style.display = 'block';

        // Hide the message after 5 seconds
        setTimeout(function() {
            messageContainer.style.display = 'none';
        }, 5000);
    }

    // Notification toggle (if you want to implement this feature)
    document.getElementById('notificationToggle').addEventListener('click', function() {
        // Add notification functionality here
        alert('Notifications feature coming soon!');
    });
});

function displayGrades(uploadId) {
    window.location.href = "/display_grades?upload_id=" + encodeURIComponent(uploadId);
}