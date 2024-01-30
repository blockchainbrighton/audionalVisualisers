import { analyser, dataArray } from './audio.js';

const canvas = document.getElementById('visualizerCanvas_v17');
const ctx = canvas.getContext('2d');
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
let radius = 0;

function drawVisualization() {
    requestAnimationFrame(drawVisualization);
    analyser.getByteFrequencyData(dataArray);

    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const frequency = dataArray[0];
    const hue = frequency / 255 * 360;
    radius += frequency / 20;

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
    ctx.lineWidth = 2;
    ctx.stroke();

    if (radius > canvas.width) {
        radius = 0;
    }
}

export { drawVisualization };
