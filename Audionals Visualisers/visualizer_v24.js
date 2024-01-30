import { analyser, dataArray } from './audio.js';

const canvas = document.getElementById('visualizerCanvas_v24');
const ctx = canvas.getContext('2d');
let fireworks = [];

class Firework {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 2 + 1;
        this.life = 0;
        this.color = color;
        this.velocityX = Math.random() * 5 - 2.5;
        this.velocityY = Math.random() * 5 - 2.5;
    }

    update() {
        this.x += this.velocityX;
        this.y += this.velocityY;
        this.life++;
        if (this.life > 50) {
            fireworks.splice(fireworks.indexOf(this), 1);
        }
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function handleFireworks() {
    if (dataArray[0] > 200) { // Trigger fireworks on strong beats
        let color = `hsl(${Math.random() * 360}, 100%, 50%)`;
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        for (let i = 0; i < 30; i++) {
            fireworks.push(new Firework(x, y, color));
        }
    }
    fireworks.forEach(firework => {
        firework.update();
        firework.draw();
    });
}

function drawVisualization() {
    requestAnimationFrame(drawVisualization);
    analyser.getByteFrequencyData(dataArray);

    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    handleFireworks();
}

export { drawVisualization };
