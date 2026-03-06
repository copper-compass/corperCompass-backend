const mongoose = require('mongoose');

const checklistItemSchema = new mongoose.Schema({
  section: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'JourneySection',
    required: true
  },
  title: { type: String, required: true },
  description: String,
  order: { type: Number, required: true },
  isRequired: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('ChecklistItem', checklistItemSchema);
