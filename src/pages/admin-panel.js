// Admin Panel Page - 3D Modern Dashboard Design
import { isAuthenticated, logout } from '../core/auth.js';
import { loadJSONData, getCachedData, saveWebsites, saveOrders, saveVisitors } from '../utils/storage.js';

let adminData = null;

/**
 * Initialize demo data if empty
 */
const initDemoData = async () => {
    if (!adminData) {
        try {
            adminData = await loadJSONData('data/website.json');
        } catch (error) {
            adminData = getCachedData();
        }
    }
    
    const data = getCachedData() || adminData;
    if (data) {
        saveWebsites(data.websites || []);
        saveOrders(data.orders || []);
        saveVisitors(data.visitors || []);
    }
};

/**
 * Get stored data
 */
const getData = () => {
    return {
        websites: getCachedData()?.websites || adminData?.websites || [],
        orders: getCachedData()?.orders || adminData?.orders || [],
        visitors: getCachedData()?.visitors || adminData?.visitors || []
    };
};

/**
 * Check if user is authenticated
 */
export const requireAuth = () => {
    if (!isAuthenticated()) {
        window.location.hash = '#/login';
        return false;
    }
    addVisitor('Admin Panel Visit');
    return true;
};

/**
 * Add visitor record
 */
const addVisitor = (action) => {
    const visitors = getData().visitors;
    visitors.unshift({
        id: Date.now(),
        timestamp: new Date().toLocaleString('en-US', { hour12: false }),
        ip: '192.168.1.' + Math.floor(Math.random() * 255),
        action: action
    });
    saveVisitors(visitors.slice(0, 100));
};

/**
 * Render the admin panel page with 3D design
 */
