// Admin Panel Page - Protected Route
import { isAuthenticated, logout } from '../core/auth.js';
import { getProducts, setProducts } from './market.js';

// Storage keys
const VISITORS_KEY = 'adminVisitors';
const ORDERS_KEY = 'adminOrders';
const PRODUCTS_KEY = 'adminProducts';

/**
 * Initialize demo data if empty
 */
const initDemoData = () => {
    // Initialize visitors if not exists
    if (!localStorage.getItem(VISITORS_KEY)) {
        const demoVisitors = [
            { id: 1, timestamp: '2024-04-09 10:30:45', ip: '192.168.1.101', action: 'Login Success' },
            { id: 2, timestamp: '2024-04-09 10:25:12', ip: '192.168.1.102', action: 'Login Success' },
            { id: 3, timestamp: '2024-04-09 09:15:33', ip: '192.168.1.103', action: 'Page View' },
            { id: 4, timestamp: '2024-04-08 16:45:22', ip: '192.168.1.104', action: 'Login Failed' },
            { id: 5, timestamp: '2024-04-08 14:20:18', ip: '192.168.1.105', action: 'Login Success' }
        ];
        localStorage.setItem(VISITORS_KEY, JSON.stringify(demoVisitors));
    }
    
    // Initialize orders if not exists
    if (!localStorage.getItem(ORDERS_KEY)) {
        const demoOrders = [
            { id: 1, product: 'E-Commerce Website', price: '$299', customer: 'John Doe', email: 'john@example.com', date: '2024-04-09 10:30:45', status: 'Pending' },
            { id: 2, product: 'Portfolio Website', price: '$99', customer: 'Jane Smith', email: 'jane@example.com', date: '2024-04-09 09:15:22', status: 'Completed' },
            { id: 3, product: 'Restaurant Website', price: '$179', customer: 'Mike Johnson', email: 'mike@example.com', date: '2024-04-08 14:20:10', status: 'Completed' },
            { id: 4, product: 'Real Estate Website', price: '$349', customer: 'Sarah Williams', email: 'sarah@example.com', date: '2024-04-08 11:05:33', status: 'Pending' },
            { id: 5, product: 'Blog Platform', price: '$199', customer: 'Tom Brown', email: 'tom@example.com', date: '2024-04-07 16:30:45', status: 'Completed' }
        ];
        localStorage.setItem(ORDERS_KEY, JSON.stringify(demoOrders));
    }
    
    // Initialize products if not exists (load from market.js)
    if (!localStorage.getItem(PRODUCTS_KEY)) {
        localStorage.setItem(PRODUCTS_KEY, JSON.stringify(getProducts()));
    }
};

/**
 * Get products list
 */
const getStoredProducts = () => {
    const stored = localStorage.getItem(PRODUCTS_KEY);
    return stored ? JSON.parse(stored) : getProducts();
};

/**
 * Save products to storage
 */
const saveProducts = (products) => {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
    setProducts(products);
};

/**
 * Get visitors list
 */
const getVisitors = () => {
    const visitors = localStorage.getItem(VISITORS_KEY);
    return visitors ? JSON.parse(visitors) : [];
};

/**
 * Get orders list
 */
const getOrders = () => {
    const orders = localStorage.getItem(ORDERS_KEY);
    return orders ? JSON.parse(orders) : [];
};

/**
 * Add a new visitor record
 */
const addVisitor = (action) => {
    const visitors = getVisitors();
    const newVisitor = {
        id: Date.now(),
        timestamp: new Date().toLocaleString('en-US', { hour12: false }),
        ip: '192.168.1.' + Math.floor(Math.random() * 255),
        action: action
    };
    visitors.unshift(newVisitor);
    localStorage.setItem(VISITORS_KEY, JSON.stringify(visitors.slice(0, 100))); // Keep last 100
};

/**
 * Check if user is authenticated, if not redirect to login
 * @returns {boolean} - True if authenticated
 */
export const requireAuth = () => {
    if (!isAuthenticated()) {
        window.location.hash = '#/login';
        return false;
    }
    // Log this visit
    addVisitor('Admin Panel Visit');
    return true;
};

/**
 * Render the admin panel page
 */
