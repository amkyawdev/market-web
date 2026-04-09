// Market Page - Market Grid with JSON Data
import { loadJSONData, getCachedData } from '../utils/storage.js';
import { renderProducts, filterProducts, searchProducts } from '../components/product-card.js';

let marketData = null;

/**
 * Render the market page
 */
export const renderMarketPage = async () => {
    const app = document.getElementById('app');
    if (!app) return;

    // Load data from JSON or cache
    if (!marketData) {
        try {
            marketData = await loadJSONData('data/website.json');
        } catch (error) {
            console.error('Failed to load market data:', error);
            marketData = getCachedData();
        }
    }
    
    const websites = marketData?.websites || [];

    app.innerHTML = `
        <style>
            .market-container {
                padding: 40px 20px;
                max-width: 1400px;
                margin: 0 auto;
                position: relative;
                z-index: 1;
            }
            
            .market-header {
                text-align: center;
                margin-bottom: 50px;
            }
            
            .market-header h1 {
                color: #fff;
                font-size: 3rem;
                margin-bottom: 15px;
                background: linear-gradient(135deg, #00d4ff, #7b2ff7);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
            }
            
            .market-header p {
                color: rgba(255, 255, 255, 0.7);
                font-size: 1.2rem;
            }
            
            .search-bar {
                max-width: 500px;
                margin: 0 auto 30px;
            }
            
            .search-bar input {
                width: 100%;
                padding: 15px 25px;
                background: rgba(255, 255, 255, 0.1);
                border: 1px solid rgba(255, 255, 255, 0.2);
                border-radius: 30px;
                color: #fff;
                font-size: 1rem;
            }
            
            .search-bar input::placeholder {
                color: rgba(255, 255, 255, 0.5);
            }
            
            .search-bar input:focus {
                outline: none;
                border-color: rgba(0, 212, 255, 0.6);
                box-shadow: 0 0 20px rgba(0, 212, 255, 0.2);
            }
            
            .category-filter {
                display: flex;
                justify-content: center;
                gap: 15px;
                margin-bottom: 40px;
                flex-wrap: wrap;
            }
            
            .category-btn {
                padding: 10px 25px;
                background: rgba(255, 255, 255, 0.1);
                border: 1px solid rgba(255, 255, 255, 0.2);
                border-radius: 25px;
                color: #fff;
                cursor: pointer;
                transition: all 0.3s ease;
                font-size: 0.95rem;
            }
            
            .category-btn:hover,
            .category-btn.active {
                background: linear-gradient(135deg, #00d4ff, #7b2ff7);
                border-color: transparent;
                transform: translateY(-2px);
            }
            
            .products-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
                gap: 30px;
            }
            
            .product-card {
                background: rgba(255, 255, 255, 0.08);
                backdrop-filter: blur(20px);
                border: 1px solid rgba(255, 255, 255, 0.15);
                border-radius: 20px;
                overflow: hidden;
                transition: all 0.4s ease;
                perspective: 1000px;
            }
            
            .product-card:hover {
                transform: translateY(-10px) rotateX(5deg);
                box-shadow: 0 25px 50px rgba(0, 0, 0, 0.4);
                border-color: rgba(0, 212, 255, 0.3);
            }
            
            .product-image {
                width: 100%;
                height: 200px;
                background: linear-gradient(135deg, rgba(0, 212, 255, 0.15), rgba(123, 47, 247, 0.15));
                display: flex;
                align-items: center;
                justify-content: center;
                position: relative;
                overflow: hidden;
            }
            
            .product-image img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                transition: transform 0.4s ease;
            }
            
            .product-card:hover .product-image img {
                transform: scale(1.1);
            }
            
            .product-category {
                position: absolute;
                top: 15px;
                right: 15px;
                background: rgba(0, 0, 0, 0.6);
                padding: 5px 12px;
                border-radius: 15px;
                font-size: 0.75rem;
                color: rgba(255, 255, 255, 0.8);
            }
            
            .product-info {
                padding: 25px;
            }
            
            .product-info h3 {
                color: #fff;
                font-size: 1.4rem;
                margin-bottom: 10px;
                font-weight: 600;
            }
            
            .product-info p {
                color: rgba(255, 255, 255, 0.6);
                font-size: 0.95rem;
                margin-bottom: 20px;
                line-height: 1.6;
            }
            
            .product-footer {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-top: 15px;
            }
            
            .product-price {
                color: #00d4ff;
                font-size: 1.6rem;
                font-weight: 700;
            }
            
            .product-buttons {
                display: flex;
                gap: 10px;
            }
            
            .demo-btn {
                padding: 10px 20px;
                background: rgba(255, 255, 255, 0.1);
                border: 1px solid rgba(255, 255, 255, 0.2);
                border-radius: 8px;
                color: #fff;
                text-decoration: none;
                font-size: 0.9rem;
                font-weight: 500;
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                gap: 6px;
            }
            
            .demo-btn:hover {
                background: rgba(255, 255, 255, 0.2);
            }
            
            .order-btn {
                padding: 10px 20px;
                background: linear-gradient(135deg, #00d4ff, #7b2ff7);
                border: none;
                border-radius: 8px;
                color: #fff;
                font-size: 0.9rem;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
            }
            
            .order-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 8px 25px rgba(0, 212, 255, 0.3);
            }
            
            .empty-state {
                text-align: center;
                padding: 60px;
                color: rgba(255, 255, 255, 0.5);
                font-size: 1.2rem;
            }
        </style>
        
        <div class="market-container">
            <div class="market-header">
                <h1>🌐 AmkyawDev Market</h1>
                <p>Premium websites and web applications for your business</p>
            </div>
            
            <div class="search-bar">
                <input type="text" id="search-input" placeholder="🔍 Search websites...">
            </div>
            
            <div class="category-filter">
                <button class="category-btn active" data-category="all">All</button>
                <button class="category-btn" data-category="Website">Websites</button>
                <button class="category-btn" data-category="Web Application">Web Apps</button>
            </div>
            
            <div class="products-grid" id="products-grid">
                ${websites.length > 0 ? '' : '<div class="empty-state">No websites available</div>'}
            </div>
        </div>
    `;

    // Render products
    const productsGrid = document.getElementById('products-grid');
    if (websites.length > 0) {
        renderProducts(productsGrid, websites);
    }

    // Setup event listeners
    setupEventListeners(websites);
};

const setupEventListeners = (allProducts) => {
    const categoryBtns = document.querySelectorAll('.category-btn');
    const productsGrid = document.getElementById('products-grid');
    const searchInput = document.getElementById('search-input');
    
    let currentCategory = 'all';
    let searchQuery = '';
    
    const updateDisplay = () => {
        let filtered = allProducts;
        
        if (currentCategory !== 'all') {
            filtered = filterProducts(filtered, currentCategory);
        }
        
        if (searchQuery) {
            filtered = searchProducts(filtered, searchQuery);
        }
        
        renderProducts(productsGrid, filtered);
    };
    
    // Category filter
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            categoryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentCategory = btn.dataset.category;
            updateDisplay();
        });
    });
    
    // Search
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value;
            updateDisplay();
        });
    }
};

// Export for external access
export const getMarketData = () => marketData;
export const refreshMarketData = async () => {
    marketData = await loadJSONData('data/website.json');
    return marketData;
};

export default { renderMarketPage, getMarketData, refreshMarketData };