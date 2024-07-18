import {clearPage, renderPageTitle} from '../../utils/render';
import  { readAllMovies }  from '../../models/movies';

const ViewMoviePage = () => {
    clearPage();
    renderPageTitle('View Movie');
    displayMovies();
}


function displayMovies() {
    const main = document.querySelector('main');
    const films = readAllMovies();
    const table = document.createElement('table');
    table.className = 'movie-table'; // Ajout d'une classe au tableau
    table.innerHTML = `
      <tr class="movie-header">
        <th>Title</th>
        <th>Duration (min)</th>
        <th>Budget (million)</th>
      </tr>
    `;
    films.forEach(film => {
      const row = document.createElement('tr');
      row.className = 'movie-row'; // Ajout d'une classe aux lignes
      row.innerHTML = `
        <td><a href="${film.link}" target="_blank">${film.title}</a></td>
        <td>${film.duration}</td>
        <td>${film.budget}</td>
      `;
      table.appendChild(row);
    });
    main.appendChild(table);
}

export default ViewMoviePage;
