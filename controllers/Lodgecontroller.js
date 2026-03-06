const Lodge = require('../models/Lodge');

const getLodges = async (req, res, next) => {
  try {
    const { area, minPrice, maxPrice } = req.query;
    const filter = { isActive: true };
    if (area) filter.area = area;
    if (minPrice || maxPrice) {
      filter['priceRange.min'] = {};
      if (minPrice) filter['priceRange.min'].$gte = Number(minPrice);
      if (maxPrice) filter['priceRange.max'] = { $lte: Number(maxPrice) };
    }
    const lodges = await Lodge.find(filter).populate('area');
    res.json(lodges);
  } catch (error) {
    next(error);
  }
};

module.exports = { getLodges };
