import mongoose from 'mongoose';

const areaSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    state: { type: String, required: true },
    rentRange: {
      min: Number,
      max: Number,
    },
    transportNotes: String,
    safetyNotes: String,
    lifestyleNotes: String,
    location: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point',
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: false,
      },
    },
  },
  { timestamps: true }
);

areaSchema.index({ location: '2dsphere' });

const Area = mongoose.model('Area', areaSchema);
export default Area;
