const { Router } = require('express');

const pizzaController = require('../controllers/pizzas');

const router = Router();

router.get('/', pizzaController.getPizzas);

router.post('/', pizzaController.createPizza);

// Todos
// 1. Create a pizza
// 2. Get Pizzas

module.exports = router;
