import mongoose from 'mongoose';

const journeySectionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  order: { type: Number, required: true },
}, { timestamps: true });

const JourneySection = mongoose.model('JourneySection', journeySectionSchema);
export default JourneySection;
