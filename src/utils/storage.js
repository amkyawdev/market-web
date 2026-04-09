/**
 * Storage Utility - Handles JSON Data & LocalStorage
 */

const STORAGE_PREFIX = 'amkyawdev_';
const CACHE_KEY = STORAGE_PREFIX + 'data_cache';

/**
 * Load JSON data from file and cache in localStorage
 * @param {string} jsonPath - Path to JSON file
 * @returns {Promise<Object>} - JSON data
 */
export const loadJSONData = async (jsonPath) => {
    try {
        const response = await fetch(jsonPath);
        const data = await response.json();
        
        // Cache in localStorage
        setItem('data_cache', data);
        
        return data;
    } catch (error) {
        console.error('Error loading JSON:', error);
        // Try to get from cache
        const cached = getItem('data_cache');
        if (cached) return cached;
        throw error;
    }
};

/**
 * Get cached data from localStorage
 * @returns {Object|null}
 */
export const getCachedData = () => {
    return getItem('data_cache');
};

/**
 * Save data to localStorage
 * @param {string} key - Storage key
 * @param {any} value - Value to store
 */
export const setItem = (key, value) => {
    try {
        localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
    } catch (e) {
        console.error('Error saving to localStorage:', e);
    }
};

/**
 * Get item from localStorage
 * @param {string} key - Storage key
 * @param {any} defaultValue - Default value
 * @returns {any}
 */
export const getItem = (key, defaultValue = null) => {
    try {
        const item = localStorage.getItem(STORAGE_PREFIX + key);
        return item ? JSON.parse(item) : defaultValue;
    } catch (e) {
        console.error('Error reading from localStorage:', e);
        return defaultValue;
    }
};

/**
 * Remove item from localStorage
 * @param {string} key - Storage key
 */
export const removeItem = (key) => {
    try {
        localStorage.removeItem(STORAGE_PREFIX + key);
    } catch (e) {
        console.error('Error removing from localStorage:', e);
    }
};

/**
 * Clear all app storage
 */
export const clearAll = () => {
    try {
        const keys = Object.keys(localStorage);
        keys.forEach(key => {
            if (key.startsWith(STORAGE_PREFIX)) {
                localStorage.removeItem(key);
            }
        });
    } catch (e) {
        console.error('Error clearing localStorage:', e);
    }
};

/**
 * Save websites data
 * @param {Array} websites 
 */
export const saveWebsites = (websites) => {
    const data = getCachedData() || {};
    data.websites = websites;
    setItem('data_cache', data);
};

/**
 * Save orders data
 * @param {Array} orders 
 */
export const saveOrders = (orders) => {
    const data = getCachedData() || {};
    data.orders = orders;
    setItem('data_cache', data);
};

/**
 * Save visitors data
 * @param {Array} visitors 
 */
export const saveVisitors = (visitors) => {
    const data = getCachedData() || {};
    data.visitors = visitors;
    setItem('data_cache', data);
};