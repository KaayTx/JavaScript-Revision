const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const path = require('node:path');
const { parse, serialize } = require('../utils/json');

const jwtSecret = 'ilovemypizza!';
const lifetimeJwt = 24 * 60 * 60 * 1000; // in ms : 24 * 60 * 60 * 1000 = 24h

const saltRounds = 10;

const jsonDbPath = path.join(__dirname, '/../data/users.json');
const jsonDbPathQuotes = path.join(__dirname, '/../data/quotes.json');

const jsonDbPathEvaluations = path.join(__dirname, '/../data/evaluations.json');

const defaultUsers = [
  {
    id: 1,
    username: 'admin',
    password: bcrypt.hashSync('admin', saltRounds),
  },
];

const defaultEvaluations = [];

async function login(username, password) {
  const userFound = readOneUserFromUsername(username);
  if (!userFound) return undefined;

  const passwordMatch = await bcrypt.compare(password, userFound.password);
  if (!passwordMatch) return undefined;

  const token = jwt.sign(
    { username }, // session data added to the payload (payload : part 2 of a JWT)
    jwtSecret, // secret used for the signature (signature part 3 of a JWT)
    { expiresIn: lifetimeJwt }, // lifetime of the JWT (added to the JWT payload)
  );

  const authenticatedUser = {
    username,
    token,
  };

  return authenticatedUser;
}

async function register(username, password) {
  const userFound = readOneUserFromUsername(username);
  if (userFound) return undefined;

  await createOneUser(username, password);

  const token = jwt.sign(
    { username }, // session data added to the payload (payload : part 2 of a JWT)
    jwtSecret, // secret used for the signature (signature part 3 of a JWT)
    { expiresIn: lifetimeJwt }, // lifetime of the JWT (added to the JWT payload)
  );

  const authenticatedUser = {
    username,
    token,
  };

  return authenticatedUser;
}

function readOneUserFromUsername(username) {
  const users = parse(jsonDbPath, defaultUsers);
  const indexOfUserFound = users.findIndex((user) => user.username === username);
  if (indexOfUserFound < 0) return undefined;

  return users[indexOfUserFound];
}

async function createOneUser(username, password) {
  const users = parse(jsonDbPath, defaultUsers);

  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const createdUser = {
    id: getNextId(),
    username,
    password: hashedPassword,
  };

  users.push(createdUser);

  serialize(jsonDbPath, users);

  return createdUser;
}

function getNextId() {
  const users = parse(jsonDbPath, defaultUsers);
  const lastItemIndex = users?.length !== 0 ? users.length - 1 : undefined;
  if (lastItemIndex === undefined) return 1;
  const lastId = users[lastItemIndex]?.id;
  const nextId = lastId + 1;
  return nextId;
}

function submitEvaluation(id, score, username) {
  const quotes = parse(jsonDbPathQuotes);
  const evaluations = parse(jsonDbPathEvaluations, defaultEvaluations);

  // Check if the quote exists
  const quoteExists = quotes.some((quote) => quote.id === Number(id));
  if (!quoteExists) {
    throw new Error('Citation not found');
  }

  // Check if the user has already evaluated this quote
  const evaluationExists = evaluations.some(
    (evaluation) => evaluation.idQuote === Number(id) && evaluation.username === username
  );
  if (evaluationExists) {
    throw new Error('Evaluation already exists');
  }

  // Add the new evaluation
  const newEvaluation = {
    idQuote: Number(id),
    username,
    score: Number(score),
  };

  evaluations.push(newEvaluation);

  // Save the evaluations to the JSON file
  serialize(jsonDbPathEvaluations, evaluations);

  return newEvaluation;
}
module.exports = {
  login,
  register,
  readOneUserFromUsername,
  submitEvaluation
};
