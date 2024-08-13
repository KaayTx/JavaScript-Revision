import { clearPage, renderPageTitle } from "../../utils/render";
import defaultImage from "../../img/tingey-injury-law-firm-unsplash-low-res.jpg";

const CarouselPage = async () => {
    clearPage();
    renderPageTitle('Carrousel de citations');
    
    const quotes = await renderQuotes();
    if (quotes.length === 0) {
      displayMessage("Aucune citation disponible.");
      return;
    }

    renderCarousel(quotes);
};

function renderCarousel(quotes) {
    const main = document.querySelector('main');
    const carouselContainer = document.createElement('div');
    carouselContainer.className = 'carousel-container';
    main.appendChild(carouselContainer);
  
    let currentQuoteIndex = 0;
    let quoteInterval; // Déclarer la variable ici pour éviter l'erreur ESLint
    const interval = localStorage.getItem('carouselInterval') || 5000; // Récupère l'intervalle depuis le localStorage

    async function showNextQuote() {
      if (currentQuoteIndex < quotes.length) {
        const { thinker, quote } = quotes[currentQuoteIndex];
        let {image} = quotes[currentQuoteIndex];

        try {
          // Vérification de l'existence de l'image
          const response = await fetch(image);
          if (!response.ok) {
            throw new Error("Image not found");
          }
        } catch (error) {
          // Si l'image n'existe pas ou si une erreur se produit, utiliser l'image par défaut
          image = defaultImage;
        }

        carouselContainer.innerHTML = `
          <div class="quote">
            <h2>${thinker}</h2>
            <p>${quote}</p>
            <img src="${image}" alt="${thinker}" class="thinker-image" />
          </div>
        `;

        currentQuoteIndex += 1; // Utilisation de += 1 au lieu de ++
      } else {
        displayMessage("Rechargez la page si vous souhaitez réafficher le carrousel des citations !");
        clearInterval(quoteInterval);
      }
    }
  
    quoteInterval = setInterval(showNextQuote, interval);
  
    // Afficher la première citation immédiatement
    showNextQuote();
}
  


async function renderQuotes() {
    const response = await fetch('/api/quotes');
    if (!response.ok) {
      throw new Error(`fetch error : ${response.status} : ${response.statusText}`);
    }
    const quotes = await response.json();
  
    console.log("Quotes : ", quotes);
  
    return quotes;
}
  
function displayMessage(message) {
    const main = document.querySelector('main');
    main.innerHTML = ''; // Effacer le contenu précédent
    const messageElement = document.createElement('p');
    messageElement.textContent = message;
    main.appendChild(messageElement);
}
  
export default CarouselPage;
