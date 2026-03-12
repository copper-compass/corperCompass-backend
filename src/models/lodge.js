import mongoose from 'mongoose';

const lodgeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    area: { type: mongoose.Schema.Types.ObjectId, ref: 'Area', required: true },
    priceRange: {
      min: Number,
      max: Number,
    },
    publicContact: String,
    notes: String,
    isActive: { type: Boolean, default: true },
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

lodgeSchema.index({ location: '2dsphere' });

const Lodge = mongoose.model('Lodge', lodgeSchema);
export default Lodge;
