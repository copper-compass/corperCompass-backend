import Area from '../models/Area.js';

export const getAreas = async (req, res, next) => {
  try {
    const { state } = req.query;
    const filter = state ? { state } : {};
    const areas = await Area.find(filter).sort({ name: 1 });
    res.json(areas);
  } catch (error) {
    next(error);
  }
};

export const getAreaById = async (req, res, next) => {
  try {
    const area = await Area.findById(req.params.id);
    if (!area) {
      res.status(404);
      throw new Error('Area not found');
    }
    res.json(area);
  } catch (error) {
    next(error);
  }
};

export const createArea = async (req, res, next) => {
  try {
    const { location, ...rest } = req.body;
    const areaData = { ...rest };
    if (location?.coordinates) {
      areaData.location = { type: 'Point', coordinates: location.coordinates };
    }
    const area = await Area.create(areaData);
    res.status(201).json(area);
  } catch (error) {
    next(error);
  }
};

export const updateArea = async (req, res, next) => {
  try {
    const { location, ...rest } = req.body;
    const updateData = { ...rest };
    if (location?.coordinates) {
      updateData.location = { type: 'Point', coordinates: location.coordinates };
    } else if (location === null) {
      updateData.location = null;
    }
    const area = await Area.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true });
    if (!area) {
      res.status(404);
      throw new Error('Area not found');
    }
    res.json(area);
  } catch (error) {
    next(error);
  }
};

export const deleteArea = async (req, res, next) => {
  try {
    const area = await Area.findByIdAndDelete(req.params.id);
    if (!area) {
      res.status(404);
      throw new Error('Area not found');
    }
    res.json({ message: 'Area removed' });
  } catch (error) {
    next(error);
  }
};
