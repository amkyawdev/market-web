// Product Card Component

/**
 * Creates a product card HTML
 * @param {Object} product - Product data
 * @returns {string} HTML string
 */
export const createProductCard = (product) => {
    const { id, name, description, price, emoji } = product;
    
    return `
        <div class="product-card" data-id="${id}">
            <div class="product-image">${emoji || '📦'}</div>
            <div class="product-info">
                <h3>${name}</h3>
                <p>${description}</p>
                <div class="product-price">${price}</div>
                <button class="buy-btn" data-product-id="${id}">Buy Now</button>
            </div>
        </div>
    `;
};

/**
 * Render products into a container
 * @param {HTMLElement} container - Container element
 * @param {Array} products - Array of product objects
 */
export const renderProducts = (container, products) => {
    if (!container || !products || !products.length) return;
    
    container.innerHTML = products.map(createProductCard).join('');
    
    // Add event listeners for buy buttons
    container.querySelectorAll('.buy-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const productId = e.target.dataset.productId;
            console.log('Buy product:', productId);
            alert('Product added to cart!');
        });
    });
};

export default { createProductCard, renderProducts };