// =========================================
// 🌓 THEME SWITCHER
// =========================================

(function() {
    'use strict';

    const themeToggle = document.getElementById('themeToggle');
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');

    // Theme colors for meta tag
    const THEME_COLORS = {
        light: '#667eea',
        dark: '#16213e'
    };

    // Initialize theme from localStorage or system preference
    function initTheme() {
        const savedTheme = localStorage.getItem('theme');

        if (savedTheme) {
            applyTheme(savedTheme);
        } else {
            // Check system preference
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            applyTheme(prefersDark ? 'dark' : 'light');
        }
    }

    // Apply theme to document
    function applyTheme(theme) {
        if (theme === 'dark') {
            document.body.classList.add('dark-theme');
            if (themeToggle) themeToggle.checked = true;
            if (metaThemeColor) {
                metaThemeColor.setAttribute('content', THEME_COLORS.dark);
            }
        } else {
            document.body.classList.remove('dark-theme');
            if (themeToggle) themeToggle.checked = false;
            if (metaThemeColor) {
                metaThemeColor.setAttribute('content', THEME_COLORS.light);
            }
        }
    }

    // Toggle theme
    function toggleTheme() {
        const isDark = document.body.classList.contains('dark-theme');
        const newTheme = isDark ? 'light' : 'dark';

        applyTheme(newTheme);
        localStorage.setItem('theme', newTheme);

    }

    // Event listener
    if (themeToggle) {
        themeToggle.addEventListener('change', toggleTheme);
    }

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            applyTheme(e.matches ? 'dark' : 'light');
        }
    });

    // Initialize on page load
    initTheme();

})();
