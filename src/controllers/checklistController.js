import JourneySection from '../models/JourneySection.js';
import ChecklistItem from '../models/ChecklistItem.js';
import UserChecklistProgress from '../models/UserChecklistProgress.js';

export const getJourney = async (req, res, next) => {
  try {
    const sections = await JourneySection.find().sort('order');
    const items = await ChecklistItem.find().populate('section');
    const result = sections.map(section => ({
      _id: section._id,
      title: section.title,
      order: section.order,
      items: items.filter(item => item.section._id.toString() === section._id.toString()),
    }));
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const getProgress = async (req, res, next) => {
  try {
    const progress = await UserChecklistProgress.find({ user: req.user._id });
    res.json(progress);
  } catch (error) {
    next(error);
  }
};

export const toggleChecklistItem = async (req, res, next) => {
  try {
    const { itemId } = req.params;

    if (!itemId.match(/^[0-9a-fA-F]{24}$/)) {
      res.status(400);
      throw new Error('Invalid checklist item ID format');
    }
    const { completed } = req.body;
    let progress = await UserChecklistProgress.findOne({ user: req.user._id, checklistItem: itemId });
    if (progress) {
      progress.completed = completed;
      progress.completedAt = completed ? new Date() : null;
    } else {
      progress = new UserChecklistProgress({
        user: req.user._id,
        checklistItem: itemId,
        completed,
        completedAt: completed ? new Date() : null,
      });
    }
    await progress.save();
    res.json(progress);
  } catch (error) {
    next(error);
  }
};

export const createSection = async (req, res, next) => {
  try {
    const section = await JourneySection.create(req.body);
    res.status(201).json(section);
  } catch (error) {
    next(error);
  }
};

export const createChecklistItem = async (req, res, next) => {
  try {
    const item = await ChecklistItem.create(req.body);
    res.status(201).json(item);
  } catch (error) {
    next(error);
  }
};
