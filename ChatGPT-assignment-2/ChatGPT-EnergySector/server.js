const mongoose = require('mongoose');

const app = require('./app');

const PORT = process.env.PORT || 3000;

mongoose
  .connect('mongodb://localhost:27017/energy', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to database');
  })
  .catch((err) => {
    console.error(`Error connecting to database: ${err.message}`);
  });

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
