import 'bootstrap/dist/css/bootstrap.min.css';
import '../../stylesheets/main.css';

import percyImage from '../../img/percy.jpg';
import teraImage from '../../img/bridge.jpg';

const HomePage = () => {
  renderHomePage();
}


function renderHomePage(){
    const main = document.querySelector('main');

    const h1 = document.createElement('h3');
    h1.innerHTML = 'My favorite movies !';
    h1.className = 'text-center';
    main.appendChild(h1);
    const img1 = renderImage(percyImage);
    const img2 = renderImage(teraImage);

    const row = document.createElement('div');
    row.className = 'row';
    const div1 = document.createElement('div');
    div1.className = 'col-12 col-lg-6';
    const text1 = document.createElement('h2');  
    text1.innerHTML = 'Percy Jackson';
    text1.className = 'container text-center';    
    div1.appendChild(text1);
    div1.appendChild(img1);
    const div2 = document.createElement('div');
    div2.className = 'col-12 col-lg-6';

    const text2 = document.createElement('h2');
    text2.innerHTML = 'Bridge to Terabithia';
    text2.className = 'container text-center';
    div2.appendChild(text2);
    div2.appendChild(img2);
    row.appendChild(div1);
    row.appendChild(div2);
    main.appendChild(row);

    const button = document.createElement('button');
    button.innerHTML = 'About';
    button.className = 'btn btn-primary';
    button.addEventListener('click', renderAboutPage);
    main.appendChild(button);
    
    renderFooter();
}

function renderImage(imageUrl){
    const img = document.createElement('img');
    img.src = imageUrl;
    img.className = 'img-thumbnail';

    return img;
}


function renderAboutPage(){
    const main = document.querySelector('main');
    main.innerHTML = '';

    const text = document.createElement('p');
    text.innerHTML = 'This is the page talking about the authors';

    main.appendChild(text);

    
    backButton();
}

function backButton(){
    const main = document.querySelector('main');

    const button = document.createElement('button');
    button.innerHTML = 'Back';
    button.className = 'btn btn-primary';
    button.addEventListener('click', () => {
        main.innerHTML = '';
        renderHomePage();
    });
    main.appendChild(button);
    
}

function renderFooter(){
    const footer = document.querySelector('footer');

    if (!footer.classList.contains('footer-modified')) {
        footer.className = 'text-center';
        footer.classList.add('footer-modified'); // Marque le footer comme modifié
    
        const textSmallScreen = document.createElement('h1');
        textSmallScreen.innerHTML = 'Small screen view';
        textSmallScreen.className = 'd-block d-lg-none';
    
        const textLargeScreen = document.createElement('h1');
        textLargeScreen.className = 'd-none d-lg-block';
        textLargeScreen.innerHTML = 'Large screen view';
    
        footer.appendChild(textSmallScreen);
        footer.appendChild(textLargeScreen);
    }
    
}

export default HomePage;