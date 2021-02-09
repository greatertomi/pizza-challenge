const util = require('util');

const db = require('../database');
const { getCurrentDateTime } = require('../utils/helper-functions');

const query = util.promisify(db.query).bind(db);

exports.getOrders = (req, res) => {
  res.send({ message: 'Ready to go from orders' });
};

exports.createOrder = async (req, res) => {
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
        query('INSERT INTO order_items (pizzaId, orderId, quantity)', [
          order.pizzaId,
          newOrder.insertId,
          order.quantity
        ])
      );
    }
    Promise.all(promises);
    res.send({ message: 'Order created' });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'Server Error' });
  }
};
