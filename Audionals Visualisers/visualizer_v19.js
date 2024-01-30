import { analyser, dataArray } from './audio.js';

const canvas = document.getElementById('visualizerCanvas_v19');
const ctx = canvas.getContext('2d');
const matrixSize = 10; // Adjust the size of the matrix

function drawVisualization() {
    requestAnimationFrame(drawVisualization);
    analyser.getByteFrequencyData(dataArray);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const cellWidth = canvas.width / matrixSize;
    const cellHeight = canvas.height / matrixSize;

    for (let y = 0; y < matrixSize; y++) {
        for (let x = 0; x < matrixSize; x++) {
            const index = Math.floor((x + y * matrixSize) / (matrixSize * matrixSize) * dataArray.length);
            const size = (dataArray[index] / 255) * cellWidth;
            const hue = (dataArray[index] / 255) * 360;
            ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
            ctx.beginPath();
            ctx.arc(x * cellWidth + cellWidth / 2, y * cellHeight + cellHeight / 2, size / 2, 0, Math.PI * 2);
            ctx.fill();
        }
    }
}

export { drawVisualization };
