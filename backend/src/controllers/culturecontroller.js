import CulturalContent from '../models/CulturalContent.js';

// @desc    Get all cultural content (optionally by category or state)
// @route   GET /api/culture
export const getCulturalContent = async (req, res, next) => {
  try {
    const { category, state } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (state) filter.state = state;
    const content = await CulturalContent.find(filter).sort({ category: 1, title: 1 });
    res.json(content);
  } catch (error) {
    next(error);
  }
};

// @desc    Get single cultural content by id
// @route   GET /api/culture/:id
export const getCulturalContentById = async (req, res, next) => {
  try {
    const content = await CulturalContent.findById(req.params.id);
    if (!content) {
      res.status(404);
      throw new Error('Content not found');
    }
    res.json(content);
  } catch (error) {
    next(error);
  }
};

// @desc    Create cultural content (admin)
// @route   POST /api/culture
export const createCulturalContent = async (req, res, next) => {
  try {
    const data = Array.isArray(req.body) ? req.body : [req.body];
    
    const contents = await CulturalContent.insertMany(data);
    res.status(201).json(contents.length === 1 ? contents[0] : contents);
  } catch (error) {
    next(error);
  }
};

// @desc    Update cultural content (admin)
// @route   PUT /api/culture/:id
export const updateCulturalContent = async (req, res, next) => {
  try {
    const content = await CulturalContent.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!content) {
      res.status(404);
      throw new Error('Content not found');
    }
    res.json(content);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete cultural content (admin)
// @route   DELETE /api/culture/:id
export const deleteCulturalContent = async (req, res, next) => {
  try {
    const content = await CulturalContent.findByIdAndDelete(req.params.id);
    if (!content) {
      res.status(404);
      throw new Error('Content not found');
    }
    res.json({ message: 'Content removed' });
  } catch (error) {
    next(error);
  }
};
