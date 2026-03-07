import Lodge from '../models/Lodge.js';

// @desc    Get all active lodges (with optional area filter)
// @route   GET /api/lodges
export const getLodges = async (req, res, next) => {
  try {
    const { area } = req.query;
    const filter = { isActive: true };
    if (area) filter.area = area;
    const lodges = await Lodge.find(filter).populate('area', 'name state');
    res.json(lodges);
  } catch (error) {
    next(error);
  }
};

// @desc    Get single lodge by id
// @route   GET /api/lodges/:id
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

// @desc    Create a lodge (admin)
// @route   POST /api/lodges
export const createLodge = async (req, res, next) => {
  try {
    const lodge = await Lodge.create(req.body);
    res.status(201).json(lodge);
  } catch (error) {
    next(error);
  }
};

// @desc    Update a lodge (admin)
// @route   PUT /api/lodges/:id
export const updateLodge = async (req, res, next) => {
  try {
    const lodge = await Lodge.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!lodge) {
      res.status(404);
      throw new Error('Lodge not found');
    }
    res.json(lodge);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a lodge (admin)
// @route   DELETE /api/lodges/:id
export const deleteLodge = async (req, res, next) => {
  try {
    const lodge = await Lodge.findByIdAndDelete(req.params.id);
    if (!lodge) {
      res.status(404);
      throw new Error('Lodge not found');
    }
    res.json({ message: 'Lodge removed' });
  } catch (error) {
    next(error);
  }
};
