/* eslint-disable no-await-in-loop */
const util = require('util');

const db = require('../database');

const query = util.promisify(db.query).bind(db);

exports.getPizzas = async (req, res) => {
  const getIngredients = async (pizzaId) => {
    const ingredients = await query(
      'SELECT * FROM ingredients WHERE pizzaId = ?',
      [pizzaId]
    );
    return ingredients;
  };

  try {
    const pizzas = await query('SELECT * FROM pizzas');
    for (const pizza of pizzas) {
      const ingredients = await getIngredients(pizza.pizzaId);
      pizza.ingredients = ingredients.map((e) => e.name);
    }
    res.send(pizzas);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'Server Error' });
  }
};

exports.createPizza = async (req, res) => {
  const { name, price, ingredients } = req.body;

  try {
    const newPizza = await query(
      'INSERT INTO pizzas (name, price) VALUES (?, ?)',
      [name, price]
    );

    const promises = [];
    for (const ingredient of ingredients) {
      promises.push(
        query('INSERT INTO ingredients (pizzaId, name) VALUES (?, ?)', [
          newPizza.insertId,
          ingredient
        ])
      );
    }
    await Promise.all(promises);
    res.send({ message: 'New Pizza created' });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'Server Error' });
  }
};
