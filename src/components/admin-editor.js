// Admin Editor - UI for Admin to Add/Edit JSON Data
import { saveWebsites, saveOrders, saveVisitors, getCachedData, setItem } from '../utils/storage.js';

/**
 * Create website editor form
 * @param {Object} website - Website data (optional for new)
 * @param {Function} onSave - Callback on save
 * @returns {string} HTML string
 */
export const createWebsiteEditor = (website = null, onSave = null) => {
    const isEdit = website !== null;
    const nextId = isEdit ? website.id : (getCachedData()?.websites?.length || 0) + 1;
    
    return `
        <div class="editor-form" data-id="${isEdit ? website.id : 'new'}">
            <div class="form-group">
                <label>Website Name</label>
                <input type="text" class="edit-name" value="${isEdit ? website.name : ''}" placeholder="Enter website name">
            </div>
            <div class="form-group">
                <label>Description</label>
                <textarea class="edit-description" placeholder="Enter description">${isEdit ? website.description : ''}</textarea>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>Price</label>
                    <input type="text" class="edit-price" value="${isEdit ? website.price : ''}" placeholder="e.g., $299">
                </div>
                <div class="form-group">
                    <label>Category</label>
                    <select class="edit-category">
                        <option value="Website" ${isEdit && website.category === 'Website' ? 'selected' : ''}>Website</option>
                        <option value="Web Application" ${isEdit && website.category === 'Web Application' ? 'selected' : ''}>Web Application</option>
                    </select>
                </div>
            </div>
            <div class="form-group">
                <label>Image Path</label>
                <input type="text" class="edit-image" value="${isEdit ? website.image : ''}" placeholder="assets/images/web/web1.svg">
            </div>
            <div class="form-group">
                <label>Demo/GitHub Link</label>
                <input type="url" class="edit-demo" value="${isEdit ? website.demoLink : ''}" placeholder="https://github.com/demo/...">
            </div>
            <div class="form-actions">
                <button class="save-btn">${isEdit ? 'Update' : 'Add'} Website</button>
                <button class="cancel-btn">Cancel</button>
            </div>
        </div>
    `;
};

/**
 * Create order editor form
 * @param {Object} order - Order data (optional for new)
 * @returns {string} HTML string
 */
export const createOrderEditor = (order = null) => {
    const isEdit = order !== null;
    
    return `
        <div class="editor-form">
            <div class="form-group">
                <label>Customer Name</label>
                <input type="text" class="edit-customer" value="${isEdit ? order.customer : ''}" placeholder="Customer name">
            </div>
            <div class="form-group">
                <label>Email</label>
                <input type="email" class="edit-email" value="${isEdit ? order.email : ''}" placeholder="customer@email.com">
            </div>
            <div class="form-group">
                <label>Product</label>
                <input type="text" class="edit-product" value="${isEdit ? order.product : ''}" placeholder="Product name">
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>Price</label>
                    <input type="text" class="edit-price" value="${isEdit ? order.price : ''}" placeholder="e.g., $299">
                </div>
                <div class="form-group">
                    <label>Status</label>
                    <select class="edit-status">
                        <option value="Pending" ${isEdit && order.status === 'Pending' ? 'selected' : ''}>Pending</option>
                        <option value="Completed" ${isEdit && order.status === 'Completed' ? 'selected' : ''}>Completed</option>
                        <option value="Cancelled" ${isEdit && order.status === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
                    </select>
                </div>
            </div>
            <div class="form-actions">
                <button class="save-btn">${isEdit ? 'Update' : 'Add'} Order</button>
                <button class="cancel-btn">Cancel</button>
            </div>
        </div>
    `;
};

/**
 * Initialize website editor event handlers
 * @param {Function} onSaveComplete - Callback when save is complete
 */
export const initWebsiteEditor = (onSaveComplete) => {
    const form = document.querySelector('.editor-form');
    if (!form) return;
    
    const saveBtn = form.querySelector('.save-btn');
    const cancelBtn = form.querySelector('.cancel-btn');
    
    saveBtn?.addEventListener('click', () => {
        const data = getCachedData() || {};
        const websites = data.websites || [];
        
        const name = form.querySelector('.edit-name').value;
        const description = form.querySelector('.edit-description').value;
        const price = form.querySelector('.edit-price').value;
        const category = form.querySelector('.edit-category').value;
        const image = form.querySelector('.edit-image').value;
        const demoLink = form.querySelector('.edit-demo').value;
        
        if (!name || !price) {
            alert('Please fill in required fields');
            return;
        }
        
        const formId = form.dataset.id;
        
        if (formId === 'new') {
            // Add new
            const newId = websites.length > 0 ? Math.max(...websites.map(w => w.id)) + 1 : 1;
            websites.push({
                id: newId,
                name,
                description,
                price,
                category,
                image: image || `assets/images/web/web${((newId - 1) % 8) + 1}.svg`,
                demoLink
            });
        } else {
            // Edit existing
            const id = parseInt(formId);
            const index = websites.findIndex(w => w.id === id);
            if (index !== -1) {
                websites[index] = {
                    ...websites[index],
                    name,
                    description,
                    price,
                    category,
                    image: image || websites[index].image,
                    demoLink
                };
            }
        }
        
        saveWebsites(websites);
        alert('Website saved successfully!');
        
        if (onSaveComplete) onSaveComplete();
    });
    
    cancelBtn?.addEventListener('click', () => {
        if (onSaveComplete) onSaveComplete();
    });
};

/**
 * Initialize order editor event handlers
 */
export const initOrderEditor = (onSaveComplete) => {
    const form = document.querySelector('.editor-form');
    if (!form) return;
    
    const saveBtn = form.querySelector('.save-btn');
    const cancelBtn = form.querySelector('.cancel-btn');
    
    saveBtn?.addEventListener('click', () => {
        const data = getCachedData() || {};
        const orders = data.orders || [];
        
        const customer = form.querySelector('.edit-customer').value;
        const email = form.querySelector('.edit-email').value;
        const product = form.querySelector('.edit-product').value;
        const price = form.querySelector('.edit-price').value;
        const status = form.querySelector('.edit-status').value;
        
        if (!customer || !product || !price) {
            alert('Please fill in required fields');
            return;
        }
        
        const newId = orders.length > 0 ? Math.max(...orders.map(o => o.id)) + 1 : 1;
        
        orders.push({
            id: newId,
            customer,
            email,
            product,
            price,
            status,
            date: new Date().toLocaleString('en-US', { hour12: false })
        });
        
        saveOrders(orders);
        alert('Order added successfully!');
        
        if (onSaveComplete) onSaveComplete();
    });
    
    cancelBtn?.addEventListener('click', () => {
        if (onSaveComplete) onSaveComplete();
    });
};

/**
 * Show editor modal
 * @param {string} content - HTML content
 */
export const showEditorModal = (content) => {
    const modal = document.createElement('div');
    modal.className = 'editor-modal';
    modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content">
            <button class="close-modal">×</button>
            ${content}
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close handlers
    modal.querySelector('.modal-overlay')?.addEventListener('click', closeEditorModal);
    modal.querySelector('.close-modal')?.addEventListener('click', closeEditorModal);
};

/**
 * Close editor modal
 */
export const closeEditorModal = () => {
    document.querySelector('.editor-modal')?.remove();
};

export default {
    createWebsiteEditor,
    createOrderEditor,
    initWebsiteEditor,
    initOrderEditor,
    showEditorModal,
    closeEditorModal
};