export const renderAdminPanel = () => {
    const app = document.getElementById('app');
    if (!app) return;

    // Check authentication
    if (!requireAuth()) {
        return;
    }

    // Initialize demo data
    initDemoData();
    
    const visitors = getVisitors();
    const orders = getOrders();
    const products = getStoredProducts();
    const totalRevenue = orders
        .filter(o => o.status === 'Completed')
        .reduce((sum, o) => sum + parseInt(o.price.replace('$', '')), 0);

    app.innerHTML = `
        <style>
            .admin-container {
                padding: 40px 20px;
                max-width: 1400px;
                margin: 0 auto;
                position: relative;
                z-index: 1;
            }
            
            .admin-header {
                background: rgba(255, 255, 255, 0.1);
                backdrop-filter: blur(20px);
                border: 1px solid rgba(255, 255, 255, 0.2);
                border-radius: 20px;
                padding: 30px;
                margin-bottom: 30px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                flex-wrap: wrap;
                gap: 20px;
            }
            
            .admin-header h1 {
                color: #fff;
                font-size: 2rem;
                margin-bottom: 5px;
            }
            
            .admin-header p {
                color: rgba(255, 255, 255, 0.7);
            }
            
            .logout-btn {
                padding: 12px 24px;
                background: linear-gradient(135deg, #ff5252, #d32f2f);
                color: #fff;
                border: none;
                border-radius: 8px;
                font-size: 0.95rem;
                font-weight: 500;
                cursor: pointer;
                transition: all 0.3s ease;
            }
            
            .logout-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 8px 25px rgba(255, 82, 82, 0.3);
            }
            
            .admin-stats {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 20px;
                margin-bottom: 30px;
            }
            
            .stat-card {
                background: rgba(255, 255, 255, 0.1);
                backdrop-filter: blur(20px);
                border: 1px solid rgba(255, 255, 255, 0.2);
                border-radius: 15px;
                padding: 25px;
                text-align: center;
            }
            
            .stat-card h3 {
                color: rgba(255, 255, 255, 0.7);
                font-size: 0.85rem;
                margin-bottom: 10px;
                text-transform: uppercase;
                letter-spacing: 1px;
            }
            
            .stat-card .value {
                color: #00d4ff;
                font-size: 2.2rem;
                font-weight: 700;
            }
            
            .admin-tabs {
                display: flex;
                gap: 10px;
                margin-bottom: 25px;
                flex-wrap: wrap;
            }
            
            .tab-btn {
                padding: 12px 25px;
                background: rgba(255, 255, 255, 0.1);
                border: 1px solid rgba(255, 255, 255, 0.2);
                border-radius: 10px;
                color: #fff;
                cursor: pointer;
                transition: all 0.3s ease;
                font-size: 0.95rem;
                font-weight: 500;
            }
            
            .tab-btn:hover,
            .tab-btn.active {
                background: linear-gradient(135deg, #00d4ff, #7b2ff7);
                border-color: transparent;
            }
            
            .tab-content {
                display: none;
            }
            
            .tab-content.active {
                display: block;
            }
            
            .data-table {
                width: 100%;
                background: rgba(255, 255, 255, 0.08);
                backdrop-filter: blur(20px);
                border: 1px solid rgba(255, 255, 255, 0.15);
                border-radius: 15px;
                overflow: hidden;
            }
            
            .data-table table {
                width: 100%;
                border-collapse: collapse;
            }
            
            .data-table th,
            .data-table td {
                padding: 15px 20px;
                text-align: left;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            }
            
            .data-table th {
                background: rgba(0, 212, 255, 0.1);
                color: #00d4ff;
                font-weight: 600;
                font-size: 0.85rem;
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }
            
            .data-table td {
                color: rgba(255, 255, 255, 0.85);
                font-size: 0.95rem;
            }
            
            .data-table tr:last-child td {
                border-bottom: none;
            }
            
            .data-table tr:hover td {
                background: rgba(255, 255, 255, 0.05);
            }
            
            .status-badge {
                padding: 5px 12px;
                border-radius: 20px;
                font-size: 0.8rem;
                font-weight: 500;
            }
            
            .status-badge.pending {
                background: rgba(255, 193, 7, 0.2);
                color: #ffc107;
            }
            
            .status-badge.completed {
                background: rgba(76, 175, 80, 0.2);
                color: #4caf50;
            }
            
            .action-badge {
                padding: 5px 12px;
                border-radius: 20px;
                font-size: 0.8rem;
                font-weight: 500;
            }
            
            .action-badge.success {
                background: rgba(76, 175, 80, 0.2);
                color: #4caf50;
            }
            
            .action-badge.failed {
                background: rgba(244, 67, 54, 0.2);
                color: #f44336;
            }
            
            .action-badge.view {
                background: rgba(0, 212, 255, 0.2);
                color: #00d4ff;
            }
            
            .action-btn {
                padding: 6px 12px;
                background: rgba(255, 255, 255, 0.1);
                border: 1px solid rgba(255, 255, 255, 0.2);
                border-radius: 6px;
                color: #fff;
                cursor: pointer;
                font-size: 0.8rem;
                transition: all 0.3s ease;
                margin-right: 5px;
            }
            
            .action-btn:hover {
                background: rgba(255, 255, 255, 0.2);
            }
            
            .action-btn.complete {
                background: rgba(76, 175, 80, 0.2);
                border-color: rgba(76, 175, 80, 0.4);
            }
            
            .action-btn.delete {
                background: rgba(244, 67, 54, 0.2);
                border-color: rgba(244, 67, 54, 0.4);
            }
            
            .add-website-form {
                background: rgba(255, 255, 255, 0.08);
                backdrop-filter: blur(20px);
                border: 1px solid rgba(255, 255, 255, 0.15);
                border-radius: 15px;
                padding: 25px;
                margin-bottom: 25px;
            }
            
            .add-website-form h3 {
                color: #fff;
                margin-bottom: 20px;
                font-size: 1.2rem;
            }
            
            .form-row {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 15px;
                margin-bottom: 15px;
            }
            
            .form-row input,
            .form-row select {
                padding: 12px 15px;
                background: rgba(255, 255, 255, 0.1);
                border: 1px solid rgba(255, 255, 255, 0.2);
                border-radius: 8px;
                color: #fff;
                font-size: 0.95rem;
            }
            
            .form-row input::placeholder {
                color: rgba(255, 255, 255, 0.5);
            }
            
            .form-row input:focus,
            .form-row select:focus {
                outline: none;
                border-color: rgba(0, 212, 255, 0.6);
            }
            
            .form-row select option {
                background: #0a0a0a;
            }
            
            .submit-btn {
                padding: 12px 30px;
                background: linear-gradient(135deg, #00d4ff, #7b2ff7);
                border: none;
                border-radius: 8px;
                color: #fff;
                font-size: 0.95rem;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
            }
            
            .submit-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 8px 25px rgba(0, 212, 255, 0.3);
            }
            
            .empty-state {
                text-align: center;
                padding: 50px;
                color: rgba(255, 255, 255, 0.5);
            }
        </style>
        
        <div class="admin-container">
            <div class="admin-header">
                <div>
                    <h1>🛠️ Admin Panel</h1>
                    <p>Welcome to AmkyawDev Market Admin Dashboard</p>
                </div>
                <button id="logout-btn" class="logout-btn">Logout</button>
            </div>
            
            <div class="admin-stats">
                <div class="stat-card">
                    <h3>Total Products</h3>
                    <div class="value">${products.length}</div>
                </div>
                <div class="stat-card">
                    <h3>Total Orders</h3>
                    <div class="value">${orders.length}</div>
                </div>
                <div class="stat-card">
                    <h3>Total Visitors</h3>
                    <div class="value">${visitors.length}</div>
                </div>
                <div class="stat-card">
                    <h3>Revenue</h3>
                    <div class="value">$${totalRevenue}</div>
                </div>
            </div>
            
            <div class="admin-tabs">
                <button class="tab-btn active" data-tab="orders">📋 Orders</button>
                <button class="tab-btn" data-tab="visitors">👥 Visitors</button>
                <button class="tab-btn" data-tab="websites">🌐 Manage Websites</button>
            </div>
            
            <!-- Orders Tab -->
            <div class="tab-content active" id="tab-orders">
                <div class="data-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Product</th>
                                <th>Price</th>
                                <th>Customer</th>
                                <th>Email</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${orders.map(order => `
                                <tr>
                                    <td>#${order.id}</td>
                                    <td>${order.product}</td>
                                    <td>${order.price}</td>
                                    <td>${order.customer}</td>
                                    <td>${order.email}</td>
                                    <td>${order.date}</td>
                                    <td><span class="status-badge ${order.status.toLowerCase()}">${order.status}</span></td>
                                    <td>
                                        <button class="action-btn complete" data-order-id="${order.id}" data-action="complete">✓ Complete</button>
                                        <button class="action-btn delete" data-order-id="${order.id}" data-action="delete">✗ Delete</button>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
            
            <!-- Visitors Tab -->
            <div class="tab-content" id="tab-visitors">
                <div class="data-table">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Timestamp</th>
                                <th>IP Address</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${visitors.length > 0 ? visitors.map(visitor => `
                                <tr>
                                    <td>${visitor.id}</td>
                                    <td>${visitor.timestamp}</td>
                                    <td>${visitor.ip}</td>
                                    <td><span class="action-badge ${visitor.action.includes('Failed') ? 'failed' : visitor.action.includes('Success') ? 'success' : 'view'}">${visitor.action}</span></td>
                                </tr>
                            `).join('') : '<tr><td colspan="4" class="empty-state">No visitors yet</td></tr>'}
                        </tbody>
                    </table>
                </div>
            </div>
            
            <!-- Manage Websites Tab -->
            <div class="tab-content" id="tab-websites">
                <div class="add-website-form">
                    <h3>➕ Add New Website</h3>
                    <form id="add-website-form">
                        <div class="form-row">
                            <input type="text" id="website-name" placeholder="Website Name" required>
                            <input type="text" id="website-description" placeholder="Description" required>
                            <input type="text" id="website-price" placeholder="Price (e.g., $299)" required>
                        </div>
                        <div class="form-row">
                            <input type="url" id="website-demo-link" placeholder="Demo/GitHub Link" required>
                            <select id="website-category" required>
                                <option value="">Select Category</option>
                                <option value="Website">Website</option>
                                <option value="Web Application">Web Application</option>
                            </select>
                        </div>
                        <button type="submit" class="submit-btn">Add Website</button>
                    </form>
                </div>
                
                <div class="data-table">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Price</th>
                                <th>Category</th>
                                <th>Demo Link</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody id="websites-table-body">
                            ${products.map(product => `
                            <tr>
                                <td>${product.id}</td>
                                <td>${product.name}</td>
                                <td>${product.description}</td>
                                <td>${product.price}</td>
                                <td>${product.category}</td>
                                <td><a href="${product.demoLink}" target="_blank" style="color: #00d4ff;">View</a></td>
                                <td>
                                    <button class="action-btn edit-product" data-id="${product.id}">Edit</button>
                                    <button class="action-btn delete delete-product" data-id="${product.id}">Delete</button>
                                </td>
                            </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;

    // Add logout handler
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            logout();
        });
    }

    // Setup tab switching
    setupTabSwitching();
    
    // Setup order actions
    setupOrderActions();
    
    // Setup website form
    setupWebsiteForm();
};

const setupTabSwitching = () => {
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const tabId = btn.dataset.tab;
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            document.getElementById(`tab-${tabId}`).classList.add('active');
        });
    });
};

const setupOrderActions = () => {
    const completeBtns = document.querySelectorAll('.action-btn.complete');
    completeBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const orderId = parseInt(e.target.dataset.orderId);
            const orders = getOrders();
            const updatedOrders = orders.map(o => 
                o.id === orderId ? { ...o, status: 'Completed' } : o
            );
            localStorage.setItem(ORDERS_KEY, JSON.stringify(updatedOrders));
            alert('Order marked as completed!');
            renderAdminPanel();
        });
    });
    
    const deleteBtns = document.querySelectorAll('.action-btn.delete');
    deleteBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            if (confirm('Are you sure you want to delete this order?')) {
                const orderId = parseInt(e.target.dataset.orderId);
                const orders = getOrders();
                const updatedOrders = orders.filter(o => o.id !== orderId);
                localStorage.setItem(ORDERS_KEY, JSON.stringify(updatedOrders));
                renderAdminPanel();
            }
        });
    });
};

const setupWebsiteForm = () => {
    const form = document.getElementById('add-website-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('website-name').value;
            const description = document.getElementById('website-description').value;
            const price = document.getElementById('website-price').value;
            const demoLink = document.getElementById('website-demo-link').value;
            const category = document.getElementById('website-category').value;
            
            // Get existing products
            const products = getStoredProducts();
            
            // Generate new ID
            const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
            
            // Create new product
            const newProduct = {
                id: newId,
                name: name,
                description: description,
                price: price,
                image: `assets/images/web${((newId - 1) % 8) + 1}.svg`,
                demoLink: demoLink,
                category: category
            };
            
            // Add to products array
            products.push(newProduct);
            
            // Save to storage
            saveProducts(products);
            
            alert('Website added successfully!');
            form.reset();
            renderAdminPanel();
        });
    }
    
    // Setup delete product buttons
    const deleteProductBtns = document.querySelectorAll('.delete-product');
    deleteProductBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const productId = parseInt(e.target.dataset.id);
            if (confirm('Are you sure you want to delete this website?')) {
                const products = getStoredProducts();
                const updatedProducts = products.filter(p => p.id !== productId);
                saveProducts(updatedProducts);
                renderAdminPanel();
            }
        });
    });
    
    // Setup edit product buttons
    const editProductBtns = document.querySelectorAll('.edit-product');
    editProductBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const productId = parseInt(e.target.dataset.id);
            const products = getStoredProducts();
            const product = products.find(p => p.id === productId);
            
            if (product) {
                const newName = prompt('Enter new name:', product.name);
                const newPrice = prompt('Enter new price:', product.price);
                const newDesc = prompt('Enter new description:', product.description);
                
                if (newName && newPrice && newDesc) {
                    const updatedProducts = products.map(p => 
                        p.id === productId ? {
                            ...p,
                            name: newName,
                            price: newPrice,
                            description: newDesc
                        } : p
                    );
                    saveProducts(updatedProducts);
                    renderAdminPanel();
                }
            }
        });
    });
};

export default { renderAdminPanel };