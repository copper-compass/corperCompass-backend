const JourneySection = require('../models/JourneySection');
const ChecklistItem = require('../models/ChecklistItem');
const UserChecklistProgress = require('../models/UserChecklistProgress');

const getJourney = async (req, res, next) => {
  try {
    const sections = await JourneySection.find().sort('order');
    const result = [];
    for (const section of sections) {
      const items = await ChecklistItem.find({ section: section._id }).sort('order');
      const itemsWithProgress = await Promise.all(items.map(async (item) => {
        const progress = await UserChecklistProgress.findOne({
          user: req.user._id,
          checklistItem: item._id
        });
        return {
          ...item.toObject(),
          completed: progress ? progress.completed : false,
          completedAt: progress ? progress.completedAt : null
        };
      }));
      result.push({
        ...section.toObject(),
        checklistItems: itemsWithProgress
      });
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const updateChecklist = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { completed } = req.body;
    let progress = await UserChecklistProgress.findOne({
      user: req.user._id,
      checklistItem: id
    });
    if (!progress) {
      progress = new UserChecklistProgress({
        user: req.user._id,
        checklistItem: id,
        completed,
        completedAt: completed ? new Date() : null
      });
    } else {
      progress.completed = completed;
      progress.completedAt = completed ? new Date() : null;
    }
    await progress.save();
    res.json(progress);
  } catch (error) {
    next(error);
  }
};

module.exports = { getJourney, updateChecklist };
