const express = require('express');

const router = express.Router();

const { getAllQuestions, getAQuestionByLevel, getRandomQuestions, createGameResult } = require('../models/games');

router.get('/start', (req, res) => {
    const level = req?.query?.level.length !== 0 ? req.query.level : undefined;
    let questions;
  
    if (level) {
      questions = getAQuestionByLevel(level);
  
      // Si le niveau n'existe pas, renvoyer une erreur 404
      if (questions.length === 0 || !questions) {
        return res.sendStatus(404); // 404 Not Found
      }
    } else {
      questions = getAllQuestions();
    }
  
    const selectedQuestions = getRandomQuestions(questions, 3);
    return res.json(selectedQuestions);
});


router.post('/', (req, res) => {
    const score = req?.body?.score.length !== 0 ? req.body.score : undefined;
    const username = req?.body?.username.length !== 0 ? req.body.username : undefined;

    if(score < 0 || score > 3) return res.sendStatus(400); // 400 Bad Request

    const gameResult = createGameResult(username, score);
    return res.json(gameResult);

});

module.exports = router;