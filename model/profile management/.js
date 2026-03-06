const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  firstName: String,
  lastName: String,
  phone: String,
  postedState: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'State'
  },
  lga: String,
  deploymentYear: Number,
  batch: String,
  isProfileComplete: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model('Profile', profileSchema);