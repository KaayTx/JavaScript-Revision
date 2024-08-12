const HomePage = () => {
  fetch('https://v2.jokeapi.dev/joke/Any?type=single')
    .then((response) => {
      if(!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);
       return response.json();
    })
    .then((data) => {
      renderCategory(data.category);
      renderJoke(data.joke);
      renderFlag(data.flags.nsfw);
    })
    .catch((err) => {
      console.error('HomePage::error: ', err);
    });
};

function renderJoke(joke) {
  const main = document.querySelector('main');
  const p = document.createElement('p');
  p.innerText = joke;
  main.appendChild(p);
}

function renderCategory(category) {
  const main = document.querySelector('main');
  const p = document.createElement('p');
  p.innerText = category;
  main.appendChild(p);
}

function renderFlag(joke) {
  const main = document.querySelector('main');
  const p = document.createElement('p');
  p.innerText = joke;
  main.appendChild(p);
}

export default HomePage;
