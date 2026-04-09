// Product Card Component - Converts JSON Data to Cards
import { prefetchWebsiteImages } from '../utils/asset-loader.js';

/**
 * Creates a product card HTML from JSON data
 * @param {Object} product - Product data from JSON
 * @returns {string} HTML string
 */
export const createProductCard = (product) => {
    const { id, name, description, price, image, demoLink, category } = product;
    
    return `
        <div class="product-card" data-id="${id}" data-category="${category}">
            <div class="product-image">
                <img src="${image}" alt="${name}" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2280%22>🛒</text></svg>'">
                <span class="product-category">${category}</span>
            </div>
            <div class="product-info">
                <h3>${name}</h3>
                <p>${description}</p>
                <div class="product-footer">
                    <span class="product-price">${price}</span>
                    <div class="product-buttons">
                        <a href="${demoLink}" target="_blank" class="demo-btn">
                            <span>👁️</span> Demo
                        </a>
                        <button class="order-btn" data-product-id="${id}" data-product-name="${name}" data-product-price="${price}">
                            Order Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
};

/**
 * Render products into a container
 * @param {HTMLElement} container - Container element
 * @param {Array} products - Array of product objects from JSON
 */
export const renderProducts = (container, products) => {
    if (!container || !products || !products.length) {
        if (container) container.innerHTML = '<p class="empty-state">No products available</p>';
        return;
    }
    
    // Prefetch images
    prefetchWebsiteImages(products);
    
    container.innerHTML = products.map(createProductCard).join('');
    
    // Add event listeners for order buttons
    container.querySelectorAll('.order-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const productId = e.target.dataset.productId;
            const productName = e.target.dataset.productName;
            const productPrice = e.target.dataset.productPrice;
            
            if (productName && productPrice) {
                alert(`Order placed for ${productName}!\n\nPrice: ${productPrice}\n\nWe will contact you shortly.`);
            }
        });
    });
};

/**
 * Filter products by category
 * @param {Array} products - All products
 * @param {string} category - Category to filter
 * @returns {Array} Filtered products
 */
export const filterProducts = (products, category) => {
    if (!category || category === 'all') return products;
    return products.filter(p => p.category === category);
};

/**
 * Search products by name
 * @param {Array} products - All products
 * @param {string} query - Search query
 * @returns {Array} Filtered products
 */
export const searchProducts = (products, query) => {
    if (!query) return products;
    const lowerQuery = query.toLowerCase();
    return products.filter(p => 
        p.name.toLowerCase().includes(lowerQuery) || 
        p.description.toLowerCase().includes(lowerQuery)
    );
};

export default { 
    createProductCard, 
    renderProducts, 
    filterProducts, 
    searchProducts 
};