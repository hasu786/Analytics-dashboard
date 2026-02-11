# DataViz Pro - Windows Start Popup Feature

## Overview
This project includes a Windows 11-style Start menu popup that displays user information and provides quick access to various features.

## Features

### 1. **Windows Start Button**
- Located at the bottom of the sidebar
- Shows user avatar, name, and online status
- Click to toggle the popup menu

### 2. **Alternative User Profile Button**
- Located in the header (top-right corner)
- Click to open the same popup
- Perfect for mobile or when sidebar is collapsed

### 3. **Popup Content**

#### User Header
- Displays user avatar with gradient background
- Shows user name and role (Administrator)
- Can be customized with user data

#### Pinned Section
- 6 quick-access items in a grid layout
- Icons for: Profile, Settings, Mail, Files, Browser, Design
- Click any item to navigate or perform actions

#### Earnings Section
- Shows current month earnings prominently
- Horizontal scrollable list of past months' earnings
- Interactive - click on any amount to see details

#### Recommended Section
- Shows recent or recommended items
- Example: Quarterly Report with timestamp
- Expandable for more recommendations

#### Action Buttons
- **Account**: Navigate to account settings
- **Lock**: Lock the screen
- **Sign out**: Sign out from the application
- **Shut down**: Shut down the application

## File Structure

```
project/
├── index.html          # Main HTML file with popup structure
├── style.css          # Base styles for sidebar and layout
├── popup.css          # Popup-specific styles
├── popup.js           # Popup functionality and interactions
└── script.js          # Main application scripts
```

## How to Use

### Basic Implementation

1. **Include the CSS files**:
```html
<link rel="stylesheet" href="style.css">
<link rel="stylesheet" href="popup.css">
```

2. **Include the JavaScript files**:
```html
<script src="popup.js"></script>
```

3. **Trigger buttons are already in the HTML**:
- Sidebar button: `#windowsStartBtn`
- Header button: `#userProfileBtn`

### Customization

#### Update User Information
```javascript
updateUserInfo('Jane Smith', 'Manager', 'JS');
```

#### Update Earnings Data
```javascript
updateEarnings([22000, 20000, 18000, 16000, 15000, 14000, 12000, 10000, 9000, 8000]);
```

#### Customize Pinned Items
Edit the `.pinned-grid` section in `index.html`:
```html
<button class="pinned-item">
    <span class="item-icon">🎯</span>
    <span class="item-name">Your Item</span>
</button>
```

#### Customize Actions
Modify the event listeners in `popup.js`:
```javascript
switch(itemName) {
    case 'Your Item':
        // Your custom action
        window.location.href = 'your-page.html';
        break;
}
```

## Keyboard Shortcuts

- **ESC**: Close the popup
- Click outside the popup (on overlay) to close

## Responsive Design

- **Desktop**: Full popup with all features
- **Tablet**: Centered popup, sidebar button hidden
- **Mobile**: Compact popup, grid layouts adjusted

## Browser Support

- Chrome/Edge (recommended)
- Firefox
- Safari
- Opera

## Features in Detail

### 1. Smooth Animations
- Slide-up entrance animation
- Fade-in overlay
- Smooth transitions on hover

### 2. Dark Mode Support
- Automatically adapts to dark mode
- Maintains readability and aesthetics
- Toggle dark mode with the theme button

### 3. Interactive Elements
- Hover effects on all clickable items
- Click feedback
- Smooth scroll for long content

### 4. Accessibility
- Keyboard navigation (ESC to close)
- Clear visual hierarchy
- Readable text and icons

## Customization Tips

### Change Colors
Edit the gradient in `popup.css`:
```css
.popup-user-header {
    background: linear-gradient(135deg, #your-color-1 0%, #your-color-2 100%);
}
```

### Adjust Popup Position
Modify in `popup.css`:
```css
.windows-popup {
    bottom: 80px;  /* Distance from bottom */
    left: 20px;    /* Distance from left */
}
```

### Add More Earnings
Simply add more items to the earnings array:
```javascript
const earnings = [20000, 18000, 16000, ...moreMonths];
updateEarnings(earnings);
```

## Troubleshooting

### Popup doesn't show
1. Check that all files are linked correctly
2. Ensure `popup.js` is loaded after the DOM
3. Check browser console for errors

### Styling issues
1. Verify CSS files are loaded in correct order
2. Check for CSS conflicts with existing styles
3. Clear browser cache

### Click events not working
1. Ensure buttons have correct IDs
2. Check that JavaScript is loaded
3. Look for JavaScript errors in console

## Future Enhancements

Potential features to add:
- User profile picture upload
- More pinned items
- Notifications integration
- Recent files/activities
- Search functionality
- User settings quick toggle
- Calendar integration

## License
MIT License - Feel free to use and modify as needed.

## Support
For issues or questions, please refer to the documentation or contact support.

---

**Version**: 1.0.0  
**Last Updated**: February 2026  
**Author**: DataViz Pro Team
