import mongoose from 'mongoose';

const flightSchema = new mongoose.Schema({
  startTime: { type: Date, required: true },
  duration: { type: Number, required: true }, // in minutes
  pilotName: { type: String, required: true },
  location: { type: String, required: true }
});

export default mongoose.model('Flight', flightSchema);