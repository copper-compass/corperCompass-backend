import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    postedState: { type: String, default: 'Pending' },
    phone: String,
    stateCode: String,
    ppa: String,
    lga: String,
    batch: String,
    preferences: { type: Map, of: String },
  },
  { timestamps: true }
);

const Profile = mongoose.model('Profile', profileSchema);
export default Profile;
