const movies = [];

const readAllMovies = () => fetch('/api/movies').then((response) => response.json());

const addOneMovie = (movie) => movies.push(movie);

export { readAllMovies, addOneMovie };
