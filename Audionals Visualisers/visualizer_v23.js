import { analyser, dataArray } from './audio.js';

const canvas = document.getElementById('visualizerCanvas_v23');
const ctx = canvas.getContext('2d');
let angle = 0;

function drawVisualization() {
    requestAnimationFrame(drawVisualization);
    analyser.getByteFrequencyData(dataArray);

    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(angle);

    dataArray.forEach((value, index) => {
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(value, 0);
        ctx.strokeStyle = `hsl(${index * 360 / dataArray.length}, 100%, 50%)`;
        ctx.stroke();
        ctx.rotate(Math.PI * 2 / dataArray.length);
    });

    angle += 0.005;
    ctx.restore();
}

export { drawVisualization };
