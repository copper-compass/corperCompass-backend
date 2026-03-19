import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    currency: { type: String, default: 'NGN' },
    reference: String,
    status: { type: String, enum: ['pending', 'success', 'failed'], default: 'pending' },
    metadata: mongoose.Schema.Types.Mixed,
  },
  { timestamps: true }
);

const Payment = mongoose.model('Payment', paymentSchema);
export default Payment;
