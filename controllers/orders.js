/* eslint-disable no-await-in-loop */
const util = require('util');
const { validationResult } = require('express-validator');

const db = require('../database');
const { getCurrentDateTime } = require('../utils/helper-functions');

const query = util.promisify(db.query).bind(db);

exports.getOrders = async (req, res) => {
  try {
    const orderList = await query('SELECT * FROM orders');

    for (const order of orderList) {
      const orderItems = await query(
        `SELECT b.name, a.quantity, b.price FROM order_items a 
        INNER JOIN pizzas b ON a.pizzaId = b.pizzaId WHERE a.orderId = ?`,
        [order.orderId]
      );
      order.orders = orderItems;
    }
    res.send(orderList);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'Server Error' });
  }
};

exports.createOrder = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { orders, orderedBy } = req.body;
  const orderDateTime = getCurrentDateTime();

  try {
    const newOrder = await query(
      'INSERT INTO orders (orderedBy, orderedDateTime) VALUES (?, ?)',
      [orderedBy, orderDateTime]
    );

    const promises = [];
    for (const order of orders) {
      promises.push(
        query(
          'INSERT INTO order_items (pizzaId, orderId, quantity) VALUES (?, ?, ?)',
          [order.pizzaId, newOrder.insertId, order.quantity]
        )
      );
    }
    Promise.all(promises);
    res.send({ message: 'Order created' });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'Server Error' });
  }
};

exports.getOrder = async (req, res) => {
  const { id } = req.params;

  try {
    const [oneOrder] = await query('SELECT * FROM orders WHERE orderId = ?', [
      id
    ]);

    if (!oneOrder) {
      return res.status(404).send({ message: 'This order does not exist' });
    }

    const orderItems = await query(
      `SELECT b.name, a.quantity, b.price, (a.quantity * b.price) 
      AS orderCost FROM order_items a INNER JOIN pizzas b 
      ON a.pizzaId = b.pizzaId WHERE orderId = ?`,
      [id]
    );
    oneOrder.orders = orderItems;
    res.send(oneOrder);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'Server Error' });
  }
};
