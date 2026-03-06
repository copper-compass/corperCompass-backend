const CulturalContent = require('../models/CulturalContent');

const getCulture = async (req, res, next) => {
  try {
    const filter = { isActive: true };
    if (req.query.state) filter.state = req.query.state;
    const content = await CulturalContent.find(filter).populate('state', 'name');
    res.json(content);
  } catch (error) {
    next(error);
  }
};

module.exports = { getCulture };