export const renderAdminPanel = async () => {
    const app = document.getElementById('app');
    if (!app) return;

    if (!requireAuth()) return;

    await initDemoData();
    
    const data = getData();
    const { websites, orders, visitors } = data;
    
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
            
            /* 3D Header Card */
            .admin-header {
                background: linear-gradient(135deg, rgba(0, 212, 255, 0.15), rgba(123, 47, 247, 0.15));
                backdrop-filter: blur(30px);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 24px;
                padding: 35px 40px;
                margin-bottom: 30px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                flex-wrap: wrap;
                gap: 25px;
                position: relative;
                transform-style: preserve-3d;
                box-shadow: 
                    0 25px 50px rgba(0, 0, 0, 0.3),
                    inset 0 1px 0 rgba(255, 255, 255, 0.1);
            }
            
            .admin-header::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                height: 1px;
                background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
            }
            
            .header-content {
                position: relative;
                transform: translateZ(20px);
            }
            
            .admin-header h1 {
                color: #fff;
                font-size: 2.2rem;
                margin-bottom: 8px;
                font-weight: 700;
                text-shadow: 0 2px 20px rgba(0, 212, 255, 0.5);
                background: linear-gradient(135deg, #00d4ff, #fff);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
            }
            
            .admin-header p {
                color: rgba(255, 255, 255, 0.7);
                font-size: 1rem;
            }
            
            .logout-btn {
                padding: 14px 28px;
                background: linear-gradient(135deg, #ff5252, #d32f2f);
                color: #fff;
                border: none;
                border-radius: 12px;
                font-size: 0.95rem;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
                position: relative;
                transform: translateZ(10px);
                box-shadow: 0 10px 30px rgba(255, 82, 82, 0.3);
            }
            
            .logout-btn:hover {
                transform: translateZ(15px) translateY(-3px);
                box-shadow: 0 15px 40px rgba(255, 82, 82, 0.4);
            }
            
            /* 3D Stats Cards */
            .admin-stats {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
                gap: 25px;
                margin-bottom: 30px;
            }
            
            .stat-card {
                background: linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02));
                backdrop-filter: blur(20px);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 20px;
                padding: 28px;
                text-align: center;
                position: relative;
                transform-style: preserve-3d;
                transition: all 0.4s ease;
                box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
            }
            
            .stat-card::after {
                content: '';
                position: absolute;
                bottom: -1px;
                left: 20%;
                right: 20%;
                height: 3px;
                background: linear-gradient(90deg, transparent, rgba(0, 212, 255, 0.6), transparent);
                border-radius: 0 0 20px 20px;
            }
            
            .stat-card:hover {
                transform: translateY(-10px) rotateX(5deg);
                box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
            }
            
            .stat-card .icon {
                font-size: 2.5rem;
                margin-bottom: 15px;
                display: block;
                filter: drop-shadow(0 0 15px rgba(0, 212, 255, 0.5));
            }
            
            .stat-card h3 {
                color: rgba(255, 255, 255, 0.7);
                font-size: 0.85rem;
                margin-bottom: 12px;
                text-transform: uppercase;
                letter-spacing: 1.5px;
                font-weight: 500;
            }
            
            .stat-card .value {
                font-size: 2.8rem;
                font-weight: 800;
                background: linear-gradient(135deg, #00d4ff, #7b2ff7);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                text-shadow: 0 0 30px rgba(0, 212, 255, 0.5);
            }
            
            /* 3D Tabs */
            .admin-tabs {
                display: flex;
                gap: 12px;
                margin-bottom: 25px;
                flex-wrap: wrap;
            }
            
            .tab-btn {
                padding: 14px 28px;
                background: rgba(255, 255, 255, 0.05);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 14px;
                color: rgba(255, 255, 255, 0.7);
                cursor: pointer;
                transition: all 0.3s ease;
                font-size: 0.95rem;
                font-weight: 600;
                position: relative;
                overflow: hidden;
            }
            
            .tab-btn::before {
                content: '';
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 100%;
                background: linear-gradient(135deg, #00d4ff, #7b2ff7);
                transition: left 0.3s ease;
                z-index: -1;
            }
            
            .tab-btn:hover {
                color: #fff;
                border-color: transparent;
                transform: translateY(-3px);
                box-shadow: 0 10px 30px rgba(0, 212, 255, 0.3);
            }
            
            .tab-btn:hover::before {
                left: 0;
            }
            
            .tab-btn.active {
                background: linear-gradient(135deg, #00d4ff, #7b2ff7);
                border-color: transparent;
                color: #fff;
                box-shadow: 0 10px 30px rgba(0, 212, 255, 0.3);
            }
            
            .tab-content {
                display: none;
                animation: fadeIn 0.4s ease;
            }
            
            .tab-content.active {
                display: block;
            }
            
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }
            
            /* 3D Table */
            .data-table {
                width: 100%;
                background: linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02));
                backdrop-filter: blur(20px);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 20px;
                overflow: hidden;
                box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2);
            }
            
            .data-table table {
                width: 100%;
                border-collapse: collapse;
            }
            
            .data-table th {
                background: linear-gradient(135deg, rgba(0, 212, 255, 0.15), rgba(123, 47, 247, 0.15));
                color: #00d4ff;
                font-weight: 600;
                font-size: 0.85rem;
                text-transform: uppercase;
                letter-spacing: 1px;
                padding: 20px 25px;
                text-align: left;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            }
            
            .data-table td {
                color: rgba(255, 255, 255, 0.85);
                font-size: 0.95rem;
                padding: 18px 25px;
                border-bottom: 1px solid rgba(255, 255, 255, 0.05);
                transition: all 0.3s ease;
            }
            
            .data-table tr:last-child td {
                border-bottom: none;
            }
            
            .data-table tr:hover td {
                background: rgba(0, 212, 255, 0.05);
                transform: translateX(5px);
            }
            
            .status-badge {
                padding: 6px 14px;
                border-radius: 20px;
                font-size: 0.8rem;
                font-weight: 600;
            }
            
            .status-badge.pending {
                background: rgba(255, 193, 7, 0.2);
                color: #ffc107;
                box-shadow: 0 0 15px rgba(255, 193, 7, 0.3);
            }
            
            .status-badge.completed {
                background: rgba(76, 175, 80, 0.2);
                color: #4caf50;
                box-shadow: 0 0 15px rgba(76, 175, 80, 0.3);
            }
            
            .action-btn {
                padding: 8px 16px;
                border-radius: 8px;
                color: #fff;
                cursor: pointer;
                font-size: 0.85rem;
                font-weight: 500;
                transition: all 0.3s ease;
                border: none;
            }
            
            .action-btn.complete {
                background: linear-gradient(135deg, #4caf50, #2e7d32);
            }
            
            .action-btn.complete:hover {
                transform: translateY(-2px);
                box-shadow: 0 8px 20px rgba(76, 175, 80, 0.4);
            }
            
            .action-btn.delete {
                background: linear-gradient(135deg, #f44336, #c62828);
            }
            
            .action-btn.delete:hover {
                transform: translateY(-2px);
                box-shadow: 0 8px 20px rgba(244, 67, 54, 0.4);
            }
            
            /* 3D Form */
            .add-form {
                background: linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02));
                backdrop-filter: blur(20px);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 20px;
                padding: 30px;
                margin-bottom: 25px;
                box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2);
            }
            
            .add-form h3 {
                color: #fff;
                margin-bottom: 25px;
                font-size: 1.3rem;
                font-weight: 600;
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .form-row {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
                gap: 18px;
                margin-bottom: 18px;
            }
            
            .form-row input,
            .form-row select {
                padding: 14px 18px;
                background: rgba(255, 255, 255, 0.08);
                border: 1px solid rgba(255, 255, 255, 0.15);
                border-radius: 12px;
                color: #fff;
                font-size: 0.95rem;
                transition: all 0.3s ease;
            }
            
            .form-row input::placeholder {
                color: rgba(255, 255, 255, 0.4);
            }
            
            .form-row input:focus,
            .form-row select:focus {
                outline: none;
                border-color: rgba(0, 212, 255, 0.6);
                box-shadow: 0 0 20px rgba(0, 212, 255, 0.2);
                background: rgba(255, 255, 255, 0.12);
            }
            
            .form-row select option {
                background: #0a0a0a;
            }
            
            .submit-btn {
                padding: 14px 35px;
                background: linear-gradient(135deg, #00d4ff, #7b2ff7);
                border: none;
                border-radius: 12px;
                color: #fff;
                font-size: 1rem;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
                box-shadow: 0 10px 30px rgba(0, 212, 255, 0.3);
            }
            
            .submit-btn:hover {
                transform: translateY(-3px);
                box-shadow: 0 15px 40px rgba(0, 212, 255, 0.4);
            }
            
            .empty-state {
                text-align: center;
                padding: 60px;
                color: rgba(255, 255, 255, 0.5);
                font-size: 1.1rem;
            }
        </style>
        
        <div class="admin-container">
            <div class="admin-header">
                <div class="header-content">
                    <h1>🛠️ Admin Dashboard</h1>
                    <p>Manage your AmkyawDev Market</p>
                </div>
                <button id="logout-btn" class="logout-btn">Logout</button>
            </div>
            
            <div class="admin-stats">
                <div class="stat-card">
                    <span class="icon">🌐</span>
                    <h3>Total Products</h3>
                    <div class="value">${websites.length}</div>
                </div>
                <div class="stat-card">
                    <span class="icon">📋</span>
                    <h3>Total Orders</h3>
                    <div class="value">${orders.length}</div>
                </div>
                <div class="stat-card">
                    <span class="icon">👥</span>
                    <h3>Total Visitors</h3>
                    <div class="value">${visitors.length}</div>
                </div>
                <div class="stat-card">
                    <span class="icon">💰</span>
                    <h3>Revenue</h3>
                    <div class="value">$${totalRevenue}</div>
                </div>
            </div>
            
            <div class="admin-tabs">
                <button class="tab-btn active" data-tab="websites">🌐 Websites</button>
                <button class="tab-btn" data-tab="orders">📋 Orders</button>
                <button class="tab-btn" data-tab="visitors">👥 Visitors</button>
            </div>
            
            <!-- Websites Tab -->
            <div class="tab-content active" id="tab-websites">
                <div class="add-form">
                    <h3>➕ Add New Website</h3>
                    <form id="add-website-form">
                        <div class="form-row">
                            <input type="text" id="website-name" placeholder="Website Name" required>
                            <input type="text" id="website-price" placeholder="Price (e.g., $299)" required>
                        </div>
                        <div class="form-row">
                            <input type="text" id="website-description" placeholder="Description" required>
                            <select id="website-category" required>
                                <option value="">Select Category</option>
                                <option value="Website">Website</option>
                                <option value="Web Application">Web Application</option>
                            </select>
                        </div>
                        <div class="form-row">
                            <input type="url" id="website-demo-link" placeholder="Demo/GitHub Link" required>
                            <input type="text" id="website-image" placeholder="Image Path" value="assets/images/web/web1.svg">
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
                                <th>Link</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${websites.map(w => `
                            <tr>
                                <td>${w.id}</td>
                                <td><strong>${w.name}</strong></td>
                                <td>${w.description.substring(0, 40)}...</td>
                                <td><span style="color: #00d4ff; font-weight: 600;">${w.price}</span></td>
                                <td>${w.category}</td>
                                <td><a href="${w.demoLink}" target="_blank" style="color: #7b2ff7;">View</a></td>
                                <td>
                                    <button class="action-btn delete delete-website" data-id="${w.id}">Delete</button>
                                </td>
                            </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
            
            <!-- Orders Tab -->
            <div class="tab-content" id="tab-orders">
                <div class="data-table">
                    <table>
                        <thead>
                            <tr>
                                <th>#</th>
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
                            ${orders.map(o => `
                            <tr>
                                <td>${o.id}</td>
                                <td><strong>${o.product}</strong></td>
                                <td><span style="color: #00d4ff; font-weight: 600;">${o.price}</span></td>
                                <td>${o.customer}</td>
                                <td>${o.email}</td>
                                <td>${o.date}</td>
                                <td><span class="status-badge ${o.status.toLowerCase()}">${o.status}</span></td>
                                <td>
                                    <button class="action-btn complete complete-order" data-id="${o.id}">✓</button>
                                    <button class="action-btn delete delete-order" data-id="${o.id}">✗</button>
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
                            ${visitors.length > 0 ? visitors.map(v => `
                            <tr>
                                <td>${v.id}</td>
                                <td>${v.timestamp}</td>
                                <td>${v.ip}</td>
                                <td><span class="status-badge ${v.action.includes('Failed') ? 'pending' : v.action.includes('Success') ? 'completed' : 'pending'}">${v.action}</span></td>
                            </tr>
                            `).join('') : '<tr><td colspan="4" class="empty-state">No visitors yet</td></tr>'}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;

    document.getElementById('logout-btn')?.addEventListener('click', () => logout());
    setupTabSwitching();
    setupWebsiteForm();
    setupOrderActions();
};

const setupTabSwitching = () => {
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            document.getElementById('tab-' + btn.dataset.tab).classList.add('active');
        });
    });
};

