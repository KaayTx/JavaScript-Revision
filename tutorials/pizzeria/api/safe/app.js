const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const usersRouter = require('./routes/users');
const pizzaRouter = require('./routes/pizzas');
const authRouter = require('./routes/auths');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/users', usersRouter);
app.use('/pizzas', pizzaRouter);
app.use('/auths', authRouter);

module.exports = app;
