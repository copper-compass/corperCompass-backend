import mongoose from 'mongoose';

const culturalContentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['Food', 'Festivals', 'Language', 'Customs', 'Other'],
  },
  content: {
    type: String,
    required: true,
  },
  state: {
    type: String, // optional, for state-specific content
  },
});

const CulturalContent = mongoose.model('CulturalContent', culturalContentSchema);
export default CulturalContent;
