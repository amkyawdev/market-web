// Three.js Engine - Dynamic Background with SVG & Texture Swapping
import * as THREE from 'three';

let scene, camera, renderer, particles;
let mouseX = 0, mouseY = 0;
let currentBgIndex = 0;
let bgTextures = [];
let transitionInProgress = false;

// Background colors for different pages
const bgColors = {
    default: 0x0a0a0a,
    market: 0x0a0a1a,
    admin: 0x0a1a0a,
    login: 0x1a0a1a
};

// Page to background mapping
const pageBgMap = {
    '/': 'market',
    '/login': 'login',
    '/admin': 'admin'
};

/**
 * Initialize Three.js engine
 */
export const initThreeJS = (canvasId = 'bg-canvas') => {
    const canvas = document.getElementById(canvasId);
    if (!canvas) {
        console.error('Canvas not found');
        return;
    }

    // Scene setup
    scene = new THREE.Scene();
    scene.background = new THREE.Color(bgColors.default);
    
    // Camera setup
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 30;

    // Renderer setup
    renderer = new THREE.WebGLRenderer({ 
        canvas: canvas, 
        alpha: true,
        antialias: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Create particles
    createParticles();

    // Handle window resize
    window.addEventListener('resize', onWindowResize);
    
    // Handle mouse movement
    document.addEventListener('mousemove', onMouseMove);

    // Start animation
    animate();
    
    // Preload backgrounds
    preloadBackgrounds();
};

/**
 * Preload background textures
 */
const preloadBackgrounds = async () => {
    // Create gradient textures for backgrounds
    const bgConfigs = [
        { colors: [0x00d4ff, 0x7b2ff7], name: 'bg1' },
        { colors: [0xff6b6b, 0xfeca57], name: 'bg2' },
        { colors: [0x4ecdc4, 0x44bd32], name: 'bg3' }
    ];
    
    bgConfigs.forEach(config => {
        const canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 512;
        const ctx = canvas.getContext('2d');
        
        const gradient = ctx.createLinearGradient(0, 0, 512, 512);
        gradient.addColorStop(0, '#' + config.colors[0].toString(16).padStart(6, '0'));
        gradient.addColorStop(1, '#' + config.colors[1].toString(16).padStart(6, '0'));
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 512, 512);
        
        const texture = new THREE.CanvasTexture(canvas);
        bgTextures.push(texture);
    });
};

/**
 * Switch background with smooth transition
 * @param {string} page - Current page route
 */
export const switchBackground = (page) => {
    if (transitionInProgress) return;
    
    const bgKey = pageBgMap[page] || 'default';
    const newColor = bgColors[bgKey];
    
    transitionInProgress = true;
    
    // Animate color transition
    const startColor = scene.background.clone();
    const endColor = new THREE.Color(newColor);
    const duration = 1000;
    const startTime = Date.now();
    
    const animateTransition = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Ease in-out
        const eased = progress < 0.5 
            ? 2 * progress * progress 
            : 1 - Math.pow(-2 * progress + 2, 2) / 2;
        
        scene.background.lerpColors(startColor, endColor, eased);
        
        if (progress < 1) {
            requestAnimationFrame(animateTransition);
        } else {
            transitionInProgress = false;
        }
    };
    
    animateTransition();
};

/**
 * Get current background index
 */
export const getCurrentBgIndex = () => currentBgIndex;

/**
 * Create particles
 */
const createParticles = () => {
    const geometry = new THREE.BufferGeometry();
    const count = 2000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 100;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 100;

        const color = new THREE.Color();
        color.setHSL(Math.random() * 0.2 + 0.5, 0.8, 0.6);
        colors[i * 3] = color.r;
        colors[i * 3 + 1] = color.g;
        colors[i * 3 + 2] = color.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
        size: 0.3,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });

    particles = new THREE.Points(geometry, material);
    scene.add(particles);
};

const onWindowResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
};

const onMouseMove = (event) => {
    mouseX = (event.clientX - window.innerWidth / 2) * 0.05;
    mouseY = (event.clientY - window.innerHeight / 2) * 0.05;
};

const animate = () => {
    requestAnimationFrame(animate);

    if (particles) {
        particles.rotation.x += 0.0005;
        particles.rotation.y += 0.0005;
        
        particles.rotation.x += (mouseY - particles.rotation.x) * 0.02;
        particles.rotation.y += (mouseX - particles.rotation.y) * 0.02;
    }

    renderer.render(scene, camera);
};

/**
 * Cleanup Three.js
 */
export const cleanupThreeJS = () => {
    window.removeEventListener('resize', onWindowResize);
    document.removeEventListener('mousemove', onMouseMove);
    
    if (renderer) {
        renderer.dispose();
    }
};

export default { initThreeJS, switchBackground, cleanupThreeJS };