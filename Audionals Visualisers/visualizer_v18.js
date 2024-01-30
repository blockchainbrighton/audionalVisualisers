import { analyser, dataArray } from './audio.js';

const canvas = document.getElementById('visualizerCanvas_v18');
const ctx = canvas.getContext('2d');

function drawVisualization() {
    requestAnimationFrame(drawVisualization);
    analyser.getByteFrequencyData(dataArray);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);

    for (let i = 0; i < dataArray.length; i++) {
        ctx.rotate((Math.PI * 2) / dataArray.length);
        const hue = dataArray[i] / 255 * 360;
        ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(canvas.width / 4, 0);
        ctx.stroke();
    }

    ctx.restore();
}

export { drawVisualization };
