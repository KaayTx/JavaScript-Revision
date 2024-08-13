const path = require('node:path');
const { parse, serialize } = require('../utils/json');

const jsonDbPath = path.join(__dirname, '/../data/questions.json');


function getAllQuestions() {
    const questions = parse(jsonDbPath);
    return questions;
}


function getAQuestionByLevel(level) {
    const questions = parse(jsonDbPath);
    let QuestionsByLevel = [];
    questions.forEach(question => {
        if (question.level === level) {
            QuestionsByLevel.push(question);
        };
    });
    return QuestionsByLevel;
}

// Fonction pour sélectionner 3 questions aléatoires
function getRandomQuestions(questions, number) {
    const shuffledQuestions = questions.sort(() => 0.5 - Math.random());
    return shuffledQuestions.slice(0, number);
}


function createGameResult(username, score) {
    const gameResult = {
        username,
        score,
        date: new Date()
    };

    const gameResults = parse(jsonDbPath);
    gameResults.push(gameResult);
    serialize(jsonDbPath, gameResults);
    return gameResult;
}

module.exports = {
    getAllQuestions,
    getAQuestionByLevel,
    getRandomQuestions,
    createGameResult
};