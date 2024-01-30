import { analyser, dataArray } from './audio.js';

const canvas = document.getElementById('visualizerCanvas');
const ctx = canvas.getContext('2d');

function drawVisualization() {
    requestAnimationFrame(drawVisualization);
    analyser.getByteFrequencyData(dataArray);
    renderCanvas();
}

function renderCanvas() {
    ctx.fillStyle = 'rgb(0, 0, 0)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    const barWidth = (canvas.width / dataArray.length) * 2.5;
    let x = 0;
    for (let i = 0; i < dataArray.length; i++) {
        const barHeight = dataArray[i];
        ctx.fillStyle = `rgb(${barHeight + 100}, 50, 50)`;
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
        x += barWidth + 1;
    }
}

export { drawVisualization };
