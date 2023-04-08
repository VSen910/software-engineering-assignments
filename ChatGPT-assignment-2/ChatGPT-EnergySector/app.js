const express = require('express');
const app = express();

const energyRouter = require('./routes/energyRoutes');

app.use(express.json());
app.use('/energy', energyRouter);

module.exports = app;
