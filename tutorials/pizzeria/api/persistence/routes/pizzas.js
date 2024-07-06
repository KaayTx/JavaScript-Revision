var express = require('express');
const { serialize, parse } = require('../utils/json');
var router = express.Router();

const jsonDbPath = __dirname + '/../data/pizzas.json';

const MENU = [
  {
    id: 1,
    title: '4 fromages',
    content: 'Gruyère, Sérac, Appenzel, Gorgonzola, Tomates',
  },
  {
    id: 2,
    title: 'Vegan',
    content: 'Tomates, Courgettes, Oignons, Aubergines, Poivrons',
  },
  {
    id: 3,
    title: 'Vegetarian',
    content: 'Mozarella, Tomates, Oignons, Poivrons, Champignons, Olives',
  },
  {
    id: 4,
    title: 'Alpage',
    content: 'Gruyère, Mozarella, Lardons, Tomates',
  },
  {
    id: 5,
    title: 'Diable',
    content: 'Tomates, Mozarella, Chorizo piquant, Jalapenos',
  },
];

router.get('/', function(req, res, next) {
  const orderByTitle = req?.query?.order?.includes('title') ? req.query.order : undefined;

  const pizzas = parse(jsonDbPath, MENU);

  let orderedMenu;

  if(orderByTitle)
    orderedMenu = [...pizzas].sort((a,b) => a.title.localeCompare(b.title));

  if(orderByTitle === '-title')
    orderedMenu = orderedMenu.reverse();
  return res.json(orderedMenu ?? pizzas);
});


router.get('/:id', function(req, res, next) {
  const pizzas = parse(jsonDbPath, MENU);

  const indexPizzaFound = pizzas.findIndex((pizza) => pizza.id == req.params.id);

  if(indexPizzaFound < 0) return res.sendStatus(404);

  return res.json(pizzas[indexPizzaFound]);
});


router.post('/', function(req, res, next) {

  const title = req?.body?.title?.length !== 0 ? req.body.title : undefined;
  const content = req?.body?.content?.length !== 0 ? req.body.content : undefined;

  if(!title || !content) return res.sendStatus(400);

  const pizzas = parse(jsonDbPath, MENU);

  const lastPizzaIndex = pizzas?.length !== 0 ? pizzas.length - 1 : undefined;
  const lastId = lastPizzaIndex !== undefined ? pizzas[lastPizzaIndex]?.id : 0;
  const nextID = lastId + 1;

  const newPizza = ({
    id: nextID,
    title: title,
    content: content,
  });
  pizzas.push(newPizza);

  serialize(jsonDbPath, pizzas);

  return res.json(newPizza);
});

router.delete('/:id', function(req, res, next) {
  const pizzas = parse(jsonDbPath, MENU);

  const indexPizzaFound = pizzas.findIndex((pizza) => pizza.id == req.params.id);

  if(indexPizzaFound < 0) return res.sendStatus(404);

  const indexPizza = pizzas.splice(indexPizzaFound,1);

  serialize(jsonDbPath, pizzas);

  return res.json(indexPizza[0]);
});


// Update a pizza based on its id and new values for its parameters
router.patch('/:id', (req, res) => {

  const title = req?.body?.title;
  const content = req?.body?.content;


  if ((!title && !content) || title?.length === 0 || content?.length === 0) return res.sendStatus(400);

  const pizzas = parse(jsonDbPath, MENU);

  const foundIndex = pizzas.findIndex(pizza => pizza.id == req.params.id);

  if (foundIndex < 0) return res.sendStatus(404);

  const updatedPizza = {...pizzas[foundIndex], ...req.body};

  pizzas[foundIndex] = updatedPizza;

  serialize(jsonDbPath, pizzas);
  
  return res.json(updatedPizza);
});


module.exports = router;
