import { analyser, dataArray } from './audio.js';

const canvas = document.getElementById('visualizerCanvas_v20');
const ctx = canvas.getContext('2d');
let splashArray = [];

class Splash {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }

    update() {
        this.radius += 1; // Increase the radius to create an expanding effect
        this.draw();
    }
}

function drawVisualization() {
    requestAnimationFrame(drawVisualization);
    analyser.getByteFrequencyData(dataArray);

    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'; // Apply a fade effect
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (dataArray[0] > 180) { // Trigger for creating a new splash
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const radius = 0;
        const hue = Math.random() * 360;
        splashArray.push(new Splash(x, y, radius, `hsl(${hue}, 100%, 50%)`));
    }

    splashArray.forEach((splash, index) => {
        splash.update();
        if (splash.radius > 100) { // Remove splash when it gets too large
            splashArray.splice(index, 1);
        }
    });
}

export { drawVisualization };
