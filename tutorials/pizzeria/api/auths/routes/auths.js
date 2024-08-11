// import {login, register} from '../models/users';

const express = require('express');

const { login, register } = require('../models/users');

const router = express.Router();

router.post('/login', (req, res) => {
    const username = req?.body?.username?.length !== 0 ? req.body.username : undefined;
    const password = req?.body?.password?.length !== 0 ? req.body.password : undefined
    
    if (!username || !password) return res.sendStatus(400);

    const authenticatedUser = login(username, password);
    if (!authenticatedUser) return res.sendStatus(401);

    return res.json(authenticatedUser);
});


router.post('/register', (req, res) => {

    const username = req?.body?.username?.length !== 0 ? req.body.username : undefined;
    const password = req?.body?.password?.length !== 0 ? req.body.password : undefined;

    if (!username || !password) return res.sendStatus(400);

    const authenticatedUser = register(username, password);
    if (!authenticatedUser) return res.sendStatus(409);

    return res.json(authenticatedUser);
});

module.exports = router;