// Admin credentials - hardcoded for frontend-only logic
const ADMIN_CREDENTIALS = {
    email: 'aung.thuyrain.at449@gmail.com',
    password: 'admin449'
};

const TOKEN_KEY = 'adminToken';
const TOKEN_VALUE = 'active_session_449';

/**
 * Login with email and password
 * @param {string} email - Admin email
 * @param {string} password - Admin password
 * @returns {boolean} - True if credentials are valid
 */
export const login = (email, password) => {
    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
        localStorage.setItem(TOKEN_KEY, TOKEN_VALUE);
        return true;
    }
    return false;
};

/**
 * Check if user is authenticated
 * @returns {boolean} - True if user has valid session
 */
export const isAuthenticated = () => {
    return localStorage.getItem(TOKEN_KEY) === TOKEN_VALUE;
};

/**
 * Logout and clear session
 */
export const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    window.location.reload();
};

/**
 * Get stored token
 * @returns {string|null} - Token or null
 */
export const getToken = () => {
    return localStorage.getItem(TOKEN_KEY);
};