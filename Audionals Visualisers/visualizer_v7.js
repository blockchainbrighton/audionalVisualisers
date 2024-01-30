import { analyser, dataArray } from './audio.js';

const canvas = document.getElementById('visualizerCanvas');
const ctx = canvas.getContext('2d');
let particles = [];  // Changed from const to let

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 1.5 + 0.5;
        this.weight = Math.random() * 2 + 1;
        this.directionX = -2;
    }

    update(index) {
        this.weight += 0.05;
        this.y += this.weight;
        this.x += this.directionX;

        // Reinitialize particle when out of canvas bounds
        if (this.y > canvas.height) {
            this.y = 0;
            this.weight = Math.random() * 2 + 1;
            this.x = Math.random() * canvas.width * 1.5;
        }

        // React to frequency data
        if (dataArray[index] > 128) {
            this.size = 2;
            this.y -= 20;
        } else {
            this.size = Math.random() * 1.5 + 0.5;
        }
    }

    draw() {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }
}

function initParticles() {
    particles = [];
    for (let i = 0; i < dataArray.length; i++) {
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        particles.push(new Particle(x, y));
    }
}

function drawVisualization() {
    if (!dataArray || dataArray.length === 0) {
        requestAnimationFrame(drawVisualization);
        return;
    }

    if (particles.length === 0) {
        initParticles();
    }

    requestAnimationFrame(drawVisualization);
    analyser.getByteFrequencyData(dataArray);

    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < particles.length; i++) {
        particles[i].update(i);
        particles[i].draw();
    }
}

export { drawVisualization };
