const { Router } = require('express');
const { check } = require('express-validator');

const pizzaController = require('../controllers/pizzas');

const router = Router();

router.get('/', pizzaController.getPizzas);

router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('price', 'Price is required').not().isEmpty(),
    check('ingredients', 'Ingredients is required').not().isEmpty(),
    check('ingredients', 'Ingredients must be an array').isArray()
  ],
  pizzaController.createPizza
);

module.exports = router;
