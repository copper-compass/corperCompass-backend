import JourneySection from '../models/JourneySection.js';
import ChecklistItem from '../models/ChecklistItem.js';
import UserChecklistProgress from '../models/UserChecklistProgress.js';
import mongoose from 'mongoose';

export const getJourney = async (req, res, next) => {
  try {
    let sections = await JourneySection.find().sort('order');
    if (!sections || sections.length === 0) {
      const defaultSections = [
        { title: 'Pre-deployment', order: 1 },
        { title: 'Arrival', order: 2 },
        { title: 'Settlement', order: 3 },
        { title: 'Ongoing', order: 4 },
      ];
      await JourneySection.insertMany(defaultSections);
      sections = await JourneySection.find().sort('order');
    }
    const items = await ChecklistItem.find().populate('section');
    const result = sections.map(section => ({
      _id: section._id,
      title: section.title,
      order: section.order,
      items: items.filter(item => item.section._id.toString() === section._id.toString()),
    }));
    res.json({ sections: result });
  } catch (error) {
    next(error);
  }
};

export const getProgress = async (req, res, next) => {
  try {
    const progress = await UserChecklistProgress.find({ user: req.user._id, completed: true });
    const total = await UserChecklistProgress.countDocuments({ user: req.user._id });
    const count = progress.length;
    const percentage = total > 0 ? (count / total) * 100 : 0;
    res.json({ completedItems: progress, percentage: percentage });
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
    res.json({ progress });
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
    const { section, text, order } = req.body;
    let sectionId = section;
    if (!mongoose.isValidObjectId(sectionId)) {
      let targetSection = await JourneySection.findOne({ title: section });
      if (!targetSection) {
        const maxOrder = await JourneySection.find().sort('-order').limit(1);
        const nextOrder = maxOrder.length ? maxOrder[0].order + 1 : 1;
        targetSection = await JourneySection.create({ title: section, order: nextOrder });
      }
      sectionId = targetSection._id;
    }
    const item = await ChecklistItem.create({ section: sectionId, text, order });
    res.status(201).json(item);
  } catch (error) {
    next(error);
  }
};
