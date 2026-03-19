import CulturalContent from '../models/CulturalContent.js';

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

export const createCulturalContent = async (req, res, next) => {
  try {
    const content = await CulturalContent.create(req.body);
    res.status(201).json(content);
  } catch (error) {
    next(error);
  }
};

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
