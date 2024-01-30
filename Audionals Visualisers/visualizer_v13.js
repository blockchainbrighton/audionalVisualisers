import { analyser, dataArray } from './audio.js';

const canvas = document.getElementById('visualizerCanvas');
const ctx = canvas.getContext('2d');
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
let circles = [];

class Circle {
    constructor(radius, color) {
        this.radius = radius;
        this.color = color;
        this.maxRadius = Math.max(canvas.width, canvas.height) / 2;
    }

    draw() {
        if (this.radius < this.maxRadius) {
            ctx.beginPath();
            ctx.arc(centerX, centerY, this.radius, 0, 2 * Math.PI);
            ctx.strokeStyle = `rgba(${this.color}, ${this.color}, 255, 0.7)`;
            ctx.lineWidth = 2;
            ctx.stroke();
            this.radius += 3; // Increased speed of radius expansion
        }
    }
}

function drawVisualization() {
    requestAnimationFrame(drawVisualization);
    analyser.getByteFrequencyData(dataArray);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Trigger circle creation more frequently and with a wider range of dataArray values
    for (let i = 0; i < dataArray.length; i++) {
        if (dataArray[i] > 100) { // Lowered threshold for visibility
            let colorValue = Math.floor((dataArray[i] / 255) * 255);
            circles.push(new Circle(0, colorValue));
            break; // Create one circle per frame
        }
    }

    circles.forEach((circle, index) => {
        circle.draw();
        if (circle.radius >= circle.maxRadius) {
            circles.splice(index, 1);
        }
    });
}

export { drawVisualization };
