import { analyser, dataArray } from './audio.js';

const canvas = document.getElementById('visualizerCanvas');
const ctx = canvas.getContext('2d');
const gridRows = 8;
const gridCols = 8;

function drawVisualization() {
    requestAnimationFrame(drawVisualization);
    analyser.getByteFrequencyData(dataArray);

    const cellWidth = canvas.width / gridCols;
    const cellHeight = canvas.height / gridRows;
    let dataIndex = 0;

    for (let y = 0; y < gridRows; y++) {
        for (let x = 0; x < gridCols; x++) {
            const freqValue = dataArray[dataIndex];
            const hue = (freqValue / 255) * 360;
            ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
            ctx.fillRect(x * cellWidth, y * cellHeight, cellWidth, cellHeight);
            dataIndex = (dataIndex + 1) % dataArray.length;
        }
    }
}

export { drawVisualization };
