import mongoose from 'mongoose';

const checklistItemSchema = new mongoose.Schema({
  section: { type: mongoose.Schema.Types.ObjectId, ref: 'JourneySection', required: true },
  text: { type: String, required: true },
  order: Number,
}, { timestamps: true });

const ChecklistItem = mongoose.model('ChecklistItem', checklistItemSchema);
export default ChecklistItem;
