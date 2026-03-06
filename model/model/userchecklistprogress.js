const mongoose = require('mongoose');

const userChecklistProgressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  checklistItem: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ChecklistItem',
    required: true
  },
  completed: { type: Boolean, default: false },
  completedAt: Date
}, { timestamps: true });

userChecklistProgressSchema.index({ user: 1, checklistItem: 1 }, { unique: true });

module.exports = mongoose.model('UserChecklistProgress', userChecklistProgressSchema);
