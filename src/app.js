import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import flightRoutes from './routes/flightRoutes.js';
import sequelize from './models/index.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', authRoutes);
app.use('/api/flights', flightRoutes);

const PORT = process.env.PORT || 5000;

sequelize.sync().then(() => {
  console.log('✅ Connected to MySQL & models synced');
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
}).catch(err => {
  console.error('❌ MySQL connection error:', err);
});
