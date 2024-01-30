import { analyser, dataArray } from './audio.js';

const canvas = document.getElementById('visualizerCanvas_v9');
const ctx = canvas.getContext('2d');
let particles = [];

class FlowParticle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = 0;
        this.size = Math.random() * 3 + 1;
        this.speed = Math.random() * 2 + 0.5;
        this.angle = 0;
    }

    update() {
        this.angle += 0.01;
        this.y += this.speed;
        this.x += Math.sin(this.angle * 5);
        if (this.y > canvas.height) {
            this.y = 0;
            this.x = Math.random() * canvas.width;
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.fill();
    }
}

function initFlowParticles() {
    for (let i = 0; i < 100; i++) {
        particles.push(new FlowParticle());
    }
}

function drawVisualization() {
    requestAnimationFrame(drawVisualization);
    analyser.getByteFrequencyData(dataArray);

    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });
}

initFlowParticles();
export { drawVisualization };
