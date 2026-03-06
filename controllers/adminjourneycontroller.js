const JourneySection = require('../models/JourneySection');
const ChecklistItem = require('../models/ChecklistItem');

// Sections
const getAllSections = async (req, res, next) => {
  try {
    const sections = await JourneySection.find().sort('order');
    res.json(sections);
  } catch (error) {
    next(error);
  }
};

const createSection = async (req, res, next) => {
  try {
    const section = await JourneySection.create(req.body);
    res.status(201).json(section);
  } catch (error) {
    next(error);
  }
};

const updateSection = async (req, res, next) => {
  try {
    const section = await JourneySection.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(section);
  } catch (error) {
    next(error);
  }
};

const deleteSection = async (req, res, next) => {
  try {
    await JourneySection.findByIdAndDelete(req.params.id);
    // Also delete related checklist items?
    await ChecklistItem.deleteMany({ section: req.params.id });
    res.json({ message: 'Section deleted' });
  } catch (error) {
    next(error);
  }
};

// Checklist items
const getItemsBySection = async (req, res, next) => {
  try {
    const items = await ChecklistItem.find({ section: req.params.sectionId }).sort('order');
    res.json(items);
  } catch (error) {
    next(error);
  }
};

const createItem = async (req, res, next) => {
  try {
    const item = await ChecklistItem.create(req.body);
    res.status(201).json(item);
  } catch (error) {
    next(error);
  }
};

const updateItem = async (req, res, next) => {
  try {
    const item = await ChecklistItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(item);
  } catch (error) {
    next(error);
  }
};

const deleteItem = async (req, res, next) => {
  try {
    await ChecklistItem.findByIdAndDelete(req.params.id);
    // Also delete user progress for this item
    await UserChecklistProgress.deleteMany({ checklistItem: req.params.id });
    res.json({ message: 'Checklist item deleted' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllSections, createSection, updateSection, deleteSection,
  getItemsBySection, createItem, updateItem, deleteItem
};
