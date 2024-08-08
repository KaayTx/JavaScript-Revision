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
        },
        body: JSON.stringify(movie),
    });
    return response.json();
};

const deleteOneMovie = async (id) => {
    const response = await fetch(`/api/movies/${id}`, {
        method: 'DELETE',
    });
    return response.json();
};  


export {readAllMovies, addOneMovie, deleteOneMovie};
