document.addEventListener('DOMContentLoaded', function () {
    const fileInput = document.getElementById('audioFile');
    const playButton = document.getElementById('playButton');
    const canvas = document.getElementById('visualizerCanvas');
    const ctx = canvas.getContext('2d');

    let audioContext;
    let audioSource;
    let analyser;
    let dataArray;

    fileInput.addEventListener('change', function (e) {
        const file = e.target.files[0];
        const audioUrl = URL.createObjectURL(file);

        if (audioContext) audioContext.close(); // Close any existing audio context
        audioContext = new AudioContext();

        audioSource = audioContext.createMediaElementSource(new Audio(audioUrl));
        analyser = audioContext.createAnalyser();
        audioSource.connect(analyser);
        analyser.connect(audioContext.destination);

        analyser.fftSize = 2048;
        const bufferLength = analyser.frequencyBinCount;
        dataArray = new Uint8Array(bufferLength);
    });

    playButton.addEventListener('click', function () {
        if (audioSource) {
            audioSource.mediaElement.play();
            animate();
        }
    });

    function animate() {
        requestAnimationFrame(animate);

        analyser.getByteFrequencyData(dataArray);

        ctx.fillStyle = 'rgb(0, 0, 0)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const barWidth = (canvas.width / dataArray.length) * 2.5;
        let barHeight;
        let x = 0;

        for (let i = 0; i < dataArray.length; i++) {
            barHeight = dataArray[i];

            ctx.fillStyle = `rgb(${barHeight + 100}, 50, 50)`;
            ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);

            x += barWidth + 1;
        }
    }
});
