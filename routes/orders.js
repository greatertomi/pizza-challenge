const { Router } = require('express');
const { check } = require('express-validator');

const orderController = require('../controllers/orders');

const router = Router();

router.get('/', orderController.getOrders);

router.get('/:id', orderController.getOrder);

router.post(
  '/',
  [
    check('orderedBy', 'OrderedBy is required').not().isEmpty(),
    check('orders', 'Orders is required').not().isEmpty(),
    check('orders', 'Orders must be an array').isArray()
  ],
  orderController.createOrder
);

module.exports = router;
