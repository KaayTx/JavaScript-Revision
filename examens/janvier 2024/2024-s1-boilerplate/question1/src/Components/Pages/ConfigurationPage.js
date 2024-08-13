import { clearPage } from '../../utils/render';
import Navigate from '../Router/Navigate';

const ConfigurationPage = () => {
  clearPage();
  renderCarouselConfigForm();
};

function renderCarouselConfigForm() {
  const main = document.querySelector('main');
  
  const form = document.createElement('form');
  form.innerHTML = `
    <div>
      <label for="interval">Intervalle entre les citations (en millisecondes) :</label>
      <input type="number" id="interval" name="interval" min="1000" value="5000" required>
    </div>
    <button type="submit">Sauvegarder la configuration</button>
  `;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    
    const intervalValue = document.getElementById('interval').value;
    saveCarouselConfig(intervalValue);
    
    Navigate('/quotecarousel'); // Redirige vers la page du carrousel de citations
  });

  main.appendChild(form);
}

function saveCarouselConfig(interval) {
  localStorage.setItem('carouselInterval', interval); // Sauvegarde l'intervalle dans le localStorage
}

export default ConfigurationPage;
