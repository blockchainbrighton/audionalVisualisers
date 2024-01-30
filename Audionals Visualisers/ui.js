import { initAudio, audioSource } from './audio.js';
import { drawVisualization as drawVisualization_v1 } from './visualizer.js';
import { drawVisualization as drawVisualization_v2 } from './visualizer_v2.js';
import { drawVisualization as drawVisualization_v3 } from './visualizer_v3.js';
import { drawVisualization as drawVisualization_v4 } from './visualizer_v4.js';
import { drawVisualization as drawVisualization_v5 } from './visualizer_v5.js';
// import { drawVisualization as drawVisualization_v6 } from './visualizer_v6.js';
import { drawVisualization as drawVisualization_v7 } from './visualizer_v7.js';
import { drawVisualization as drawVisualization_v8 } from './visualizer_v8.js';
import { drawVisualization as drawVisualization_v9 } from './visualizer_v9.js';
import { drawVisualization as drawVisualization_v10 } from './visualizer_v10.js';
import { drawVisualization as drawVisualization_v11 } from './visualizer_v11.js';
import { drawVisualization as drawVisualization_v12 } from './visualizer_v12.js';
import { drawVisualization as drawVisualization_v13 } from './visualizer_v13.js';
import { drawVisualization as drawVisualization_v14 } from './visualizer_v14.js';
import { drawVisualization as drawVisualization_v15 } from './visualizer_v15.js';

function initUI() {
    const playButton = document.getElementById('playButton');
    playButton.addEventListener('click', handlePlayButtonClick);
}

function handlePlayButtonClick() {
    if (audioSource) {
        audioSource.mediaElement.play();

        // Call drawVisualization for each visualizer
        requestAnimationFrame(drawVisualization_v1);
        requestAnimationFrame(drawVisualization_v2);
        requestAnimationFrame(drawVisualization_v3);
        requestAnimationFrame(drawVisualization_v4);
        requestAnimationFrame(drawVisualization_v5);
        // requestAnimationFrame(drawVisualization_v6);
        requestAnimationFrame(drawVisualization_v7);
        requestAnimationFrame(drawVisualization_v8);
        requestAnimationFrame(drawVisualization_v9);
        requestAnimationFrame(drawVisualization_v10);
        requestAnimationFrame(drawVisualization_v11);
        requestAnimationFrame(drawVisualization_v12);
        requestAnimationFrame(drawVisualization_v13);
        requestAnimationFrame(drawVisualization_v14);
        requestAnimationFrame(drawVisualization_v15);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    initAudio();
    initUI();
});

export { initUI };
