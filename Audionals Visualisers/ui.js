import { audioSource } from './audio.js';
import { drawVisualization } from './visualizer.js';

function initUI() {
    const playButton = document.getElementById('playButton');
    playButton.addEventListener('click', handlePlayButtonClick);
}

function handlePlayButtonClick() {
    if (audioSource) {
        audioSource.mediaElement.play();
        requestAnimationFrame(drawVisualization);
    }
}

export { initUI };
