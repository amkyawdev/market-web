import * as THREE from 'three';

let scene, camera, renderer, particles;
let mouseX = 0, mouseY = 0;

export const initThreeJS = (canvasId = 'bg-canvas') => {
    const canvas = document.getElementById(canvasId);
    if (!canvas) {
        console.error('Canvas not found');
        return;
    }

    // Scene setup
    scene = new THREE.Scene();
    
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
};

const createParticles = () => {
    const geometry = new THREE.BufferGeometry();
    const count = 2000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 100;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 100;

        // Cyan to purple gradient colors
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

    // Rotate particles based on mouse position
    if (particles) {
        particles.rotation.x += 0.0005;
        particles.rotation.y += 0.0005;
        
        // Smooth mouse following
        particles.rotation.x += (mouseY - particles.rotation.x) * 0.02;
        particles.rotation.y += (mouseX - particles.rotation.y) * 0.02;
    }

    renderer.render(scene, camera);
};

export const cleanupThreeJS = () => {
    window.removeEventListener('resize', onWindowResize);
    document.removeEventListener('mousemove', onMouseMove);
    
    if (renderer) {
        renderer.dispose();
    }
};