import mongoose from 'mongoose';
const flightSchema = new mongoose.Schema({
  startTime: { type: Date, required: true },
  duration: { type: Number, required: true },
  pilotName: { type: String, required: true },
  location: { type: String, required: true }
});
const Flight = mongoose.model('Flight', flightSchema);
export default Flight;
