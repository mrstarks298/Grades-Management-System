$(document).ready(function() {
    function fetchAndDisplayGrades() {
        $.ajax({
            url: "/get_grades",
            type: 'GET',
            success: function(response) {
                var grades = response.data;
                var groupedGrades = groupGradesBySemester(grades);
                displayGroupedGrades(groupedGrades);
                displayRecentRemarks(grades);
            },
            error: function(xhr, status, error) {
                console.error('An error occurred while fetching grades:', error);
                showFlashMessage('error', 'Failed to fetch grades. Please try again.');
            }
        });
    }

    function fetchAndDisplayNotifications() {
        $.ajax({
            url: "/get_notifications",
            type: 'GET',
            success: function(response) {
                displayLatestNotification(response.notification);
            },
            error: function(xhr, status, error) {
                console.error('An error occurred while fetching notifications:', error);
                showFlashMessage('error', 'Failed to fetch notifications. Please try again.');
            }
        });
    }

    function groupGradesBySemester(grades) {
        var grouped = {};
        grades.forEach(function(grade) {
            if (!grouped[grade.semester]) {
                grouped[grade.semester] = [];
            }
            grouped[grade.semester].push(grade);
        });
        return grouped;
    }

    function displayGroupedGrades(groupedGrades) {
        var container = $('#grades-container');
        container.empty();

        Object.keys(groupedGrades).sort().reverse().forEach(function(semester) {
            var button = $('<button class="semester-button"><i class="bx bx-calendar"></i> ' + semester + '</button>');
            button.data('semester', semester);
            container.append(button);
        });
    }

    function displayRecentRemarks(grades) {
        var remarksList = $('#remarks-list');
        remarksList.empty();
    
        var hasRemarks = false;
    
        grades.forEach(function(grade) {
            if (grade.remarks) {
                hasRemarks = true;
                var remarkItem = $('<li class="list-group-item">' +
                    '<strong>' + grade.course_name + ' (' + grade.assessment_type + '):</strong> ' +
                    grade.remarks +
                    '</li>');
                remarksList.append(remarkItem);
            }
        });
    
        if (!hasRemarks) {
            remarksList.append('<li class="list-group-item no-remarks">No remarks available.</li>');
        }
    }

    function displayLatestNotification(notification) {
        var content = $('#latestNotification');
        content.empty();
        
        if (notification) {
            content.html('<div class="notification" data-id="' + notification.id + '">' + notification.message + '</div>');
        } else {
            content.html('<div class="notification">No new notifications</div>');
        }
    }

    $('#grades-container').on('click', '.semester-button', function() {
        var semester = $(this).data('semester');
        window.location.href = "/semester_grades?semester=" + encodeURIComponent(semester);
    });

    // Dark mode toggle
    const darkModeToggle = document.getElementById('darkModeToggle');

    function toggleDarkMode() {
        document.body.classList.toggle('dark-mode');
        const isDarkMode = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDarkMode);
        updateDarkModeIcon(isDarkMode);
    }

    function updateDarkModeIcon(isDarkMode) {
        const icon = darkModeToggle.querySelector('i');
        icon.className = isDarkMode ? 'bx bx-sun' : 'bx bx-moon';
    }

    // Check localStorage for dark mode preference when page loads
    document.addEventListener('DOMContentLoaded', () => {
        const isDarkMode = localStorage.getItem('darkMode') === 'true';
        if (isDarkMode) {
            document.body.classList.add('dark-mode');
        }
        updateDarkModeIcon(isDarkMode);
    });

    darkModeToggle.addEventListener('click', toggleDarkMode);

    $('#notificationToggle').click(function() {
        $('#notificationPanel').toggle();
        if ($('#notificationPanel').is(':visible')) {
            fetchAndDisplayNotifications();
        }
    });

    $('#latestNotification').on('click', '.notification', function() {
        var notificationId = $(this).data('id');
        $.ajax({
            url: "/mark_grade_notified",
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({grade_id: notificationId}),
            success: function(response) {
                if (response.success) {
                    fetchAndDisplayNotifications();
                }
            },
            error: function(xhr, status, error) {
                console.error('Error marking notification as read:', error);
                showFlashMessage('error', 'Failed to mark notification as read. Please try again.');
            }
        });
    });

    function showFlashMessage(type, message) {
        var alertClass = type === 'error' ? 'alert-danger' : 'alert-success';
        var flashMessage = $('<div class="alert ' + alertClass + ' alert-dismissible fade show" role="alert">' +
                             message +
                             '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
                             '<span aria-hidden="true">&times;</span></button></div>');
        $('.container').prepend(flashMessage);
        setTimeout(function() {
            flashMessage.alert('close');
        }, 5000);
    }

    fetchAndDisplayGrades();

    // Periodically check for new notifications only when the panel is visible
    setInterval(function() {
        if ($('#notificationPanel').is(':visible')) {
            fetchAndDisplayNotifications();
        }
    }, 60000); // Check every minute
});