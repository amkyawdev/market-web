/**
 * Asset Loader - Prefetch Images & SVG
 */

const loadedAssets = new Set();

/**
 * Prefetch a single asset
 * @param {string} src - Asset source URL
 * @returns {Promise<HTMLImageElement>}
 */
export const prefetchAsset = (src) => {
    return new Promise((resolve, reject) => {
        if (loadedAssets.has(src)) {
            resolve(null);
            return;
        }
        
        if (src.endsWith('.svg')) {
            // For SVG, fetch as text and create image
            fetch(src)
                .then(res => res.text())
                .then(svgText => {
                    const img = new Image();
                    const blob = new Blob([svgText], { type: 'image/svg+xml' });
                    const url = URL.createObjectURL(blob);
                    img.src = url;
                    img.onload = () => {
                        loadedAssets.add(src);
                        resolve(img);
                    };
                    img.onerror = reject;
                })
                .catch(reject);
        } else {
            const img = new Image();
            img.src = src;
            img.onload = () => {
                loadedAssets.add(src);
                resolve(img);
            };
            img.onerror = reject;
        }
    });
};

/**
 * Prefetch multiple assets in parallel
 * @param {string[]} sources - Array of asset URLs
 * @returns {Promise<void>}
 */
export const prefetchAssets = async (sources) => {
    try {
        await Promise.all(sources.map(prefetchAsset));
    } catch (error) {
        console.warn('Some assets failed to load:', error);
    }
};

/**
 * Prefetch all website images
 * @param {Array} websites - Array of website objects
 */
export const prefetchWebsiteImages = (websites) => {
    const imageUrls = websites
        .filter(w => w.image)
        .map(w => w.image);
    
    return prefetchAssets(imageUrls);
};

/**
 * Prefetch background images
 * @param {number} count - Number of background images
 */
export const prefetchBackgrounds = (count = 3) => {
    const bgUrls = [];
    for (let i = 1; i <= count; i++) {
        bgUrls.push(`assets/images/bg/bg${i}.svg`);
    }
    return prefetchAssets(bgUrls);
};

/**
 * Check if asset is loaded
 * @param {string} src - Asset URL
 * @returns {boolean}
 */
export const isAssetLoaded = (src) => {
    return loadedAssets.has(src);
};

/**
 * Clear loaded assets cache
 */
export const clearAssetCache = () => {
    loadedAssets.clear();
};

export default {
    prefetchAsset,
    prefetchAssets,
    prefetchWebsiteImages,
    prefetchBackgrounds,
    isAssetLoaded,
    clearAssetCache
};