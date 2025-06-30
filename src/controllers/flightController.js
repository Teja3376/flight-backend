import Flight from '../models/Flight.js';
import { Op } from 'sequelize';

export const getFlights = async (req, res) => {
  try {
    const { search, pilot, location } = req.query;
    let where = {};
    if (search) {
      where[Op.or] = [
        { pilotName: { [Op.like]: `%${search}%` } },
        { location: { [Op.like]: `%${search}%` } }
      ];
    }
    if (pilot) where.pilotName = pilot;
    if (location) where.location = location;
    const flights = await Flight.findAll({
      where,
      order: [['startTime', 'DESC']]
    });
    res.json(flights);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const addFlight = async (req, res) => {
  try {
    const { startTime, duration, pilotName, location } = req.body;
    const flight = await Flight.create({ startTime, duration, pilotName, location });
    res.status(201).json(flight);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};