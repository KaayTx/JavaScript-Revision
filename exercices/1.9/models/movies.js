const { serialize, parse } = require('../utils/json');

const jsonDbPath = `${__dirname  }/../data/movies.json`;


function getAllMovies(minimumDuration) {

    const movies = parse(jsonDbPath);

    if(minimumDuration === undefined) return movies;

    const numberDuration = Number(minimumDuration);
    if(Number.isNaN(numberDuration) || numberDuration < 0) return undefined;
  
    const sortByDuration = movies.filter((film) => film.duration >= minimumDuration);
    return sortByDuration;

};

function readOneFilm(id) {
    const movies = parse(jsonDbPath);

    const movieID = movies.findIndex((movie) => movie.id === Number(id));
    if (movieID < 0) return undefined;
    return movies[movieID];
};

function createMovie(title, duration, budget, link){
  const movies = parse(jsonDbPath);

  const newMovie = {
    id: nextId(),
    title,
    duration,
    budget,
    link,
  };

  movies.push(newMovie);

  serialize(jsonDbPath, movies);
  return newMovie;
}

function nextId(){
    const movies = parse(jsonDbPath);
    const lastMovieID = movies?.length !== 0 ? movies.length - 1 : undefined;
    if(lastMovieID === undefined) return 1;
    const lastId = movies[lastMovieID]?.id;
    return lastId + 1;
}

function deleteOneMovie(id){
    const movies = parse(jsonDbPath);

    const movieID = movies.findIndex((movie) => movie.id === Number(id));
    if(movieID < 0) return undefined;

    const indexMovieFound = movies.splice(movieID, 1);
    serialize(jsonDbPath, movies);
    return indexMovieFound[0];
}

function updateOneMovie(id, propertiesToUpdate){
    const movies = parse(jsonDbPath);

    const movieID = movies.findIndex((movie) => movie.id === Number(id));
    if(movieID < 0) return undefined;

    const updatedMovie = { ...movies[movieID], ...propertiesToUpdate };

    movies[movieID] = updatedMovie;

    serialize(jsonDbPath, movies);

    return updatedMovie;
}

function updateOrCreateMovie(id, propertiesToUpdate){
    const movies = parse(jsonDbPath);

    const movieID = movies.findIndex((movie) => movie.id === Number(id));

    if(movieID < 0){
        const newMovie = {
            id,
            ...propertiesToUpdate,
        };
        movies.push(newMovie);

        serialize(jsonDbPath, movies);

        return newMovie;
    }

    const updatedMovie = { ...movies[movieID], ...propertiesToUpdate };

    movies[movieID] = updatedMovie;

    serialize(jsonDbPath, movies);

    return updatedMovie;
}
module.exports = { getAllMovies, readOneFilm, createMovie, deleteOneMovie, updateOneMovie, updateOrCreateMovie };