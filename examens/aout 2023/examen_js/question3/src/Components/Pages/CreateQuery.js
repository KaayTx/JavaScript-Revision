import { clearPage, renderPageTitle } from '../../utils/render';
import Navigate from '../Router/Navigate';

const CreateQueryPage = () => {
  clearPage();
  renderPageTitle('Create a Query');

  // Rendu du formulaire de création de la demande
  renderCreateQueryForm();
};

function renderCreateQueryForm() {
  const main = document.querySelector('main');
  const form = document.createElement('form');
  form.className = 'query-form';

  form.innerHTML = `
    <div>
      <label for="subject">Subject:</label>
      <input type="text" id="subject" name="subject" required />
    </div>
    <button type="submit">Submit</button>
  `;

  main.appendChild(form);

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const subject = document.getElementById('subject').value.trim();

    if (subject) {
      // Appel au backend pour créer la demande
      const isSuccess = await createQuery(subject);

      if (isSuccess) {
        // Redirection vers la page de gestion des demandes après succès
        Navigate('/queries');
      } else {
        alert('Failed to create the query. Please try again.');
      }
    }
  });
}

async function createQuery(subject) {
  try {
    const response = await fetch('/api/queries', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ subject, status: 'requested' }),
    });

    if (!response.ok) {
      throw new Error('Failed to create the query');
    }

    return true;
  } catch (error) {
    console.error('Error:', error);
    return false;
  }
}

export default CreateQueryPage;
