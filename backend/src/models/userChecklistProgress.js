import mongoose from 'mongoose';

const progressSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    checklistItem: { type: mongoose.Schema.Types.ObjectId, ref: 'ChecklistItem', required: true },
    completed: { type: Boolean, default: false },
    completedAt: Date,
  },
  { timestamps: true }
);

progressSchema.index({ user: 1, checklistItem: 1 }, { unique: true });

const UserChecklistProgress = mongoose.model('UserChecklistProgress', progressSchema);
export default UserChecklistProgress;
