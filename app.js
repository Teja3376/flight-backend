import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './src/routes/authRoutes.js';
import flightRoutes from './src/routes/flightRoutes.js';
import connectdb from './src/models/index.js';

dotenv.config();
console.log('Environment Variables:', process.env.MONGODB_URI, process.env.JWT_SECRET);
const app = express();
app.use(cors());
app.use(express.json());
app.use('/', (req, res, next) => {
  console.log(`Request Method: ${req.method}, Request URL: ${req.url}`);
  next();
});
app.use('/api', authRoutes);
app.use('/api/flights', flightRoutes);

const PORT = process.env.PORT || 5000;

connectdb()
  .then(() => {
    console.log('✅ Connected to MongoDB');
    // Uncomment the next line if running locally
    // app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
  });

export default app;

// For Vercel deployment:
// export default function handler(req, res) {
//   app(req, r
