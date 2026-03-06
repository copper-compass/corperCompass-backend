const CulturalContent = require('../models/CulturalContent');

const getAllCulture = async (req, res, next) => {
  try {
    const content = await CulturalContent.find().populate('state');
    res.json(content);
  } catch (error) {
    next(error);
  }
};

const createCulture = async (req, res, next) => {
  try {
    const content = await CulturalContent.create(req.body);
    res.status(201).json(content);
  } catch (error) {
    next(error);
  }
};

const updateCulture = async (req, res, next) => {
  try {
    const content = await CulturalContent.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(content);
  } catch (error) {
    next(error);
  }
};

const deleteCulture = async (req, res, next) => {
  try {
    await CulturalContent.findByIdAndUpdate(req.params.id, { isActive: false });
    res.json({ message: 'Cultural content deactivated' });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllCulture, createCulture, updateCulture, deleteCulture };
