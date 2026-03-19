import Lodge from '../models/Lodge.js';

export const getLodges = async (req, res, next) => {
  try {
    const { area } = req.query;
    const filter = { isActive: true };
    
    if (area) {
      if (!area.match(/^[0-9a-fA-F]{24}$/)) {
        res.status(400);
        throw new Error('Invalid area ID format in query parameter');
      }
      filter.area = area;
    }
    
    const lodges = await Lodge.find(filter).populate('area', 'name state');
    res.json(lodges);
  } catch (error) {
    next(error);
  }
};

export const getLodgeById = async (req, res, next) => {
  try {
    const lodge = await Lodge.findById(req.params.id).populate('area', 'name state');
    if (!lodge) {
      res.status(404);
      throw new Error('Lodge not found');
    }
    res.json(lodge);
  } catch (error) {
    next(error);
  }
};

export const createLodge = async (req, res, next) => {
  try {
    const { location, ...rest } = req.body;
    const lodgeData = { ...rest };
    if (location?.coordinates) {
      lodgeData.location = { type: 'Point', coordinates: location.coordinates };
    }
    const lodge = await Lodge.create(lodgeData);
    res.status(201).json(lodge);
  } catch (error) {
    next(error);
  }
};

export const updateLodge = async (req, res, next) => {
  try {
    const { location, ...rest } = req.body;
    const updateData = { ...rest };
    if (location?.coordinates) {
      updateData.location = { type: 'Point', coordinates: location.coordinates };
    } else if (location === null) {
      updateData.location = null;
    }
    const lodge = await Lodge.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true });
    if (!lodge) {
      res.status(404);
      throw new Error('Lodge not found');
    }
    res.json(lodge);
  } catch (error) {
    next(error);
  }
};

export const deleteLodge = async (req, res, next) => {
  try {
    const lodge = await Lodge.findByIdAndUpdate(
      req.params.id, 
      { isActive: false }, 
      { new: true }
    );
    
    if (!lodge) {
      res.status(404);
      throw new Error('Lodge not found');
    }
    
    res.json({ message: 'Lodge successfully archived' });
  } catch (error) {
    next(error);
  }
};