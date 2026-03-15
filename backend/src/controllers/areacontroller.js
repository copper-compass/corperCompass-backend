import Area from '../models/Area.js';

// @desc    Get all areas (optionally filter by state)
// @route   GET /api/areas
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

// @desc    Get single area by id
// @route   GET /api/areas/:id
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

// @desc    Create an area (admin)
// @route   POST /api/areas
export const createArea = async (req, res, next) => {
  try {
    const data = Array.isArray(req.body) ? req.body : [req.body];

    const areas = await Area.insertMany(
      data.map(({ location, ...rest }) => ({
        ...rest,
        ...(location?.coordinates && {
          location: { type: 'Point', coordinates: location.coordinates }
        })
      }))
    )

    res.status(201).json(areas.length === 1 ? areas[0] : areassa);

  } catch(error) {
    next(error)
  }
};

// @desc    Update an area (admin)
// @route   PUT /api/areas/:id
export const updateArea = async (req, res, next) => {
  try {
    const { location, ...rest } = req.body;
    const updateData = { ...rest };
    if (location && location.coordinates) {
      updateData.location = {
        type: 'Point',
        coordinates: location.coordinates,
      };
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

// @desc    Delete an area (admin)
// @route   DELETE /api/areas/:id
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
