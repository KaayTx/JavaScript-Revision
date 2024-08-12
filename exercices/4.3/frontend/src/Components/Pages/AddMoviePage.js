import {clearPage, renderPageTitle} from '../../utils/render';
import Navigate from '../Router/Navigate';
import { addOneMovie } from '../../models/movies';

const AddMoviePage = () => {
    clearPage();
    renderPageTitle('Add Movie');
    renderAddMovieForm();
}


function renderAddMovieForm() {
    const main = document.querySelector('main');
    const form = document.createElement('form');
    form.innerHTML = `
      <div>
        <label for="title">Title:</label>
        <input type="text" id="title" name="title" required minlength="1">
      </div>
      <div>
        <label for="duration">Duration (minutes):</label>
        <input type="number" id="duration" name="duration" required min="1">
      </div>
      <div>
        <label for="budget">Budget (millions):</label>
        <input type="number" id="budget" name="budget" required min="1" step="0.01">
      </div>
      <div>
        <label for="link">Link:</label>
        <input type="url" id="link" name="link" required>
      </div>
      <button type="submit">Add Movie</button>
    `;
  
    main.appendChild(form);

    const title = document.querySelector('#title');
    const duration = document.querySelector('#duration');
    const budget = document.querySelector('#budget');
    const link = document.querySelector('#link');

    form.addEventListener('submit', async (event) => {
      event.preventDefault(); // Empêche le rechargement de la page
  
      const movie = {
        title: title.value,
        duration: Number(duration.value),
        budget: Number(budget.value),
        link: link.value,
      };

      await addOneMovie(movie); // Ajoute le film dans la base de données (localStorage
  
      console.log(movie); // Affiche le nouveau film enregistré dans la console
      Navigate('/view');

    });
  
  }

export default AddMoviePage;