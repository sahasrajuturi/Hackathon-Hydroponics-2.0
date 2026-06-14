/**
 * FARMSPHERICA HYDROPONICS CATALOG SYSTEM 
 * Core Functionality: Live Filtering, 3D Canvas Background, & Interactive Card Tilts.
 */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. THREE.JS 3D BACKGROUND ENGINE
    // ==========================================
    const canvas = document.querySelector('#three-canvas');
    if (canvas) {
        // Initialize WebGL Renderer
        const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
        camera.position.z = 5;

        // Dynamic viewport resize calculator
        const resizeCanvas = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        // Build Organic Particle Matrix (Represents pristine nutrient air bubbles)
        const particlesCount = 120;
        const positions = new Float32Array(particlesCount * 3);

        for (let i = 0; i < particlesCount * 3; i += 3) {
            positions[i] = (Math.random() - 0.5) * 10;     // Random X Coordinate
            positions[i + 1] = (Math.random() - 0.5) * 8;  // Random Y Coordinate
            positions[i + 2] = (Math.random() - 0.5) * 4;  // Random Z Coordinate
        }

        const particleGeo = new THREE.BufferGeometry();
        particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        // Create pristine circular alpha textures for the nodes
        const canvasPoint = document.createElement('canvas');
        canvasPoint.width = 16;
        canvasPoint.height = 16;
        const ctx = canvasPoint.getContext('2d');
        const grad = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
        grad.addColorStop(0, 'rgba(34, 197, 94, 0.8)'); // Bright Farmspherica Green
        grad.addColorStop(1, 'rgba(34, 197, 94, 0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 16, 16);
        const pointTexture = new THREE.CanvasTexture(canvasPoint);

        const particleMat = new THREE.PointsMaterial({
            size: 0.22,
            map: pointTexture,
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        });

        const particleMesh = new THREE.Points(particleGeo, particleMat);
        scene.add(particleMesh);

        // Ambient Lighting Rig
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        scene.add(ambientLight);

        // Real-time Screen Mouse Track Variables
        let mouseX = 0;
        let mouseY = 0;
        window.addEventListener('mousemove', (e) => {
            mouseX = (e.clientX / window.innerWidth) - 0.5;
            mouseY = (e.clientY / window.innerHeight) - 0.5;
        });

        // 3D Rendering & Animation Loop
        const clock = new THREE.Clock();
        const animate = () => {
            const elapsedTime = clock.getElapsedTime();

            // Self-guided idle rotational drift
            particleMesh.rotation.y = elapsedTime * 0.02;
            particleMesh.rotation.x = elapsedTime * 0.01;

            // Interactive mouse parallax damping interpolation (lerp)
            camera.position.x += (mouseX * 1.5 - camera.position.x) * 0.05;
            camera.position.y += (-mouseY * 1.5 - camera.position.y) * 0.05;
            camera.lookAt(scene.position);

            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        };
        animate();
    }


    // ==========================================
    // 2. LIVE DYNAMIC PRODUCT FILTER LOGIC
    // ==========================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Deactivate styling on all other buttons, activate current target
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const activeFilter = button.getAttribute('data-filter');

            productCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');

                // Toggle invisibility CSS classes with hardware-accelerated transforms
                if (activeFilter === 'all' || cardCategory === activeFilter) {
                    card.classList.remove('card-hidden');
                } else {
                    card.classList.add('card-hidden');
                }
            });
        });
    });


    // ==========================================
    // 3. HARDWARE-ACCELERATED 3D CARD TILT EFFECT
    // ==========================================
    productCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();

            // Calculate absolute coordinate map relative to the current container element
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Deduce element midpoints
            const xc = rect.width / 2;
            const yc = rect.height / 2;

            // Translate absolute positions into relative tilting degree boundaries
            const rotateX = (yc - y) / 12;
            const rotateY = (x - xc) / 12;

            // Apply interactive matrix transformations directly to styling layers
            card.style.transform = `translateY(-8px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        // Safe Reset Trigger
        card.addEventListener('mouseleave', () => {
            // Restore neutral structural properties smoothly when cursor departs
            card.style.transform = 'translateY(0px) rotateX(0deg) rotateY(0deg)';
        });
    });
});