// Contact UI Component

/**
 * Creates the contact form HTML
 * @returns {string} HTML string
 */
export const createContactForm = () => {
    return `
        <div class="contact-container">
            <div class="contact-card">
                <h2>Contact Us</h2>
                <p>Have questions? We'd love to hear from you!</p>
                
                <form id="contact-form" class="contact-form">
                    <div class="form-group">
                        <label for="name">Name</label>
                        <input type="text" id="name" name="name" placeholder="Your name" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" id="email" name="email" placeholder="your@email.com" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="message">Message</label>
                        <textarea id="message" name="message" placeholder="Your message..." rows="5" required></textarea>
                    </div>
                    
                    <button type="submit" class="submit-btn">Send Message</button>
                </form>
            </div>
        </div>
    `;
};

/**
 * Render contact form
 * @param {HTMLElement} container 
 */
export const renderContactForm = (container) => {
    if (!container) return;

    const styles = `
        <style>
            .contact-container {
                display: flex;
                justify-content: center;
                align-items: center;
                min-height: 100vh;
                padding: 20px;
                position: relative;
                z-index: 1;
            }
            
            .contact-card {
                background: rgba(255, 255, 255, 0.1);
                backdrop-filter: blur(20px);
                border: 1px solid rgba(255, 255, 255, 0.2);
                border-radius: 20px;
                padding: 40px;
                width: 100%;
                max-width: 500px;
            }
            
            .contact-card h2 {
                color: #fff;
                font-size: 2rem;
                margin-bottom: 10px;
                text-align: center;
            }
            
            .contact-card > p {
                color: rgba(255, 255, 255, 0.7);
                text-align: center;
                margin-bottom: 30px;
            }
            
            .form-group {
                margin-bottom: 20px;
            }
            
            .form-group label {
                display: block;
                color: rgba(255, 255, 255, 0.9);
                margin-bottom: 8px;
            }
            
            .form-group input,
            .form-group textarea {
                width: 100%;
                padding: 14px;
                border: 1px solid rgba(255, 255, 255, 0.2);
                border-radius: 10px;
                background: rgba(255, 255, 255, 0.1);
                color: #fff;
                font-size: 1rem;
                box-sizing: border-box;
            }
            
            .form-group input:focus,
            .form-group textarea:focus {
                outline: none;
                border-color: rgba(0, 255, 255, 0.6);
            }
            
            .submit-btn {
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
            }
            
            .submit-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 8px 25px rgba(0, 212, 255, 0.3);
            }
        </style>
    `;

    container.innerHTML = styles + createContactForm();

    const form = container.querySelector('#contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you soon.');
            form.reset();
        });
    }
};

export default { createContactForm, renderContactForm };