const setupWebsiteForm = () => {
    const form = document.getElementById('add-website-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const websites = getData().websites;
            const newId = websites.length > 0 ? Math.max(...websites.map(w => w.id)) + 1 : 1;
            
            websites.push({
                id: newId,
                name: document.getElementById('website-name').value,
                description: document.getElementById('website-description').value,
                price: document.getElementById('website-price').value,
                category: document.getElementById('website-category').value,
                demoLink: document.getElementById('website-demo-link').value,
                image: document.getElementById('website-image').value || 'assets/images/web/web1.svg'
            });
            
            saveWebsites(websites);
            alert('Website added successfully!');
            form.reset();
            renderAdminPanel();
        });
    }
    
    document.querySelectorAll('.delete-website').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.dataset.id);
            if (confirm('Delete this website?')) {
                const websites = getData().websites.filter(w => w.id !== id);
                saveWebsites(websites);
                renderAdminPanel();
            }
        });
    });
};

const setupOrderActions = () => {
    document.querySelectorAll('.complete-order').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.dataset.id);
            const orders = getData().orders.map(o => o.id === id ? { ...o, status: 'Completed' } : o);
            saveOrders(orders);
            renderAdminPanel();
        });
    });
    
    document.querySelectorAll('.delete-order').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.dataset.id);
            if (confirm('Delete this order?')) {
                const orders = getData().orders.filter(o => o.id !== id);
                saveOrders(orders);
                renderAdminPanel();
            }
        });
    });
};

export default { renderAdminPanel };