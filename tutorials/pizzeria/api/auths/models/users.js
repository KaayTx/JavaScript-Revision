const jwt = require('jsonwebtoken');

const path = require('node:path');
const { parse, serialize } = require('../utils/json');

const jsonDbPath = path.join(__dirname, '/../data/users.json');
const jwtSecret = 'ilovemypizza!';
const lifetimeJwt = 24 * 60 * 60 * 1000; // in ms : 24 * 60 * 60 * 1000 = 24h

const defaultUsers = [
    {
        username: 'admin',
        password: 'admin',
    }
];

function login(username, password) {

    const user = readOneUser(username);
    if (!user) return undefined;

    if (user.password !== password) return undefined;

    const token = jwt.sign({ username }, jwtSecret, { expiresIn: lifetimeJwt });

    const authenticatedUser = { username, token };
    return authenticatedUser;
}

function register(username, password) {

    const userExists = readOneUser(username);
    if (userExists) return undefined;

    createOneUser(username, password);
    const token = jwt.sign({ username }, jwtSecret, { expiresIn: lifetimeJwt });

    const authenticatedUser = { username, token };
    return authenticatedUser;
}

function nextId() {
    const users = parse(jsonDbPath, defaultUsers);
    const lastUserId = users?.length !== 0 ? users.length - 1 : undefined;
    if (lastUserId === undefined) return 1;
    const lastId = users[lastUserId]?.id;
    return lastId + 1;
}

function readOneUser(username) {
    const users = parse(jsonDbPath, defaultUsers);

    const user = users.find((u) => u.username === username);
    return user;

}

function createOneUser(username, password) {
    const users = parse(jsonDbPath, defaultUsers);

    const createdUser = {
        id: nextId(),
        username,
        password,
    };

    users.push(createdUser);

    serialize(jsonDbPath, users);

    return createdUser;
}


module.exports = {
    login,
    register,
    readOneUser,
    createOneUser,
};