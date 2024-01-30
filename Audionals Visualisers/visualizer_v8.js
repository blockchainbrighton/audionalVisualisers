import { analyser, dataArray } from './audio.js';

const canvas = document.getElementById('visualizerCanvas');
const ctx = canvas.getContext('2d');
const particles = [];
const shapes = ['circle', 'square']; // Add more shapes as needed

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.shape = shapes[Math.floor(Math.random() * shapes.length)];
    }

    update() {
        this.x += Math.random() * 2 - 1;
        this.y += Math.random() * 2 - 1;
    }

    draw() {
        ctx.beginPath();
        if (this.shape === 'circle') {
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        } else if (this.shape === 'square') {
            ctx.rect(this.x, this.y, this.size, this.size);
        }
        ctx.closePath();
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.fill();
    }
}

function initParticles() {
    for (let i = 0; i < 100; i++) { // Adjust number of particles as needed
        particles.push(new Particle());
    }
}

function drawVisualization() {
    requestAnimationFrame(drawVisualization);
    analyser.getByteFrequencyData(dataArray);

    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
        p.update();
        p.draw();
    });
}

initParticles();
export { drawVisualization };
