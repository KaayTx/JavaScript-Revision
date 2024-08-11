const jwt = require('jsonwebtoken');
const { readOneUser } = require('../models/users');

const jwtSecret = 'ilovemypizza!';

// REMARQUE => c'est des const et NON des fonctions
const authorize = (req, res, next) => {
    const token = req.get('authorization');
    // on récupère, sous forme de string, le token dans le header 'authorization' de la requête envoyée par le client

    if (!token) return res.sendStatus(401);

    try {
        const decoded = jwt.verify(token, jwtSecret);
        const {username} = decoded; 
        // Comme si on faisait : username = decoded.username (on prend le username contenu dans le token décodé)


        const existingUser = readOneUser(username);
        if (!existingUser) return res.sendStatus(401);

        req.user = existingUser;
        // on ajoute à la requête, un nouvel attribut 'user' qui contient les informations de l'utilisateur authentifié
        // comme ça on garde ces données tout au long et on n'a pas besoin de faire d'autres appels à la base de données
        // Attention ! c'est PAR requete, donc si on fait une autre requête, il faudra refaire cette vérification

        return next();

    } catch (error) {
        console.log('authorize : ', error);
        return res.sendStatus(401);
    }
};


const isAdmin = (req, res, next) => {
    // if (req.user.role !== 'admin') return res.sendStatus(403);

    const {username} = req.user;
    // on récupère le username de l'utilisateur contenu dans la requête
    // c'est comme si on faisait req.user.username

    if(username !== 'admin') return res.sendStatus(403); 
    // rappel, dans le cours, l'admin avait comme username 'admin', c'est ce qu'on vérifie directement ici
    
    return next();
};

module.exports = { authorize, isAdmin };