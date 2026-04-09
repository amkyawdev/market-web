// Login Page Logic
import { renderLoginForm } from '../components/login-form.js';
import { isAuthenticated } from '../core/auth.js';

/**
 * Render the login page
 */
export const renderLoginPage = () => {
    const app = document.getElementById('app');
    if (!app) return;

    // If already authenticated, redirect to admin panel
    if (isAuthenticated()) {
        window.location.hash = '#/admin';
        return;
    }

    app.innerHTML = '<div id="login-page"></div>';
    const loginPage = document.getElementById('login-page');
    renderLoginForm(loginPage);
};

export default { renderLoginPage };