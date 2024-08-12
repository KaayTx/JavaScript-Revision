const jwt = require('jsonwebtoken');
// eslint-disable-next-line import/no-extraneous-dependencies
const bcrypt = require('bcrypt');

const path = require('node:path');
const { parse, serialize } = require('../utils/json');

const jsonDbPath = path.join(__dirname, '/../data/users.json');
const jwtSecret = 'ilovemypizza!';
const lifetimeJwt = 24 * 60 * 60 * 1000; // in ms : 24 * 60 * 60 * 1000 = 24h

const saltRounds = 10;

const defaultUsers = [
    {
        id: 1,
        username: 'admin',
        password: bcrypt.hashSync('admin', saltRounds),
    }
];

async function login(username, password) {

    const user = readOneUser(username);
    if (!user) return undefined;

    const isPasswordCorrect = await bcrypt.compare(password, user.password); 
    // ATTENTION ! bcrypt.compare est une méthode asynchrone, il faut donc utiliser await pour attendre le résultat

    if (!isPasswordCorrect) return undefined;

    const token = jwt.sign({ username }, jwtSecret, { expiresIn: lifetimeJwt });

    const authenticatedUser = { username, token };
    return authenticatedUser;
}

async function register(username, password) {

    const userExists = readOneUser(username);
    if (userExists) return undefined;

    await createOneUser(username, password);
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
    // on stocke dans user le username et le password (tout l'objet user)

    return user;

}

async function createOneUser(username, password) {
    const users = parse(jsonDbPath, defaultUsers);

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    // ATTENTION ! bcrypt.hash est une méthode asynchrone, il faut donc utiliser await pour attendre le résultat

    const createdUser = {
        id: nextId(),
        username,
        password: hashedPassword,
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