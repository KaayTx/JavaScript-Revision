import {clearPage, renderPageTitle} from '../../utils/render';
import {readAllMovies, deleteOneMovie} from '../../models/movies';

const ViewMoviePage = async () => {
    clearPage();
    renderPageTitle('View Movie');
    const movies = await readAllMovies();
    displayMovies(movies);
}


function displayMovies(films) {
    const main = document.querySelector('main');
    const table = document.createElement('table');
    table.className = 'movie-table'; // Ajout d'une classe au tableau
    table.innerHTML = `
      <tr class="movie-header">
        <th>Title</th>
        <th>Duration (min)</th>
        <th>Budget (million)</th>
        <th>Delete</th>
      </tr>
    `;
    films.forEach(film => {
      const row = document.createElement('tr');
      row.className = 'movie-row'; // Ajout d'une classe aux lignes
      row.innerHTML = `
        <td><a href="${film.link}" target="_blank">${film.title}</a></td>
        <td>${film.duration}</td>
        <td>${film.budget}</td>
      <td><button type="button" data-id="${film.id}">Delete</button></td>
      `;
      table.appendChild(row);
    });
    main.appendChild(table);
   
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
      button.addEventListener('click', async (event) => {
        const {id} = event.target.dataset;
        await deleteOneMovie(id);
        ViewMoviePage();
      });
    });
}

export default ViewMoviePage;
