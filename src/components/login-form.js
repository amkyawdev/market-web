// Glassmorphism Login Form Component
import { login as authLogin } from '../core/auth.js';

/**
 * Creates the login form HTML
 * @returns {string} HTML string for the login form
 */
const createLoginFormHTML = () => {
    return `
        <div class="login-container">
            <div class="login-card">
                <h2 class="login-title">Admin Login</h2>
                <p class="login-subtitle">Enter your credentials to access the admin panel</p>
                
                <form id="login-form" class="login-form">
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            placeholder="admin@example.com" 
                            required
                            autocomplete="email"
                        >
                    </div>
                    
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input 
                            type="password" 
                            id="password" 
                            name="password" 
                            placeholder="Enter password" 
                            required
                            autocomplete="current-password"
                        >
                    </div>
                    
                    <div id="error-message" class="error-message" style="display: none;">
                        Invalid email or password
                    </div>
                    
                    <button type="submit" class="login-btn">
                        Login
                    </button>
                </form>
            </div>
        </div>
    `;
};

/**
 * Creates the login form styles
 * @returns {string} CSS styles for the login form
 */
const createLoginStyles = () => {
    return `
        <style>
            .login-container {
                display: flex;
                justify-content: center;
                align-items: center;
                min-height: 100vh;
                padding: 20px;
                position: relative;
                z-index: 1;
            }
            
            .login-card {
                background: rgba(255, 255, 255, 0.1);
                backdrop-filter: blur(20px);
                -webkit-backdrop-filter: blur(20px);
                border: 1px solid rgba(255, 255, 255, 0.2);
                border-radius: 20px;
                padding: 40px;
                width: 100%;
                max-width: 400px;
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
            }
            
            .login-title {
                color: #fff;
                font-size: 2rem;
                margin-bottom: 10px;
                text-align: center;
                font-weight: 600;
            }
            
            .login-subtitle {
                color: rgba(255, 255, 255, 0.7);
                text-align: center;
                margin-bottom: 30px;
                font-size: 0.95rem;
            }
            
            .form-group {
                margin-bottom: 20px;
            }
            
            .form-group label {
                display: block;
                color: rgba(255, 255, 255, 0.9);
                margin-bottom: 8px;
                font-weight: 500;
                font-size: 0.9rem;
            }
            
            .form-group input {
                width: 100%;
                padding: 14px 16px;
                border: 1px solid rgba(255, 255, 255, 0.2);
                border-radius: 10px;
                background: rgba(255, 255, 255, 0.1);
                color: #fff;
                font-size: 1rem;
                transition: all 0.3s ease;
                box-sizing: border-box;
            }
            
            .form-group input::placeholder {
                color: rgba(255, 255, 255, 0.5);
            }
            
            .form-group input:focus {
                outline: none;
                border-color: rgba(0, 255, 255, 0.6);
                background: rgba(255, 255, 255, 0.15);
                box-shadow: 0 0 0 3px rgba(0, 255, 255, 0.1);
            }
            
            .login-btn {
                width: 100%;
                padding: 14px;
                border: none;
                border-radius: 10px;
                background: linear-gradient(135deg, #00d4ff, #7b2ff7);
                color: #fff;
                font-size: 1rem;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
                margin-top: 10px;
            }
            
            .login-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 8px 25px rgba(0, 212, 255, 0.3);
            }
            
            .login-btn:active {
                transform: translateY(0);
            }
            
            .error-message {
                background: rgba(255, 82, 82, 0.2);
                border: 1px solid rgba(255, 82, 82, 0.4);
                color: #ff6b6b;
                padding: 12px;
                border-radius: 8px;
                margin-bottom: 15px;
                text-align: center;
                font-size: 0.9rem;
            }
        </style>
    `;
};

/**
 * Render the login form component
 * @param {HTMLElement} container - Container element to render form into
 */
export const renderLoginForm = (container) => {
    if (!container) {
        console.error('Container not provided');
        return;
    }

    // Inject styles
    container.innerHTML = createLoginStyles() + createLoginFormHTML();

    // Add form submission handler
    const form = container.querySelector('#login-form');
    const errorMessage = container.querySelector('#error-message');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const emailInput = form.querySelector('#email');
            const passwordInput = form.querySelector('#password');
            
            const email = emailInput.value.trim();
            const password = passwordInput.value;

            // Attempt login
            const success = authLogin(email, password);

            if (success) {
                // Redirect to admin panel
                window.location.hash = '#/admin';
            } else {
                // Show error message
                if (errorMessage) {
                    errorMessage.style.display = 'block';
                }
                // Shake animation
                form.style.animation = 'shake 0.5s ease';
                setTimeout(() => {
                    form.style.animation = '';
                }, 500);
            }
        });

        // Hide error message on input
        const inputs = form.querySelectorAll('input');
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                if (errorMessage) {
                    errorMessage.style.display = 'none';
                }
            });
        });
    }

    // Add shake animation style
    const style = document.createElement('style');
    style.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            20%, 60% { transform: translateX(-10px); }
            40%, 80% { transform: translateX(10px); }
        }
    `;
    document.head.appendChild(style);
};

export default { renderLoginForm };