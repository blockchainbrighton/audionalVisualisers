import { analyser, dataArray } from './audio.js';

const canvas = document.getElementById('visualizerCanvas_v6');
const ctx = canvas.getContext('2d');
const particles = [];
const maxParticles = 100;
let hue = 0;

class Particle {
    constructor() {
        this.x = canvas.width / 2;
        this.y = canvas.height / 2;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 4 - 2;
        this.speedY = Math.random() * 4 - 2;
        this.color = 'hsl(' + hue + ', 100%, 50%)';
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.2) this.size -= 0.1;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function handleParticles() {
    if (particles.length < maxParticles) {
        particles.push(new Particle());
    }
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
        if (particles[i].size <= 0.2) {
            particles.splice(i, 1);
            i--;
        }
    }
}

function drawVisualization() {
    requestAnimationFrame(drawVisualization);
    analyser.getByteFrequencyData(dataArray);

    ctx.fillStyle = 'rgba(0, 0, 0, 0.02)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    hue += 0.5;

    for (let i = 0; i < dataArray.length; i++) {
        const radius = (Math.PI * 2 / dataArray.length) * i;
        const barHeight = dataArray[i] / 2;
        ctx.beginPath();
        ctx.rotate(radius);
        ctx.moveTo(0, 0);
        ctx.lineTo(0, barHeight);
        ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
        ctx.lineWidth = 2;
        ctx.stroke();
    }

    ctx.restore();
    handleParticles();
}

export { drawVisualization };
