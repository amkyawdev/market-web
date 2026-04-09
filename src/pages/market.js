// Market Page
import { isAuthenticated } from '../core/auth.js';

// Products data - Websites for sale
const products = [
    {
        id: 1,
        name: "E-Commerce Website",
        description: "Full-featured online store with payment gateway integration",
        price: "$299",
        image: "🛒",
        demoLink: "https://github.com/demo/ecommerce",
        category: "Web Application"
    },
    {
        id: 2,
        name: "Portfolio Website",
        description: "Modern personal portfolio with animations",
        price: "$99",
        image: "👤",
        demoLink: "https://github.com/demo/portfolio",
        category: "Website"
    },
    {
        id: 3,
        name: "Business Landing Page",
        description: "Professional landing page for business websites",
        price: "$149",
        image: "🏢",
        demoLink: "https://github.com/demo/landing",
        category: "Website"
    },
    {
        id: 4,
        name: "Blog Platform",
        description: "Content management system for blogging",
        price: "$199",
        image: "📝",
        demoLink: "https://github.com/demo/blog",
        category: "Web Application"
    },
    {
        id: 5,
        name: "Restaurant Website",
        description: "Restaurant website with online ordering system",
        price: "$179",
        image: "🍽️",
        demoLink: "https://github.com/demo/restaurant",
        category: "Website"
    },
    {
        id: 6,
        name: "Real Estate Website",
        description: "Property listing and management system",
        price: "$349",
        image: "🏠",
        demoLink: "https://github.com/demo/realestate",
        category: "Web Application"
    },
    {
        id: 7,
        name: "Education Platform",
        description: "Online learning management system",
        price: "$399",
        image: "🎓",
        demoLink: "https://github.com/demo/education",
        category: "Web Application"
    },
    {
        id: 8,
        name: "Medical Clinic Website",
        description: "Healthcare clinic management website",
        price: "$249",
        image: "🏥",
        demoLink: "https://github.com/demo/medical",
        category: "Website"
    }
];

/**
 * Render the market page
 */
export const renderMarketPage = () => {
    const app = document.getElementById('app');
    if (!app) return;

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
            }
            
            .products-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
                gap: 30px;
            }
            
            .product-card {
                background: rgba(255, 255, 255, 0.08);
                backdrop-filter: blur(20px);
                -webkit-backdrop-filter: blur(20px);
                border: 1px solid rgba(255, 255, 255, 0.15);
                border-radius: 20px;
                overflow: hidden;
                transition: all 0.4s ease;
            }
            
            .product-card:hover {
                transform: translateY(-10px);
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
                font-size: 5rem;
                position: relative;
                overflow: hidden;
            }
            
            .product-image::before {
                content: '';
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
                transition: left 0.5s ease;
            }
            
            .product-card:hover .product-image::before {
                left: 100%;
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
                border-color: rgba(255, 255, 255, 0.4);
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
            
            .order-btn:active {
                transform: translateY(0);
            }
        </style>
        
        <div class="market-container">
            <div class="market-header">
                <h1>🌐 AmkyawDev Market</h1>
                <p>Premium websites and web applications for your business</p>
            </div>
            
            <div class="category-filter">
                <button class="category-btn active" data-category="all">All</button>
                <button class="category-btn" data-category="Website">Websites</button>
                <button class="category-btn" data-category="Web Application">Web Apps</button>
            </div>
            
            <div class="products-grid" id="products-grid">
                ${renderProducts(products)}
            </div>
        </div>
    `;

    // Add event listeners for buttons
    setupEventListeners();
};

const renderProducts = (productsData) => {
    return productsData.map(product => `
        <div class="product-card" data-category="${product.category}">
            <div class="product-image">
                ${product.image}
                <span class="product-category">${product.category}</span>
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <div class="product-footer">
                    <span class="product-price">${product.price}</span>
                    <div class="product-buttons">
                        <a href="${product.demoLink}" target="_blank" class="demo-btn">
                            <span>👁️</span> Demo
                        </a>
                        <button class="order-btn" data-product="${product.id}">
                            Order Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
};

const setupEventListeners = () => {
    // Category filter buttons
    const categoryBtns = document.querySelectorAll('.category-btn');
    const productsGrid = document.getElementById('products-grid');
    
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            categoryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const category = btn.dataset.category;
            
            // Filter products
            let filteredProducts = products;
            if (category !== 'all') {
                filteredProducts = products.filter(p => p.category === category);
            }
            
            productsGrid.innerHTML = renderProducts(filteredProducts);
            setupOrderButtons();
        });
    });
    
    setupOrderButtons();
};

const setupOrderButtons = () => {
    const orderBtns = document.querySelectorAll('.order-btn');
    orderBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const productId = e.target.dataset.product;
            const product = products.find(p => p.id === parseInt(productId));
            if (product) {
                alert(`Order placed for ${product.name}!\n\nPrice: ${product.price}\n\nWe will contact you shortly.`);
            }
        });
    });
};

export default { renderMarketPage };