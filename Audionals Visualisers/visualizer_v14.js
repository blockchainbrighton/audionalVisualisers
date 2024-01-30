import { analyser, dataArray } from './audio.js';

const canvas = document.getElementById('visualizerCanvas_v14');
const ctx = canvas.getContext('2d');
const gridRows = 16;
const gridCols = 16;

function drawVisualization() {
    requestAnimationFrame(drawVisualization);
    analyser.getByteFrequencyData(dataArray);

    const cellWidth = canvas.width / gridCols;
    const cellHeight = canvas.height / gridRows;

    for (let y = 0; y < gridRows; y++) {
        for (let x = 0; x < gridCols; x++) {
            const index = Math.floor((x + y * gridCols) / (gridCols * gridRows) * dataArray.length);
            const intensity = dataArray[index] / 255;
            const hue = intensity * 360; // Frequency intensity to color hue
            ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
            ctx.fillRect(x * cellWidth, y * cellHeight, cellWidth, cellHeight);
        }
    }
}

export { drawVisualization };
