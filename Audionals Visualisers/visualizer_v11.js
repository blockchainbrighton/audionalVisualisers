import { analyser, dataArray } from './audio.js';

const canvas = document.getElementById('visualizerCanvas_v11');
const ctx = canvas.getContext('2d');
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

function drawVisualization() {
    requestAnimationFrame(drawVisualization);
    analyser.getByteFrequencyData(dataArray);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < dataArray.length; i++) {
        const angle = (Math.PI * 2 * i) / dataArray.length;
        const length = (dataArray[i] / 255) * canvas.height / 2;
        const xEnd = centerX + length * Math.cos(angle);
        const yEnd = centerY + length * Math.sin(angle);

        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(xEnd, yEnd);
        ctx.strokeStyle = `rgba(255, ${dataArray[i]}, ${dataArray[i]}, 0.8)`;
        ctx.stroke();
    }
}

export { drawVisualization };
