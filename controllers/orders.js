const util = require('util');

const db = require('../database');

const query = util.promisify(db.query).bind(db);

exports.getOrders = (req, res) => {
  res.send({ message: 'Ready to go from orders' });
};
