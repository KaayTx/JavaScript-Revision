var express = require('express');
var router = express.Router();

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

router.get('/', function(req, res, next) {
  const minimumDuration = req?.query ? Number(req.query['minimum-duration']) : undefined;

  let sortByDuration;
  
  if(typeof minimumDuration !== 'number' || minimumDuration <= 0) return res.sendStatus(400);
  
  if(!minimumDuration) return res.json(MOVIES);
  
  sortByDuration = MOVIES.filter((film) => film.duration >= minimumDuration);

  return res.json(sortByDuration);
});

router.get('/:id', function(req, res, next) {

  const movieID = MOVIES.findIndex((movie) => movie.id == req.params.id);

  if(movieID < 0) return res.sendStatus(404);

  res.json(MOVIES[movieID]);
});

router.post('/', function(req, res, next) {
  const title = req?.body?.title?.length !== 0 ? req.body.title : undefined;
  const duration = req?.body?.duration?.length !== 0 ? req.body.duration : undefined;
  const budget = req?.body?.budget?.length !== 0 ? req.body.budget : undefined;
  const link = req?.body?.link?.length !== 0 ? req.body.link : undefined;

  if(!title || !duration || !budget || !link) return res.send(400);

  const existingMovie = MOVIES.find((movie) => movie.title.toLowerCase() === title.toLowerCase());
  if(existingMovie)
    return res.sendStatus(409);

  const lastMovieID = MOVIES?.length !== 0 ? MOVIES.length -1 : undefined;
  const lastId = lastMovieID !== undefined ? MOVIES[lastMovieID]?.id : 0;
  const nextId = lastId + 1;

  const newMovie = {
    id: nextId,
    title: title,
    duration: duration,
    budget: budget,
    link: link,
  };


  MOVIES.push(newMovie);

  res.json(newMovie);

});

module.exports = router;
