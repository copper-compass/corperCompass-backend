const mongoose = require('mongoose');

const eventLogSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  eventType: String,
  metadata: mongoose.Schema.Types.Mixed,
  ip: String,
  userAgent: String
}, { timestamps: true });

module.exports = mongoose.model('EventLog', eventLogSchema);
