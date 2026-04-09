// Storage utility for session/local storage handling

const STORAGE_PREFIX = 'amkyawdev_';

/**
 * Set item in local storage with prefix
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
 * Get item from local storage
 * @param {string} key - Storage key
 * @param {any} defaultValue - Default value if not found
 * @returns {any} - Stored value or default
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
 * Remove item from local storage
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
 * Check if storage is available
 * @returns {boolean}
 */
export const isStorageAvailable = () => {
    try {
        const test = '__storage_test__';
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
    } catch (e) {
        return false;
    }
};