const State = require('../models/State');

const getAllStates = async (req, res, next) => {
  try {
    const states = await State.find({ isActive: true });
    res.json(states);
  } catch (error) {
    next(error);
  }
};

const createState = async (req, res, next) => {
  try {
    const state = await State.create(req.body);
    res.status(201).json(state);
  } catch (error) {
    next(error);
  }
};

const updateState = async (req, res, next) => {
  try {
    const state = await State.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(state);
  } catch (error) {
    next(error);
  }
};

const deleteState = async (req, res, next) => {
  try {
    await State.findByIdAndUpdate(req.params.id, { isActive: false });
    res.json({ message: 'State deactivated' });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllStates, createState, updateState, deleteState };
