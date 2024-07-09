const myForm = document.querySelector('form');
const div = document.querySelector('div');

myForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = document.querySelector('input');
    myForm.style.display = 'none';
    div.innerHTML = input.value;
    input.value = '';
});


