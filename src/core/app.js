// Main App Entry Point
import { initThreeJS } from './engine.js';
import { registerRoute, router } from './router.js';
import { isAuthenticated, logout } from './auth.js';
import { renderLoginPage } from '../pages/login.js';
import { renderAdminPanel } from '../pages/admin-panel.js';
import { renderMarketPage } from '../pages/market.js';

// Register routes
const initRoutes = () => {
    registerRoute('/', () => renderMarketPage());
    registerRoute('/login', () => renderLoginPage());
    registerRoute('/admin', () => renderAdminPanel());
};

// Update navigation based on auth state
const updateNavigation = () => {
    const adminLink = document.getElementById('admin-link');
    const logoutLink = document.getElementById('logout-link');
    const loginLink = document.querySelector('a[href="#/login"]');

    if (isAuthenticated()) {
        if (adminLink) adminLink.style.display = 'inline';
        if (logoutLink) logoutLink.style.display = 'inline';
        if (loginLink) loginLink.style.display = 'none';
    } else {
        if (adminLink) adminLink.style.display = 'none';
        if (logoutLink) logoutLink.style.display = 'none';
        if (loginLink) loginLink.style.display = 'inline';
    }
};

// Setup navigation event listeners
const setupNavigation = () => {
    const logoutLink = document.getElementById('logout-link');
    
    if (logoutLink) {
        logoutLink.addEventListener('click', (e) => {
            e.preventDefault();
            logout();
        });
    }
};

// Initialize the app
const init = () => {
    // Initialize Three.js background
    initThreeJS('bg-canvas');
    
    // Initialize routes
    initRoutes();
    
    // Start router
    router.init();
    
    // Update navigation based on auth state
    updateNavigation();
    
    // Setup navigation event listeners
    setupNavigation();
    
    // Update navigation on hash change
    window.addEventListener('hashchange', updateNavigation);
};

// Start the app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

export default { init };