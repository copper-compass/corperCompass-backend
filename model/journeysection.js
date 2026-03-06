const mongoose = require('mongoose');

const journeySectionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  order: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('JourneySection', journeySectionSchema);
