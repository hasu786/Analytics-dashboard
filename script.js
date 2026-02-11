// Dashboard Application
document.addEventListener('DOMContentLoaded', function () {
    // Initialize all dashboard components
    initThemeToggle();
    initCharts();
    initTable();
    initCountryMap();
    initFilters();
    initExport();
    initRealTimeUpdates();

    // Simulate real-time updates
    simulateLiveData();
});

// Theme Toggle
function initThemeToggle() {
    const themeBtn = document.getElementById('themeBtn');
    const themeIcon = themeBtn.querySelector('i');
    const themeText = themeBtn.querySelector('span');

    // Check for saved theme or prefer-color-scheme
    const savedTheme = localStorage.getItem('dashboardTheme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.body.classList.add('dark-theme');
        themeIcon.className = 'fas fa-sun';
        themeText.textContent = 'Light Mode';
    }

    themeBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');

        if (document.body.classList.contains('dark-theme')) {
            themeIcon.className = 'fas fa-sun';
            themeText.textContent = 'Light Mode';
            localStorage.setItem('dashboardTheme', 'dark');
        } else {
            themeIcon.className = 'fas fa-moon';
            themeText.textContent = 'Dark Mode';
            localStorage.setItem('dashboardTheme', 'light');
        }
    });
}

// Initialize Charts
function initCharts() {
    initSalesChart();
    initProductsChart();
}

