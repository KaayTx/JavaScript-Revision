const express = require('express');
const { serialize, parse } = require('../utils/json');

const router = express.Router();

const jsonDbPath = `${__dirname  }/../data/pizzas.json`;

const MOVIES = [
  {
    id: 1,
    title: 'Percy Jackson',
    duration: 145,
    budget: 30000,
    link: '',
  },
  {
    id: 2,
    title: 'Harry Potter',
    duration: 165,
    budget: 120000,
    link: '',
  },
  {
    id: 3,
    title: 'Aladdin',
    duration: 180,
    budget: 50000,
    link: '',
  },
];

router.get('/', (req, res) => {
  const minimumDuration = req?.query ? Number(req.query['minimum-duration']) : undefined;

  let sortByDuration;

  if (typeof minimumDuration !== 'number' || minimumDuration <= 0) return res.sendStatus(400);

  const movies = parse(jsonDbPath, MOVIES);

  if (!minimumDuration) return res.json(movies);

  // eslint-disable-next-line prefer-const
  sortByDuration = movies.filter((film) => film.duration >= minimumDuration);

  return res.json(sortByDuration);
});

router.get('/:id', (req, res) => {
  const movies = parse(jsonDbPath, MOVIES);

  const movieID = movies.findIndex((movie) => movie.id === Number(req.params.id));

  if (movieID < 0) return res.sendStatus(404);

  return res.json(movies[movieID]);
});

router.post('/', (req, res) => {
  const title = req?.body?.title?.length !== 0 ? req.body.title : undefined;
  const duration = req?.body?.duration?.length !== 0 ? req.body.duration : undefined;
  const budget = req?.body?.budget?.length !== 0 ? req.body.budget : undefined;
  const link = req?.body?.link?.length !== 0 ? req.body.link : undefined;

  if (!title || !duration || !budget || !link) return res.send(400);

  const movies = parse(jsonDbPath, MOVIES);

  const existingMovie = movies.find((movie) => movie.title.toLowerCase() === title.toLowerCase());
  if (existingMovie) return res.sendStatus(409);

  const lastMovieID = movies?.length !== 0 ? movies.length - 1 : undefined;
  const lastId = lastMovieID !== undefined ? movies[lastMovieID]?.id : 0;
  const nextId = lastId + 1;

  const newMovie = {
    id: nextId,
    title,
    duration,
    budget,
    link,
  };

  movies.push(newMovie);

  serialize(jsonDbPath, movies);

  return res.json(newMovie);
});

router.delete('/:id', (req, res) => {
  const movies = parse(jsonDbPath, MOVIES);

  const movieID = movies.findIndex((movie) => movie.id === Number(req.params.id));

  if (movieID < 0) return res.sendStatus(404);

  const indexMovieFound = movies.splice(movieID, 1);
  serialize(jsonDbPath, movies);

  return res.json(indexMovieFound[0]);
});

router.patch('/:id', (req, res) => {
  const {title} = req.body;
  const {duration} = req.body;
  const {budget} = req.body;
  const {link} = req.body;

  if (
    (!title && !duration && !budget && !link) ||
    title.length !== 0 ||
    duration.length !== 0 ||
    budget.length !== 0 ||
    link.length !== 0
  )
    return res.sendStatus(400);

  const movies = parse(jsonDbPath, MOVIES);

  // eslint-disable-next-line no-shadow
  const movie = movies.findIndex((movie) => movie.id === Number(req.params.id));

  if (!movie) return res.sendStatus(404);

  const updatedMovie = { ...movies[movie], ...req.body };

  movies[movie] = updatedMovie;

  serialize(jsonDbPath, movies);

  return res.json(updatedMovie);
});

router.put('/:id', (req, res) => {
  const {title} = req.body;
  const {duration} = req.body;
  const {budget} = req.body;
  const {link} = req.body;

  if (!title || !duration || !budget || !link) return res.sendStatus(400);

  const movies = parse(jsonDbPath, MOVIES);

  // eslint-disable-next-line no-shadow
  const movie = movies.findIndex((movie) => movie.id === Number(req.params.id));

  if (movie < 0) {
    const newMovie = {
      id: req.params.id,
      title,
      duration,
      budget,
      link,
    };
    movies.push(newMovie);

    serialize(jsonDbPath, movies);

    return res.json(newMovie);
  }

  const updatedMovie = { ...movies[movie], ...req.body };

  movies[movie] = updatedMovie;

  serialize(jsonDbPath, movies);

  return res.json(updatedMovie);
});

module.exports = router;
