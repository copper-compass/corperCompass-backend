const mongoose = require('mongoose');

const culturalContentSchema = new mongoose.Schema({
  state: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'State',
    required: true
  },
  title: String,
  content: String,
  category: { type: String, enum: ['Language', 'Festivals', 'Customs', 'Food'] },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('CulturalContent', culturalContentSchema);
