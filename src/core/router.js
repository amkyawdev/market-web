// Router - Client-side routing with background switching
import { switchBackground } from './engine.js';

const routes = {};

export const registerRoute = (path, handler) => {
    routes[path] = handler;
};

export const router = {
    currentPath: '/',
    
    init() {
        window.addEventListener('hashchange', () => this.handleRoute());
        window.addEventListener('load', () => this.handleRoute());
    },

    handleRoute() {
        const hash = window.location.hash.slice(1) || '/';
        const prevPath = this.currentPath;
        this.currentPath = hash;
        
        // Switch background when route changes
        if (prevPath !== hash) {
            switchBackground(hash);
        }
        
        const handler = routes[hash];
        
        if (handler) {
            handler();
        } else {
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

export default { registerRoute, router };