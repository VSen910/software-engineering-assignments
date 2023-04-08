const EnergySource = require('../models/energySource');

// function to create a new energy source
exports.createEnergySource = async (req, res) => {
  try {
    const energySource = new EnergySource(req.body);
    await energySource.save();
    res.status(201).json({
      status: 'success',
      data: energySource,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// function to get all energy sources
exports.getEnergySources = async (req, res) => {
  try {
    const energySources = await EnergySource.find();
    res.json({
      status: 'success',
      results: energySources.length,
      data: energySources,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// function to get an energy source by id
exports.getEnergySourceById = async (req, res) => {
  try {
    const energySource = await EnergySource.findById(req.params.id);
    if (!energySource) {
      return res.status(404).json({ error: 'Energy source not found' });
    }
    res.json({
      status: 'success',
      data: energySource,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// function to update an energy source by id
exports.updateEnergySource = async (req, res) => {
  try {
    const energySource = await EnergySource.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!energySource) {
      return res.status(404).json({ error: 'Energy source not found' });
    }
    res.json({
      status: 'success',
      data: energySource,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// function to delete an energy source by id
exports.deleteEnergySource = async (req, res) => {
  try {
    const energySource = await EnergySource.findByIdAndDelete(req.params.id);
    if (!energySource) {
      return res.status(404).json({ error: 'Energy source not found' });
    }
    res.status(204).json();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getTotalEnergyProduction = async (req, res) => {
  try {
    const year = parseInt(req.params.year);
    const energy = await EnergySource.aggregate([
      { $unwind: '$production' },
      { $match: { 'production.year': year } },
      { $group: { _id: null, total: { $sum: '$production.value' } } },
    ]);
    if (energy.length === 0) {
      return res
        .status(404)
        .send('No energy production data found for the specified year');
    }
    res.json({
      status: 'success',
      totalEnergy: energy[0].total,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getAverageEnergyProductionByLocation = async (req, res) => {
  try {
    const year = parseInt(req.params.year);
    const energy = await EnergySource.aggregate([
      { $match: { 'production.year': year } },
      { $unwind: '$production' },
      { $match: { 'production.year': year } },
      {
        $group: {
          _id: '$location',
          total: { $sum: '$production.value' },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          location: '$_id',
          _id: 0,
          avg: { $divide: ['$total', '$count'] },
        },
      },
    ]);
    if (energy.length === 0) {
      return res
        .status(404)
        .send('No energy production data found for the specified year');
    }
    res.send({
      status: 'success',
      data: energy,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};
