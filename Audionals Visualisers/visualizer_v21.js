import { analyser, dataArray } from './audio.js';

const canvas = document.getElementById('visualizerCanvas_v21');
const ctx = canvas.getContext('2d');
const lineCount = 50;

function drawVisualization() {
    requestAnimationFrame(drawVisualization);
    analyser.getByteFrequencyData(dataArray);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < lineCount; i++) {
        const angle = (Math.PI * 2 / lineCount) * i;
        const x1 = canvas.width / 2 + Math.cos(angle) * 150;
        const y1 = canvas.height / 2 + Math.sin(angle) * 150;
        const x2 = canvas.width / 2 + Math.cos(angle) * (150 + dataArray[i] / 2);
        const y2 = canvas.height / 2 + Math.sin(angle) * (150 + dataArray[i] / 2);

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = `hsl(${dataArray[i] * 360 / 255}, 100%, 50%)`;
        ctx.lineWidth = 2;
        ctx.stroke();
    }
}

export { drawVisualization };
