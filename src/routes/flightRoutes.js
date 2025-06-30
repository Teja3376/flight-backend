import express from 'express';
import { getFlights, addFlight } from '../controllers/flightController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getFlights);
router.post('/', authMiddleware, addFlight);

export default router;