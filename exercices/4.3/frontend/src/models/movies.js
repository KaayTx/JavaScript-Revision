const { getAuthenticatedUser } = require('../utils/auths');

const readAllMovies = async () => {
    const response = await fetch('/api/movies');
    const movies = await response.json();
    return movies;
};

const addOneMovie = async (movie) => {
    const response = await fetch('/api/movies', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: getAuthenticatedUser().token,
        },
        body: JSON.stringify(movie),
    });
    return response.json();
};

const deleteOneMovie = async (id) => {
    const response = await fetch(`/api/movies/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: getAuthenticatedUser().token,
        },
    });
    return response.json();
};  

const updateOneMovie = async (id, movie) => {
    const response = await fetch(`/api/movies/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: getAuthenticatedUser().token,
        },
        body: JSON.stringify(movie),
    });
    return response.json();
}


export {readAllMovies, addOneMovie, deleteOneMovie, updateOneMovie};
