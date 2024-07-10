const button = document.querySelector('button');
const span = document.querySelector('span');

let startTime;
let timeoutId;
const time = 5;
const timeMiliseconds = 5 * 1000;
let count = 0;

button.addEventListener('mouseover', () => {
    startTime = Date.now();
    count = 0;

    setTimeout(() => {
        if(count < 10) {
            span.innerHTML = 'Game over ! You did not click 10 times within 5 seconds';
        }
    }, timeMiliseconds);
});

button.addEventListener('click', () => {
    count++;
    if(count >= 10) {
        clearTimeout(timeoutId);
        const endTime = Date.now() - startTime;
        span.innerHTML = `You win ! You clicked ${count} times within ${endTime} ms`;
    };
});