const mongoose = require('mongoose');

const lodgeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  area: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Area',
    required: true
  },
  address: String,
  contactInfo: String,
  priceRange: {
    min: Number,
    max: Number
  },
  facilities: [String],
  images: [String],
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Lodge', lodgeSchema);
