let audioContext;
let audioSource;
let analyser;
let dataArray;

function initAudio() {
    const fileInput = document.getElementById('audioFile');
    fileInput.addEventListener('change', handleFileChange);
}

function handleFileChange(e) {
    const file = e.target.files[0];
    const audioUrl = URL.createObjectURL(file);
    setupAudioContext(audioUrl);
}

function setupAudioContext(audioUrl) {
    if (audioContext) audioContext.close();
    audioContext = new AudioContext();
    audioSource = audioContext.createMediaElementSource(new Audio(audioUrl));
    analyser = audioContext.createAnalyser();
    audioSource.connect(analyser);
    analyser.connect(audioContext.destination);
    analyser.fftSize = 2048;
    const bufferLength = analyser.frequencyBinCount;
    dataArray = new Uint8Array(bufferLength);
}

export { initAudio, audioContext, audioSource, analyser, dataArray };
