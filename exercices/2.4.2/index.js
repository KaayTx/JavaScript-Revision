const red = document.querySelector('.red');
const orange = document.querySelector('.orange');
const green = document.querySelector('.green');

let timerId;
const time = 2;
const timeMillis = time * 1000;

const interval = 4;
const intervalMillis = interval * 1000;

startLightsRed();

function startLightsRed() {
    timerId = setInterval(() => {
        red.style.backgroundColor = 'red';
    }, timeMillis);
    setTimeout(() => {
        clearInterval(timerId);
        clearColorGreen();
        startLightsOrange();
    }, timeMillis);
};

function startLightsOrange() {
    timerId = setInterval(() => {
        orange.style.backgroundColor = 'orange';
    }, timeMillis);
    setTimeout(() => {
        clearInterval(timerId);
        clearColorRed();
        clearColorGreen();
        startLightsGreen();
    }, timeMillis);
};

function startLightsGreen() {
    timerId = setInterval(() => {
        green.style.backgroundColor = 'green';
    }, timeMillis);
    setTimeout(() => {
        clearInterval(timerId);
        clearColorOrange();
        startLightsOrange();
    }, timeMillis);
};

function clearColorRed(){
    red.style.backgroundColor = 'white';
}

function clearColorOrange(){
    orange.style.backgroundColor = 'white';
}

function clearColorGreen(){
    green.style.backgroundColor = 'white';
}