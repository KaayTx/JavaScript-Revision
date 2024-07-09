const body = document.querySelector('body');

body.addEventListener('click', () => {
    const audioPlayer = document.querySelector('#audioPlayer');
    if(audioPlayer.paused) {
        audioPlayer.play();
    } else {
        audioPlayer.pause();
    }
});