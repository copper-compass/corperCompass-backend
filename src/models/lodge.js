import mongoose from 'mongoose';

const lodgeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    area: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Area',
      required: true,
    },
    priceRange: {
      min: Number,
      max: Number,
    },
    publicContact: String,
    notes: String,
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Lodge = mongoose.model('Lodge', lodgeSchema);
export default Lodge;
