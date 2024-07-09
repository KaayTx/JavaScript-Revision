const counter = document.querySelector('.counter');
const message = document.querySelector('.message');
const counting = document.querySelector('#count');

counter.innerHTML = 'click me';
message.innerHTML = 'Cliquez sur le bouton pour commencer à compter !';
let count = 0;

counter.addEventListener('click', () => {
    counting.innerHTML = count;
    count++;
    if (count >= 5 && count <= 9) {
        message.textContent = 'Bravo, bel échauffement !';
    } else if (count >= 10) {
        message.textContent = 'Vous êtes passé maître en l\'art du clic !';
    }
    });