// ==================== //
// WINDOWS POPUP SCRIPT //
// ==================== //

document.addEventListener('DOMContentLoaded', function () {
    // ==================== //
    // THEME TOGGLE         //
    // ==================== //

    const themeBtn = document.getElementById('themeBtn');
    const body = document.body;
    const themeIcon = themeBtn.querySelector('i');
    const themeText = themeBtn.querySelector('span');

    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';

    // Apply the saved theme on page load
    if (currentTheme === 'dark') {
        body.classList.add('dark-mode');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
        themeText.textContent = 'Light Mode';
    }

    // Theme toggle function
    function toggleTheme() {
        body.classList.toggle('dark-mode');

        if (body.classList.contains('dark-mode')) {
            // Switch to dark mode
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            themeText.textContent = 'Light Mode';
            localStorage.setItem('theme', 'dark');
            updatePopupTheme('dark');
        } else {
            // Switch to light mode
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            themeText.textContent = 'Dark Mode';
            localStorage.setItem('theme', 'light');
            updatePopupTheme('light');
        }
    }

    // Update popup theme icon
    function updatePopupTheme(theme) {
        const popupThemeToggle = document.getElementById('popupThemeToggle');
        if (popupThemeToggle) {
            const popupIcon = popupThemeToggle.querySelector('i');
            if (theme === 'dark') {
                popupIcon.classList.remove('fa-moon');
                popupIcon.classList.add('fa-sun');
            } else {
                popupIcon.classList.remove('fa-sun');
                popupIcon.classList.add('fa-moon');
            }
        }
    }

    // Initialize popup theme on load
    updatePopupTheme(currentTheme);

    // Main theme button click
    themeBtn.addEventListener('click', toggleTheme);

    // Popup theme button click
    const popupThemeToggle = document.getElementById('popupThemeToggle');
    if (popupThemeToggle) {
        popupThemeToggle.addEventListener('click', function (e) {
            e.stopPropagation();
            toggleTheme();
        });
    }

    // ==================== //
    // POPUP FUNCTIONALITY  //
    // ==================== //

    // Get elements
    const windowsStartBtn = document.getElementById('windowsStartBtn');
    const userProfileBtn = document.getElementById('userProfileBtn');
    const popupOverlay = document.getElementById('popupOverlay');
    const windowsPopup = document.getElementById('windowsPopup');
    const popupCloseBtn = document.getElementById('popupCloseBtn');

    // Toggle popup function
    function togglePopup() {
        const isActive = windowsPopup.classList.contains('active');

        if (isActive) {
            closePopup();
        } else {
            openPopup();
        }
    }

    // Open popup function
    function openPopup() {
        windowsPopup.classList.add('active');
        popupOverlay.classList.add('active');
        if (windowsStartBtn) {
            windowsStartBtn.classList.add('active');
        }
        document.body.style.overflow = 'hidden';
    }

    // Close popup function
    function closePopup() {
        windowsPopup.classList.remove('active');
        popupOverlay.classList.remove('active');
        if (windowsStartBtn) {
            windowsStartBtn.classList.remove('active');
        }
        document.body.style.overflow = '';
    }

    // Event listeners
    if (windowsStartBtn) {
        windowsStartBtn.addEventListener('click', togglePopup);
    }

    if (userProfileBtn) {
        userProfileBtn.addEventListener('click', togglePopup);
    }

    if (popupCloseBtn) {
        popupCloseBtn.addEventListener('click', closePopup);
    }

    if (popupOverlay) {
        popupOverlay.addEventListener('click', closePopup);
    }

    // Close on escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && windowsPopup.classList.contains('active')) {
            closePopup();
        }
    });

    // Handle pinned item clicks
    const pinnedItems = document.querySelectorAll('.pinned-item');
    pinnedItems.forEach(item => {
        item.addEventListener('click', function () {
            const itemName = this.querySelector('.item-name').textContent;
            console.log(`Clicked on: ${itemName}`);
            // Add your navigation logic here

            // Example: Navigate based on item
            switch (itemName) {
                case 'Profile':
                    // window.location.href = 'profile.html';
                    alert('Navigate to Profile');
                    break;
                case 'Settings':
                    window.location.href = 'Settings.html';
                    break;
                case 'Mail':
                    alert('Navigate to Mail');
                    break;
                case 'Files':
                    alert('Navigate to Files');
                    break;
                case 'Browser':
                    alert('Open Browser');
                    break;
                case 'Design':
                    alert('Navigate to Design Tools');
                    break;
            }
        });
    });

    // Handle action button clicks
    const actionBtns = document.querySelectorAll('.action-btn');
    actionBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const actionText = this.textContent.trim();
            console.log(`Action clicked: ${actionText}`);

            // Add your action logic here
            switch (actionText) {
                case 'Account':
                    alert('Navigate to Account Settings');
                    break;
                case 'Lock':
                    if (confirm('Are you sure you want to lock the screen?')) {
                        alert('Screen locked');
                        closePopup();
                    }
                    break;
                case 'Sign out':
                    if (confirm('Are you sure you want to sign out?')) {
                        alert('Signing out...');
                        // window.location.href = 'login.html';
                    }
                    break;
                case 'Shut down':
                    if (confirm('Are you sure you want to shut down?')) {
                        alert('Shutting down...');
                        // Add shutdown logic
                    }
                    break;
            }
        });
    });

    // Handle recommended item click
    const recommendedItem = document.querySelector('.recommended-item');
    if (recommendedItem) {
        recommendedItem.addEventListener('click', function () {
            alert('Opening Quarterly Report...');
            // Add navigation logic
        });
    }

    // Add hover effect to earnings
    const earningItems = document.querySelectorAll('.earning-item');
    earningItems.forEach((item, index) => {
        item.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-3px)';
            this.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.3)';
        });

        item.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });

        // Add click to show details
        item.addEventListener('click', function () {
            const amount = this.textContent;
            const monthsAgo = earningItems.length - index;
            alert(`Earnings ${monthsAgo} month(s) ago: ${amount}`);
        });
    });

    // Prevent popup from closing when clicking inside it
    windowsPopup.addEventListener('click', function (e) {
        e.stopPropagation();
    });

    // Add smooth scroll for popup if content is long
    windowsPopup.addEventListener('scroll', function () {
        if (this.scrollTop > 50) {
            this.style.boxShadow = '0 -4px 12px rgba(0, 0, 0, 0.1), 0 20px 60px rgba(0, 0, 0, 0.3)';
        } else {
            this.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.3)';
        }
    });
});

