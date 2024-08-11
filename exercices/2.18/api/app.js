const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const corsOptions = {
  origin: 
  [
    'http://localhost:8080',
    'http://localhost:7000',
    'http://localhost:666',
  ]
};

const usersRouter = require('./routes/users');
const pizzaRouter = require('./routes/pizzas');
const moviesRouter = require('./routes/movies');

const app = express();

app.use(cors(corsOptions));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use('/users', usersRouter);
app.use('/pizzas', pizzaRouter);
app.use('/movies', moviesRouter);

module.exports = app;
