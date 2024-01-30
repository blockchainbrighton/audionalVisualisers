import { analyser, dataArray } from './audio.js';

const canvas = document.getElementById('visualizerCanvas_v16');
const ctx = canvas.getContext('2d');
const stars = [];

class Star {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random();
        this.speed = Math.random() * 3 + 1;
    }

    update() {
        this.y += this.speed;
        if (this.y > canvas.height) {
            this.y = 0;
            this.x = Math.random() * canvas.width;
        }
    }

    draw(color) {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initStars() {
    for (let i = 0; i < 100; i++) {
        stars.push(new Star());
    }
}

function drawVisualization() {
    requestAnimationFrame(drawVisualization);
    analyser.getByteFrequencyData(dataArray);

    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    stars.forEach(star => {
        const colorIndex = Math.floor(Math.random() * dataArray.length);
        const hue = dataArray[colorIndex] / 255 * 360;
        star.update();
        star.draw(`hsl(${hue}, 100%, 50%)`);
    });
}

initStars();
export { drawVisualization };
