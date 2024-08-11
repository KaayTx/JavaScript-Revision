const express = require('express');
const { getAllMovies, readOneFilm, createMovie, deleteOneMovie, updateOneMovie, updateOrCreateMovie} = require('../models/movies');

const router = express.Router();


router.get('/', (req, res) => {
  
  const minimumDuration = getAllMovies(req?.query?.['minimum-duration']);

  if (minimumDuration === undefined) return res.sendStatus(400);

  return res.json(minimumDuration);
});

router.get('/:id', (req, res) => {
 
  const movieID = readOneFilm(req?.params?.id);
  if (movieID < 0) return res.sendStatus(404);

  return res.json(movieID);
});

router.post('/', (req, res) => {
  const title = req?.body?.title?.trim()?.length !== 0 ? req.body.title : undefined;
  const duration = typeof req?.body?.duration !== 'number' ||  req.body.duration < 0 ? undefined : req.body.duration;
  const budget = typeof req?.body?.budget !== 'number' || req.body.budget < 0 ? undefined : req.body.budget;
  const link = req?.body?.link?.trim().length !== 0 ? req.body.link : undefined;

  if (!title || !duration || !budget || !link) return res.send(400);

  const newMovie = createMovie(title, duration, budget, link);

  return res.json(newMovie);
});

router.delete('/:id', (req, res) => {
  
  const movieID = deleteOneMovie(req.params.id);
  if (movieID < 0) return res.sendStatus(404);
  return res.json(movieID);
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

  const movie = updateOneMovie(req.params.id, req.body);

  if (!movie) return res.sendStatus(404);

  return res.json(movie);
});

router.put('/:id', (req, res) => {
  const {title} = req.body;
  const {duration} = req.body;
  const {budget} = req.body;
  const {link} = req.body;

  if (!title || !duration || !budget || !link) return res.sendStatus(400);

  const movie = updateOrCreateMovie(req?.params?.id, req?.body);

    return res.json(movie);
});

module.exports = router;
