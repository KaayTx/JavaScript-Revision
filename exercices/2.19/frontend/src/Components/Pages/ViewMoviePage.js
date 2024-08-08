import {clearPage, renderPageTitle} from '../../utils/render';

const ViewMoviePage = async () => {
    clearPage();
    renderPageTitle('View Movie');
    const movies = await fetchAllMovies();
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

async function fetchAllMovies() {
    const response = await fetch('/api/movies');
    const movies = await response.json();
    return movies;

}

export default ViewMoviePage;
