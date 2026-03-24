import mongoose from 'mongoose';

const lodgeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    state: String,
    area: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Area', 
      required: true 
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    roomType: {
      type: String,
      enum: ['self-contain', 'room-and-parlour', 'flat', 'duplex'],
      required: true,
    },
    amenities: {
      type: [String],
      default: [],
    },
    publicContact: { 
      type: String, 
      trim: true 
    },
    images: {
      type: [String],
      default: [],
    },
    distanceFromPPA: {
      type: String,
      trim: true,
    },
    notes: { 
      type: String, 
      trim: true 
    },
    isDeleted: { 
      type: Boolean, 
      default: false 
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
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

lodgeSchema.index({ location: '2dsphere' });
const Lodge = mongoose.model('Lodge', lodgeSchema);
export default Lodge;