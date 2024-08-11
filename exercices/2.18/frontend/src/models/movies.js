const movies = [];

const readAllMovies = () => fetch('http://localhost:3000/movies').then((response) => response.json());

const addOneMovie = (movie) => movies.push(movie);

export { readAllMovies, addOneMovie };
