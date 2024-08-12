const HomePage = () => {
  fetch('/api/queries')
    .then((response) => {
      if(!response.ok) throw new Error('Network response was not ok');
      return response.json();
    })
    .then((queries) => {
      renderQueries(queries);
    })
    .catch((error) => {
      console.error('There has been a problem with your fetch operation:', error);
    }) 
};

function renderQueries(queries) {
  const queriesHtml = getQueriesHtml(queries);

  const main = document.querySelector('main');

  main.innerHTML += queriesHtml;
}

function getQueriesHtml(queries) {
  let queriesHtml = '';

  queries?.forEach((query) => {
    queriesHtml += `<div class="card">
      <div class="card-body">
        <h5 class="card-subject">${query.subject}</h5>
        <p class="card-status">${query.status}</p>
      </div>
    </div>`;
  }
  );

  return queriesHtml;

}

export default HomePage;

  