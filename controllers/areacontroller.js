const Area = require('../models/Area');

const getAreas = async (req, res, next) => {
  try {
    const filter = { isActive: true };
    if (req.query.state) filter.state = req.query.state;
    const areas = await Area.find(filter).populate('state', 'name');
    res.json(areas);
  } catch (error) {
    next(error);
  }
};

const getAreasByState = async (req, res, next) => {
  try {
    const { state } = req.params;
    const areas = await Area.find({ state, isActive: true }).populate('state', 'name');
    res.json(areas);
  } catch (error) {
    next(error);
  }
};

module.exports = { getAreas, getAreasByState };
