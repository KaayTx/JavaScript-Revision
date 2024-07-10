const divs = document.querySelectorAll('div');

divs.forEach((div) => {
  div.addEventListener('click', (e) => {
    e.target.style.width ='200px';
    e.target.style.height ='200px';

    const color = e.target.style.backgroundColor;
    e.target.textContent = color;
    
  });
});