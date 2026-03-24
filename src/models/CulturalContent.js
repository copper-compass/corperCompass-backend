import mongoose from 'mongoose';

const culturalContentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, enum: ['Food', 'Festivals', 'Language', 'Customs', 'Other'], required: true },
  content: { type: String, required: true },
  state: String,
}, { timestamps: true });

const CulturalContent = mongoose.model('CulturalContent', culturalContentSchema);
export default CulturalContent;