// Additional utility functions

// Update user info dynamically
function updateUserInfo(name, role, avatar) {
    // Update popup header
    const popupAvatar = document.querySelector('.popup-user-avatar');
    const popupName = document.querySelector('.popup-user-info h3');
    const popupRole = document.querySelector('.user-role');

    if (popupAvatar) popupAvatar.textContent = avatar;
    if (popupName) popupName.textContent = name;
    if (popupRole) popupRole.textContent = role;

    // Update sidebar button
    const sidebarAvatar = document.querySelector('.user-avatar-small');
    const sidebarName = document.querySelector('.user-name-small');

    if (sidebarAvatar) sidebarAvatar.textContent = avatar;
    if (sidebarName) sidebarName.textContent = name;

    // Update header button
    const headerAvatar = document.querySelector('.user-avatar');
    if (headerAvatar) headerAvatar.textContent = avatar;
}

// Update earnings data
function updateEarnings(earningsArray) {
    const earningsList = document.querySelector('.earnings-list');
    const currentAmount = document.querySelector('.current-month .amount');

    if (earningsArray && earningsArray.length > 0) {
        // Update current month
        if (currentAmount) {
            currentAmount.textContent = `$${earningsArray[0].toLocaleString()}`;
        }

        // Update earnings list
        if (earningsList) {
            earningsList.innerHTML = '';
            earningsArray.slice(1).forEach(amount => {
                const item = document.createElement('div');
                item.className = 'earning-item';
                item.textContent = `$${amount.toLocaleString()}`;
                earningsList.appendChild(item);
            });
        }
    }
}

// Example usage:
// updateUserInfo('Jane Smith', 'Manager', 'JS');
// updateEarnings([22000, 20000, 18000, 16000, 15000, 14000, 12000, 10000, 9000, 8000]);

console.log('Windows Popup initialized successfully! 🚀');