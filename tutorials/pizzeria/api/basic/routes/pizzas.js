var express = require('express');
var router = express.Router();

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

  let orderedMenu;
  if(orderByTitle)
    orderedMenu = [...MENU].sort((a,b) => a.title.localeCompare(b.title));

  if(orderByTitle === '-title')
    orderedMenu = orderedMenu.reverse();
  res.json(orderedMenu ?? MENU);
});


router.get('/:id', function(req, res, next) {
  const indexPizzaFound = MENU.findIndex((pizza) => pizza.id == req.params.id);

  if(indexPizzaFound < 0) return res.sendStatus(404);

  res.json(MENU[indexPizzaFound]);
});


router.post('/', function(req, res, next) {
  const title = req?.body?.title?.length !== 0 ? req.body.title : undefined;
  const content = req?.body?.content?.length !== 0 ? req.body.content : undefined;

  if(!title || !content) return res.sendStatus(400);
 
  const lastPizzaIndex = MENU?.length !== 0 ? MENU.length - 1 : undefined;
  const lastId = lastPizzaIndex !== undefined ? MENU[lastPizzaIndex]?.id : 0;
  const nextID = lastId + 1;

  const newPizza = ({
    id: nextID,
    title: title,
    content: content,
  });
  MENU.push(newPizza);

  res.json(newPizza);
});

module.exports = router;