// Sales Chart
function initSalesChart() {
    const ctx = document.getElementById('salesChart').getContext('2d');

    // Chart data
    const data = {
        labels: mockData.salesData.labels,
        datasets: [{
            label: 'Revenue',
            data: mockData.salesData.revenue,
            borderColor: '#6366f1',
            backgroundColor: 'rgba(99, 102, 241, 0.1)',
            borderWidth: 2,
            fill: true,
            tension: 0.4
        }]
    };

    // Create chart
    window.salesChart = new Chart(ctx, {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    callbacks: {
                        label: function (context) {
                            return `$${context.parsed.y.toLocaleString()}`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    },
                    ticks: {
                        callback: function (value) {
                            return '$' + value.toLocaleString();
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });

    // Chart type toggle
    document.querySelectorAll('.chart-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            // Update active button
            document.querySelectorAll('.chart-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            // Update chart data
            const type = this.dataset.type;
            let newData = [];
            let label = '';

            switch (type) {
                case 'revenue':
                    newData = mockData.salesData.revenue;
                    label = 'Revenue';
                    break;
                case 'orders':
                    newData = mockData.salesData.orders;
                    label = 'Orders';
                    break;
                case 'profit':
                    newData = mockData.salesData.profit;
                    label = 'Profit';
                    break;
            }

            window.salesChart.data.datasets[0].data = newData;
            window.salesChart.data.datasets[0].label = label;
            window.salesChart.update();
        });
    });
}

// Products Chart
function initProductsChart() {
    const ctx = document.getElementById('productsChart').getContext('2d');

    // Chart data
    const data = {
        labels: mockData.productsData.labels,
        datasets: [{
            label: 'Revenue',
            data: mockData.productsData.revenue,
            backgroundColor: [
                'rgba(99, 102, 241, 0.8)',
                'rgba(16, 185, 129, 0.8)',
                'rgba(245, 158, 11, 0.8)',
                'rgba(239, 68, 68, 0.8)',
                'rgba(139, 92, 246, 0.8)'
            ],
            borderColor: [
                '#6366f1',
                '#10b981',
                '#f59e0b',
                '#ef4444',
                '#8b5cf6'
            ],
            borderWidth: 1
        }]
    };

    // Create chart
    window.productsChart = new Chart(ctx, {
        type: 'bar',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            return `$${context.parsed.y.toLocaleString()}`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    },
                    ticks: {
                        callback: function (value) {
                            return '$' + value.toLocaleString();
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });

    // Filter change
    document.getElementById('productFilter').addEventListener('change', function () {
        const filter = this.value;
        let newData = [];
        let label = '';

        if (filter === 'revenue') {
            newData = mockData.productsData.revenue;
            label = 'Revenue';
        } else {
            newData = mockData.productsData.units;
            label = 'Units Sold';
        }

        window.productsChart.data.datasets[0].data = newData;
        window.productsChart.data.datasets[0].label = label;

        // Update tooltip callback
        window.productsChart.options.plugins.tooltip.callbacks.label = function (context) {
            if (filter === 'revenue') {
                return `$${context.parsed.y.toLocaleString()}`;
            } else {
                return `${context.parsed.y.toLocaleString()} units`;
            }
        };

        window.productsChart.update();
    });
}

// Initialize Orders Table
function initTable() {
    const tableBody = document.querySelector('#ordersTable tbody');

    mockData.ordersData.forEach(order => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${order.id}</td>
            <td>${order.customer}</td>
            <td>${formatDate(order.date)}</td>
            <td><strong>${order.amount}</strong></td>
            <td><span class="status ${order.status}">${order.status.charAt(0).toUpperCase() + order.status.slice(1)}</span></td>
        `;

        tableBody.appendChild(row);
    });
}

// Format date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Initialize Country Map Visualization
function initCountryMap() {
    const countryList = document.getElementById('countryList');

    mockData.countriesData.forEach(country => {
        const item = document.createElement('div');
        item.className = 'country-item';

        item.innerHTML = `
            <div class="country-name">
                <span class="country-dot ${country.level}"></span>
                <span>${country.name}</span>
            </div>
            <div class="country-stats">
                <span class="country-users">${country.users.toLocaleString()}</span>
                <span class="country-growth ${country.growth >= 5 ? 'positive' : 'negative'}">
                    ${country.growth >= 0 ? '+' : ''}${country.growth}%
                </span>
            </div>
        `;

        countryList.appendChild(item);
    });

    // Simple SVG map (simplified)
    const svg = document.getElementById('worldMap');

    // Create simple circles for demo
    const positions = [
        { x: 150, y: 100, country: 'USA' },
        { x: 250, y: 90, country: 'Canada' },
        { x: 400, y: 120, country: 'UK' },
        { x: 450, y: 130, country: 'Germany' },
        { x: 420, y: 150, country: 'France' },
        { x: 650, y: 180, country: 'Japan' },
        { x: 550, y: 250, country: 'India' },
        { x: 600, y: 220, country: 'China' },
        { x: 300, y: 250, country: 'Brazil' },
        { x: 650, y: 300, country: 'Australia' }
    ];

    positions.forEach(pos => {
        const country = mockData.countriesData.find(c => c.name === pos.country);
        if (country) {
            const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle.setAttribute('cx', pos.x);
            circle.setAttribute('cy', pos.y);

            // Size based on users
            const radius = Math.max(5, Math.min(20, country.users / 100));
            circle.setAttribute('r', radius);

            // Color based on level
            let color = '#10b981'; // high
            if (country.level === 'medium') color = '#f59e0b';
            if (country.level === 'low') color = '#ef4444';

            circle.setAttribute('fill', color);
            circle.setAttribute('opacity', '0.7');
            circle.setAttribute('stroke', 'white');
            circle.setAttribute('stroke-width', '1');

            // Add hover effect
            circle.style.cursor = 'pointer';
            circle.addEventListener('mouseenter', () => {
                circle.setAttribute('opacity', '1');
                circle.setAttribute('r', radius + 2);
            });
            circle.addEventListener('mouseleave', () => {
                circle.setAttribute('opacity', '0.7');
                circle.setAttribute('r', radius);
            });

            svg.appendChild(circle);

            // Add country label
            const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.setAttribute('x', pos.x);
            text.setAttribute('y', pos.y - radius - 5);
            text.setAttribute('text-anchor', 'middle');
            text.setAttribute('font-size', '10');
            text.setAttribute('fill', 'var(--text-primary)');
            text.textContent = country.name;
            svg.appendChild(text);
        }
    });
}

// Initialize Filters
function initFilters() {
    const dateRange = document.getElementById('dateRange');

    dateRange.addEventListener('change', function () {
        // In a real app, this would fetch new data
        console.log('Date range changed to:', this.value);

        // Simulate loading
        simulateLoading();

        // Update KPI values with slight variation
        updateKPIValues();
    });
}

// Update KPI values with random variation
function updateKPIValues() {
    const kpis = ['revenue', 'orders', 'users', 'conversion'];

    kpis.forEach(kpi => {
        const element = document.getElementById(`${kpi}Value`);
        const current = mockData.kpiData[kpi].value;

        // Add small random variation (±2%)
        const variation = (Math.random() * 4 - 2) / 100;
        const newValue = current * (1 + variation);

        // Format based on type
        let formattedValue;
        if (kpi === 'revenue') {
            formattedValue = formatCurrency(newValue);
        } else if (kpi === 'conversion') {
            formattedValue = newValue.toFixed(1) + '%';
        } else {
            formattedValue = Math.round(newValue).toLocaleString();
        }

        // Animate the change
        animateValueChange(element, formattedValue);
    });
}

// Animate value change
function animateValueChange(element, newValue) {
    element.style.transform = 'scale(1.1)';
    element.style.color = '#10b981';

    setTimeout(() => {
        element.textContent = newValue;
        element.style.transform = 'scale(1)';

        setTimeout(() => {
            element.style.color = '';
        }, 500);
    }, 300);
}

// Initialize Export Functionality
function initExport() {
    const exportBtn = document.getElementById('exportBtn');

    exportBtn.addEventListener('click', function () {
        // Create export options dropdown
        const dropdown = document.createElement('div');
        dropdown.className = 'export-dropdown';
        dropdown.innerHTML = `
            <div class="export-option" data-format="png">
                <i class="fas fa-image"></i>
                Download as PNG
            </div>
            <div class="export-option" data-format="csv">
                <i class="fas fa-file-csv"></i>
                Export CSV
            </div>
            <div class="export-option" data-format="pdf">
                <i class="fas fa-file-pdf"></i>
                Generate PDF
            </div>
        `;

        // Style dropdown
        dropdown.style.position = 'absolute';
        dropdown.style.background = 'var(--bg-secondary)';
        dropdown.style.border = '1px solid var(--border-color)';
        dropdown.style.borderRadius = 'var(--radius)';
        dropdown.style.padding = '0.5rem';
        dropdown.style.boxShadow = 'var(--shadow-lg)';
        dropdown.style.zIndex = '1000';
        dropdown.style.marginTop = '0.5rem';

        // Position dropdown
        const rect = exportBtn.getBoundingClientRect();
        dropdown.style.left = `${rect.left}px`;
        dropdown.style.top = `${rect.bottom}px`;

        document.body.appendChild(dropdown);

        // Handle export options
        dropdown.querySelectorAll('.export-option').forEach(option => {
            option.addEventListener('click', function () {
                const format = this.dataset.format;
                handleExport(format);
                document.body.removeChild(dropdown);
            });
        });

        // Close dropdown when clicking outside
        setTimeout(() => {
            const closeHandler = (e) => {
                if (!dropdown.contains(e.target) && e.target !== exportBtn) {
                    document.body.removeChild(dropdown);
                    document.removeEventListener('click', closeHandler);
                }
            };
            document.addEventListener('click', closeHandler);
        }, 0);
    });
}

// Handle export
function handleExport(format) {
    // Show loading
    const originalText = exportBtn.innerHTML;
    exportBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Exporting...';
    exportBtn.disabled = true;

    setTimeout(() => {
        // Simulate export process
        alert(`${format.toUpperCase()} export started! In a real app, this would download the file.`);

        // Reset button
        exportBtn.innerHTML = originalText;
        exportBtn.disabled = false;
    }, 1000);
}

// Simulate loading
function simulateLoading() {
    const charts = [window.salesChart, window.productsChart];

    charts.forEach(chart => {
        if (chart) {
            const originalOpacity = chart.canvas.style.opacity;
            chart.canvas.style.opacity = '0.5';

            setTimeout(() => {
                chart.canvas.style.opacity = originalOpacity;
            }, 500);
        }
    });
}

// Initialize Real-time Updates
function initRealTimeUpdates() {
    // Simulate real-time updates every 10 seconds
    setInterval(() => {
        updateLiveMetrics();
    }, 10000);
}

// Update live metrics
function updateLiveMetrics() {
    // Update KPI cards with small random changes
    const changes = [
        { id: 'revenueValue', min: 100, max: 500 },
        { id: 'ordersValue', min: 1, max: 10 },
        { id: 'usersValue', min: 5, max: 20 },
        { id: 'conversionValue', isPercent: true }
    ];

    changes.forEach(change => {
        const element = document.getElementById(change.id);
        if (element) {
            const currentText = element.textContent;
            let currentValue;

            if (change.isPercent) {
                currentValue = parseFloat(currentText);
                const variation = (Math.random() * 0.4 - 0.2); // ±0.2%
                const newValue = Math.max(0, currentValue + variation);
                element.textContent = newValue.toFixed(1) + '%';
            } else {
                currentValue = parseInt(currentText.replace(/[^0-9]/g, ''));
                const variation = getRandomValue(change.min, change.max);
                const newValue = currentValue + variation;

                if (change.id === 'revenueValue') {
                    element.textContent = formatCurrency(newValue);
                } else {
                    element.textContent = newValue.toLocaleString();
                }
            }

            // Flash animation
            element.classList.add('updated');
            setTimeout(() => element.classList.remove('updated'), 1000);
        }
    });

    // Add notification
    addNotification('Data updated', 'Dashboard metrics have been refreshed.');
}
// In your dashboard JavaScript
function showAlert(type, title, message) {
    // Store alert in localStorage
    const alerts = JSON.parse(localStorage.getItem('alertsData') || '[]');
    alerts.unshift({
        id: alerts.length + 1,
        type: type,
        message: message,
        time: 'Just now',
        read: false,
        badge: type
    });
    localStorage.setItem('alertsData', JSON.stringify(alerts));

    // Show toast notification
    alert(`${type.toUpperCase()}: ${title} - ${message}`);
}

// Add notification
function addNotification(title, message) {
    const notificationBtn = document.querySelector('.notification-btn');
    const badge = notificationBtn.querySelector('.notification-badge');

    // Update badge
    const currentCount = parseInt(badge.textContent);
    badge.textContent = currentCount + 1;

    // Create notification toast
    const toast = document.createElement('div');
    toast.className = 'notification-toast';
    toast.innerHTML = `
        <div class="toast-header">
            <i class="fas fa-info-circle"></i>
            <strong>${title}</strong>
            <button class="toast-close">&times;</button>
        </div>
        <div class="toast-body">${message}</div>
    `;

    // Style toast
    toast.style.position = 'fixed';
    toast.style.top = '20px';
    toast.style.right = '20px';
    toast.style.background = 'var(--bg-secondary)';
    toast.style.border = '1px solid var(--border-color)';
    toast.style.borderRadius = 'var(--radius)';
    toast.style.padding = '1rem';
    toast.style.boxShadow = 'var(--shadow-lg)';
    toast.style.zIndex = '10000';
    toast.style.maxWidth = '300px';

    document.body.appendChild(toast);

    // Close button
    toast.querySelector('.toast-close').addEventListener('click', () => {
        document.body.removeChild(toast);
    });

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (document.body.contains(toast)) {
            document.body.removeChild(toast);
        }
    }, 5000);
}

// Simulate live data updates
function simulateLiveData() {
    // Randomly update chart data every 30 seconds
    setInterval(() => {
        if (window.salesChart) {
            const lastValue = mockData.salesData.revenue[mockData.salesData.revenue.length - 1];
            const newValue = lastValue + getRandomValue(-500, 1000);
            mockData.salesData.revenue[mockData.salesData.revenue.length - 1] = newValue;

            window.salesChart.data.datasets[0].data = mockData.salesData.revenue;
            window.salesChart.update('none');
        }
    }, 30000);
}
// ===== NOTIFICATION SYSTEM =====

// Sample notification data
const notificationData = {
    notifications: [
        {
            id: 1,
            type: 'info',
            title: 'System Update',
            message: 'Scheduled maintenance tonight from 2:00 AM to 4:00 AM',
            time: '2 hours ago',
            read: false,
            badge: 'info'
        },
        {
            id: 2,
            type: 'success',
            title: 'New User Signup',
            message: 'John Doe has registered for a premium account',
            time: '4 hours ago',
            read: false,
            badge: 'success'
        },
        {
            id: 3,
            type: 'warning',
            title: 'Storage Alert',
            message: 'Your storage is at 85% capacity. Consider upgrading your plan.',
            time: '1 day ago',
            read: false,
            badge: 'warning'
        },
        {
            id: 4,
            type: 'error',
            title: 'API Connection',
            message: 'Payment gateway connection timeout. Please check your API keys.',
            time: '2 days ago',
            read: true,
            badge: 'error'
        },
        {
            id: 5,
            type: 'success',
            title: 'Backup Completed',
            message: 'Daily backup completed successfully at 3:00 AM',
            time: '3 days ago',
            read: true,
            badge: 'success'
        }
    ]
};

// Load notifications from localStorage or use sample data
function loadNotifications() {
    const saved = localStorage.getItem('dashboardNotifications');
    if (saved) {
        return JSON.parse(saved);
    }
    return notificationData.notifications;
}

// Save notifications to localStorage
function saveNotifications(notifications) {
    localStorage.setItem('dashboardNotifications', JSON.stringify(notifications));
}

// Update notification badge count
function updateNotificationBadge() {
    const notifications = loadNotifications();
    const unreadCount = notifications.filter(n => !n.read).length;
    const badge = document.getElementById('notificationCount');

    if (badge) {
        badge.textContent = unreadCount;
        badge.style.display = unreadCount > 0 ? 'flex' : 'none';
    }
}

// Render notifications in dropdown
function renderNotifications() {
    const notifications = loadNotifications();
    const container = document.getElementById('notificationList');

    if (!container) return;

    if (notifications.length === 0) {
        container.innerHTML = `
            <div class="notification-empty">
                <i class="fas fa-bell-slash"></i>
                <p>No new notifications</p>
            </div>
        `;
        return;
    }

    container.innerHTML = '';

    notifications.slice(0, 5).forEach(notification => {
        const notificationEl = document.createElement('div');
        notificationEl.className = `notification-item ${notification.read ? '' : 'unread'}`;
        notificationEl.onclick = () => markAsRead(notification.id);

        let iconClass = 'info';
        let icon = 'ℹ️';

        switch (notification.type) {
            case 'success':
                iconClass = 'success';
                icon = '✅';
                break;
            case 'warning':
                iconClass = 'warning';
                icon = '⚠️';
                break;
            case 'error':
                iconClass = 'error';
                icon = '🚨';
                break;
        }

        notificationEl.innerHTML = `
            <div class="notification-icon ${iconClass}">
                <i class="fas fa-${notification.type === 'info' ? 'info-circle' :
                notification.type === 'success' ? 'check-circle' :
                    notification.type === 'warning' ? 'exclamation-triangle' :
                        'exclamation-circle'}"></i>
            </div>
            <div class="notification-content">
                <div class="notification-title">
                    <span class="notification-badge-type badge-${notification.badge}">
                        ${notification.badge}
                    </span>
                    ${notification.title}
                </div>
                <div class="notification-message">${notification.message}</div>
                <div class="notification-time">${notification.time}</div>
            </div>
        `;

        container.appendChild(notificationEl);
    });
}

// Mark notification as read
function markAsRead(id) {
    const notifications = loadNotifications();
    const index = notifications.findIndex(n => n.id === id);

    if (index !== -1 && !notifications[index].read) {
        notifications[index].read = true;
        saveNotifications(notifications);
        renderNotifications();
        updateNotificationBadge();

        // Show toast notification
        showToast(`Notification marked as read`);
    }
}

// Mark all notifications as read
function markAllNotificationsAsRead() {
    const notifications = loadNotifications();
    let changed = false;

    notifications.forEach(notification => {
        if (!notification.read) {
            notification.read = true;
            changed = true;
        }
    });

    if (changed) {
        saveNotifications(notifications);
        renderNotifications();
        updateNotificationBadge();
        showToast('All notifications marked as read');
    }
}

// Toggle notification panel
function toggleNotificationPanel() {
    const panel = document.getElementById('notificationPanel');
    panel.classList.toggle('show');

    if (panel.classList.contains('show')) {
        renderNotifications();
    }
}

// Close notification panel when clicking outside
document.addEventListener('click', function (event) {
    const panel = document.getElementById('notificationPanel');
    const toggleBtn = document.getElementById('notificationToggle');

    if (panel && panel.classList.contains('show') &&
        !panel.contains(event.target) &&
        !toggleBtn.contains(event.target)) {
        panel.classList.remove('show');
    }
});

// Show toast notification
function showToast(message, type = 'info') {
    // Create toast container if it doesn't exist
    let toastContainer = document.getElementById('toastContainer');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'toastContainer';
        toastContainer.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 9999;
        `;
        document.body.appendChild(toastContainer);
    }

    const toastId = 'toast-' + Date.now();
    const toast = document.createElement('div');
    toast.id = toastId;
    toast.className = `toast toast-${type}`;
    toast.style.cssText = `
        background: var(--card-bg);
        color: var(--text-color);
        padding: 12px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.15);
        margin-bottom: 10px;
        border-left: 4px solid var(--primary-color);
        transform: translateX(100%);
        opacity: 0;
        transition: transform 0.3s ease, opacity 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
    `;

    // Set border color based on type
    const typeColors = {
        info: '#3b82f6',
        success: '#22c55e',
        warning: '#f59e0b',
        error: '#ef4444'
    };
    toast.style.borderLeftColor = typeColors[type] || typeColors.info;

    toast.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
            <i class="fas fa-${type === 'info' ? 'info-circle' :
            type === 'success' ? 'check-circle' :
                type === 'warning' ? 'exclamation-triangle' : 'exclamation-circle'}"
               style="color: ${typeColors[type] || typeColors.info}"></i>
            <span style="font-size: 14px;">${message}</span>
        </div>
    `;

    toastContainer.appendChild(toast);

    // Animate in
    setTimeout(() => {
        toast.style.transform = 'translateX(0)';
        toast.style.opacity = '1';
    }, 10);

    // Auto remove after 3 seconds
    setTimeout(() => {
        toast.style.transform = 'translateX(100%)';
        toast.style.opacity = '0';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 3000);
}

// Simulate receiving new notifications
function simulateNewNotification() {
    const notifications = loadNotifications();
    const types = ['info', 'success', 'warning'];
    const titles = [
        'New Data Available',
        'Report Generated',
        'System Alert',
        'Performance Update',
        'Security Notice'
    ];
    const messages = [
        'New analytics data has been processed and is ready for review.',
        'Monthly sales report has been generated successfully.',
        'Unusual activity detected in user login patterns.',
        'System performance optimized after latest update.',
        'Security patches have been applied to the system.'
    ];

    const newNotification = {
        id: notifications.length > 0 ? Math.max(...notifications.map(n => n.id)) + 1 : 1,
        type: types[Math.floor(Math.random() * types.length)],
        title: titles[Math.floor(Math.random() * titles.length)],
        message: messages[Math.floor(Math.random() * messages.length)],
        time: 'Just now',
        read: false,
        badge: 'info'
    };

    notifications.unshift(newNotification);
    saveNotifications(notifications);

    // Update UI if panel is open
    if (document.getElementById('notificationPanel').classList.contains('show')) {
        renderNotifications();
    }

    updateNotificationBadge();

    // Show toast for new notification
    showToast(newNotification.title, newNotification.type);
}

// Initialize notification system
function initNotificationSystem() {
    // Load initial notifications
    updateNotificationBadge();

    // Set up event listeners
    const toggleBtn = document.getElementById('notificationToggle');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', toggleNotificationPanel);
    }

    // Simulate receiving new notifications every 2 minutes
    setInterval(() => {
        if (Math.random() > 0.7) { // 30% chance
            simulateNewNotification();
        }
    }, 120000); // 2 minutes
}

// ===== INTEGRATION WITH YOUR EXISTING CODE =====

// Update your existing DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', function () {
    // Your existing initialization code...

    // Initialize notification system
    initNotificationSystem();

    // Your existing chart initialization code...
});

// Export to PDF function (connect with export button)
document.getElementById('exportBtn')?.addEventListener('click', function () {
    // Your existing export functionality...

    // Add notification for export completion
    const notifications = loadNotifications();
    const exportNotification = {
        id: notifications.length > 0 ? Math.max(...notifications.map(n => n.id)) + 1 : 1,
        type: 'success',
        title: 'Export Completed',
        message: 'Dashboard data has been exported successfully.',
        time: 'Just now',
        read: false,
        badge: 'success'
    };

    notifications.unshift(exportNotification);
    saveNotifications(notifications);
    updateNotificationBadge();

    showToast('Export completed successfully!', 'success');
});
// Keyboard shortcuts for notifications
document.addEventListener('keydown', function (e) {
    // Ctrl/Cmd + N to open notifications
    if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
        e.preventDefault();
        const panel = document.getElementById('notificationPanel');
        if (!panel.classList.contains('show')) {
            toggleNotificationPanel();
        }
    }

    // Esc to close notifications
    if (e.key === 'Escape') {
        const panel = document.getElementById('notificationPanel');
        if (panel.classList.contains('show')) {
            panel.classList.remove('show');
        }
    }
});



// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .updated {
        animation: pulse 1s;
    }
    
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
    
    .export-dropdown {
        animation: fadeIn 0.2s ease;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    .notification-toast {
        animation: slideIn 0.3s ease;
    }
    
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    .toast-header {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-bottom: 0.5rem;
    }
    
    .toast-close {
        margin-left: auto;
        background: none;
        border: none;
        font-size: 1.25rem;
        cursor: pointer;
        color: var(--text-secondary);
    }
    
    .toast-body {
        font-size: 0.875rem;
        color: var(--text-secondary);
    }
    
    .fa-spinner {
        animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
`;

document.head.appendChild(style);