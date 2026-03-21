import mongoose from 'mongoose';

const negotiationSchema = new mongoose.Schema(
  {
    lodge: { type: mongoose.Schema.Types.ObjectId, ref: 'Lodge', required: true },
    corper: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    landlord: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    proposedPrice: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'accepted', 'rejected', 'countered'], default: 'pending' },
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }],
  },
  { timestamps: true }
);

const Negotiation = mongoose.model('Negotiation', negotiationSchema);
export default Negotiation;
