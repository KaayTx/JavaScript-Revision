import { clearPage, renderPageTitle } from '../../utils/render';
import { readAllMovies, deleteOneMovie, updateOneMovie } from '../../models/movies';

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
      <th>Link</th>
      <th>Duration (min)</th>
      <th>Budget (million)</th>
      <th>Operations</th>
    </tr>
  `;
  films.forEach(film => {
    const row = document.createElement('tr');
    row.className = 'movie-row'; // Ajout d'une classe aux lignes
    row.innerHTML = `
      <td contenteditable="true">${film.title}</td>
      <td contenteditable="true"> <a href="${film.link}"</a>${film.link}</td>
      <td contenteditable="true">${film.duration}</td>
      <td contenteditable="true">${film.budget}</td>
      <td>
        <button type="button" class="delete-btn" data-id="${film.id}">Delete</button>
        <button type="button" class="save-btn" data-id="${film.id}">Save</button>
      </td>
    `;
    table.appendChild(row);
  });
  main.appendChild(table);

  // Écouteurs d'événements pour les boutons Delete
  const deleteButtons = document.querySelectorAll('.delete-btn');
  deleteButtons.forEach(button => {
    button.addEventListener('click', async (event) => {
      const { id } = event.target.dataset;
      await deleteOneMovie(id);
      ViewMoviePage(); // Rafraîchir la page après suppression
    });
  });

  // Écouteurs d'événements pour les boutons Save
  const saveButtons = document.querySelectorAll('.save-btn');
  saveButtons.forEach(button => {
    button.addEventListener('click', async (event) => {
      const { id } = event.target.dataset;
      const row = event.target.parentElement.parentElement;
      const updatedMovie = {
        title: row.children[0].textContent,
        link: row.children[1].textContent,
        duration: row.children[2].textContent,
        budget: row.children[3].textContent,
      };
      await updateOneMovie(id, updatedMovie);
      ViewMoviePage(); // Rafraîchir la page après mise à jour
    });
  });
}

export default ViewMoviePage;
