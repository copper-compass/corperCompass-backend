import mongoose from 'mongoose';

const areaSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    rentRange: {
      min: Number,
      max: Number,
    },
    transportNotes: String,
    safetyNotes: String,
    lifestyleNotes: String,
  },
  { timestamps: true }
);

const Area = mongoose.model('Area', areaSchema);
export default Area;
