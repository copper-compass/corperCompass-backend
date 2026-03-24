import mongoose from 'mongoose';

const areaSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    state: { type: String, required: true },
    lga: String,
    type: String,
    safetyRating: { type: Number, min: 0, max: 10 },
    safety_rating: { type: Number, min: 0, max: 10 },
    rentRange: {
      min: Number,
      max: Number,
    },
    minRent: Number,
    maxRent: Number,
    transport: String,
    transportNotes: String,
    safetyNotes: String,
    lifestyle: String,
    lifestyleNotes: String,
    description: String,
    location: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point',
      },
      coordinates: {
        type: [Number],
        required: false,
      },
    },
  },
  { timestamps: true }
);

areaSchema.index({ location: '2dsphere' });

const Area = mongoose.model('Area', areaSchema);
export default Area;
