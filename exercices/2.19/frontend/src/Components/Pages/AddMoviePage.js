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

    form.addEventListener('submit', (event) => {
      event.preventDefault(); // Empêche le rechargement de la page
  
      const movie = {
        title: form.title.value,
        duration: form.duration.value,
        budget: form.budget.value,
        link: form.link.value,
      };

      addOneMovie(movie); // Ajoute le film dans la base de données (localStorage
  
      /* Pour afficher le film créé dans la page addMoviePage

      clearPage(); // Efface le formulaire
      const movieInfo = `
      <p>Title: ${movie.title}</p>
      <p>Duration: ${movie.duration} minutes</p>
      <p>Budget: $${movie.budget} million</p>
      <p>Link: <a href="${movie.link}" target="_blank">View More</a></p>
    `;
      const movieAdded = document.createElement('div');
      movieAdded.innerHTML = movieInfo;
      main.appendChild(movieAdded);
      */

      console.log(movie); // Affiche le nouveau film enregistré dans la console
      Navigate('/view');

    });
  
  }

export default AddMoviePage;