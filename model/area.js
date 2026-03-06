const mongoose = require('mongoose');

const areaSchema = new mongoose.Schema({
  name: { type: String, required: true },
  state: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'State',
    required: true
  },
  lga: String,
  description: String,
  safetyRating: { type: Number, min: 1, max: 5 },
  costOfLiving: { type: String, enum: ['Low', 'Medium', 'High'] },
  proximityToCDS: String,
  transportation: [String],
  amenities: [String],
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Area', areaSchema);
