const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json({ extended: false }));
app.use(cors());

app.use('/api/v1/pizzas', require('./routes/pizzas'));
app.use('/api/v1/orders', require('./routes/orders'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
