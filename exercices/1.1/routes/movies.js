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
  res.json(MOVIES);
});

module.exports = router;
