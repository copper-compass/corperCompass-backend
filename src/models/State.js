import mongoose from 'mongoose';

const stateSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  region: String,
});

const State = mongoose.model('State', stateSchema);
export default State;
