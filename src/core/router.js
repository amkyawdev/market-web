// Simple client-side router
const routes = {};

export const registerRoute = (path, handler) => {
    routes[path] = handler;
};

export const router = {
    init() {
        window.addEventListener('hashchange', () => this.handleRoute());
        window.addEventListener('load', () => this.handleRoute());
    },

    handleRoute() {
        const hash = window.location.hash.slice(1) || '/';
        const handler = routes[hash];
        
        if (handler) {
            handler();
        } else {
            // Default to home
            routes['/']?.();
        }
    },

    navigate(path) {
        window.location.hash = path;
    },

    getCurrentPath() {
        return window.location.hash.slice(1) || '/';
    }
};