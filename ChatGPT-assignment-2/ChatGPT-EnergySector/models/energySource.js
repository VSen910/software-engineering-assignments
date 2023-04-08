const mongoose = require('mongoose');

const energySourceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  production: [
    {
      month: {
        type: Number,
        required: true,
      },
      year: {
        type: Number,
        required: true,
      },
      value: {
        type: Number,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model('EnergySource', energySourceSchema);
