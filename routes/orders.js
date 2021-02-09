const { Router } = require('express');

const orderController = require('../controllers/orders');

const router = Router();

router.get('/', orderController.getOrders);

router.post('/', orderController.createOrder);

// Todos
// 1. Create an order
// 2. Get Orders
// 3. Get order by id
module.exports = router;
