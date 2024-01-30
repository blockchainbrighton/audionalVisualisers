import { analyser, dataArray } from './audio.js';

const canvas = document.getElementById('visualizerCanvas_v2');
const ctx = canvas.getContext('2d');
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
const radius = 150;

function drawVisualization() {
    requestAnimationFrame(drawVisualization);

    analyser.getByteFrequencyData(dataArray);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    dataArray.forEach((value, i) => {
        const angle = Math.PI * 2 * i / dataArray.length;
        const x = centerX + (radius + value) * Math.cos(angle);
        const y = centerY + (radius + value) * Math.sin(angle);
        ctx.lineTo(x, y);
    });
    ctx.closePath();
    ctx.strokeStyle = 'rgb(255, 255, 255)';
    ctx.stroke();
}

export { drawVisualization };
