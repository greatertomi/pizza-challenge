const { Router } = require('express');

const pizzaController = require('../controllers/pizzas');

const router = Router();

router.get('/', pizzaController.getPizzas);

router.post('/', pizzaController.createPizza);

module.exports = router;
