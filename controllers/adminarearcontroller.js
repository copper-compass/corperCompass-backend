const Area = require('../models/Area');

const getAllAreas = async (req, res, next) => {
  try {
    const areas = await Area.find().populate('state');
    res.json(areas);
  } catch (error) {
    next(error);
  }
};

const createArea = async (req, res, next) => {
  try {
    const area = await Area.create(req.body);
    res.status(201).json(area);
  } catch (error) {
    next(error);
  }
};

const updateArea = async (req, res, next) => {
  try {
    const area = await Area.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(area);
  } catch (error) {
    next(error);
  }
};

const deleteArea = async (req, res, next) => {
  try {
    await Area.findByIdAndUpdate(req.params.id, { isActive: false });
    res.json({ message: 'Area deactivated' });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllAreas, createArea, updateArea, deleteArea };
