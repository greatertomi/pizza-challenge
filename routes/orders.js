const { Router } = require('express');

const orderController = require('../controllers/orders');

const router = Router();

router.get('/', orderController.getOrders);

router.get('/:id', orderController.getOrder);

router.post('/', orderController.createOrder);

module.exports = router;
