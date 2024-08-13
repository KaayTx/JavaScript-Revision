import { clearPage, renderPageTitle } from "../../utils/render";

const GestionDemandes = async () => {
  clearPage();
  renderPageTitle('Manage Queries');

  try {
    const queries = await fetchQueries();
    renderQueries(queries);
  } catch (error) {
    console.error('Error fetching queries:', error);
    alert('Failed to load queries. Please try again later.');
  }
};

async function fetchQueries() {
  const response = await fetch('/api/queries');
  if (!response.ok) {
    throw new Error(`fetch error: ${response.status} : ${response.statusText}`);
  }
  return response.json();
}

function renderQueries(queries) {
  const main = document.querySelector('main');

  queries.forEach(query => {
    const queryContainer = document.createElement('div');
    queryContainer.className = 'query-container';
    queryContainer.style.border = '1px solid #ccc';
    queryContainer.style.padding = '10px';
    queryContainer.style.marginBottom = '10px';

    queryContainer.innerHTML = `
      <p><strong>Subject:</strong> ${query.subject}</p>
      <label for="status-${query.id}">Status:</label>
      <select id="status-${query.id}" data-id="${query.id}" class="status-dropdown">
        <option value="requested" ${query.status === 'requested' ? 'selected' : ''}>requested</option>
        <option value="accepted" ${query.status === 'accepted' ? 'selected' : ''}>accepted</option>
        <option value="refused" ${query.status === 'refused' ? 'selected' : ''}>refused</option>
        <option value="done" ${query.status === 'done' ? 'selected' : ''}>done</option>
      </select>
    `;

    main.appendChild(queryContainer);
  });

  // Ajouter un écouteur d'événement pour chaque liste déroulante de statut
  const dropdowns = document.querySelectorAll('.status-dropdown');
  dropdowns.forEach(dropdown => {
    dropdown.addEventListener('change', async (event) => {
      const queryId = event.target.dataset.id;
      const newStatus = event.target.value;

      try {
        await updateQueryStatus(queryId, newStatus);
        alert('Status updated successfully');
      } catch (error) {
        console.error('Error updating status:', error);
        alert('Failed to update status. Please try again.');
      }
    });
  });
}

async function updateQueryStatus(id, status) {
  const response = await fetch(`/api/queries/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status }),
  });

  if (!response.ok) {
    throw new Error(`Failed to update query status: ${response.status} : ${response.statusText}`);
  }

  return response.json();
}

export default GestionDemandes;
