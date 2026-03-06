const Lodge = require('../models/Lodge');

const getAllLodges = async (req, res, next) => {
  try {
    const lodges = await Lodge.find().populate('area');
    res.json(lodges);
  } catch (error) {
    next(error);
  }
};

const createLodge = async (req, res, next) => {
  try {
    const lodge = await Lodge.create(req.body);
    res.status(201).json(lodge);
  } catch (error) {
    next(error);
  }
};

const updateLodge = async (req, res, next) => {
  try {
    const lodge = await Lodge.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(lodge);
  } catch (error) {
    next(error);
  }
};

const deleteLodge = async (req, res, next) => {
  try {
    await Lodge.findByIdAndUpdate(req.params.id, { isActive: false });
    res.json({ message: 'Lodge deactivated' });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllLodges, createLodge, updateLodge, deleteLodge };
