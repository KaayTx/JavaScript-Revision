import 'bootstrap/dist/css/bootstrap.min.css';
import './stylesheets/main.css';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'animate.css';

const body = document.querySelector('body');

body.addEventListener('click', startOrStopAudio);

function startOrStopAudio() {
    const audioPlayer = document.querySelector('#audioPlayer');
    if(audioPlayer.paused) {
        audioPlayer.play();
    } else {
        audioPlayer.pause();
    }
};