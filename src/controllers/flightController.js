import Flight from "../models/Flight.js";

export const getFlights = async (req, res) => {
  try {
    const { search, pilot, location } = req.query;
    const filter = {};
    if (search) {
      filter.$or = [
        { pilotName: { $regex: search, $options: "i" } },
        { location: { $regex: search, $options: "i" } },
      ];
    }
    if (pilot) {
      filter.pilotName = { $regex: pilot, $options: "i" };
    }

    if (location) {
      filter.location = { $regex: location, $options: "i" };
    }
    const flights = await Flight.find(filter).sort({ startTime: -1 });
    res.json(flights);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const addFlight = async (req, res) => {
  try {
    const { startTime, duration, pilotName, location } = req.body;
    const flight = new Flight({
      startTime,
      duration,
      pilotName,
      location,
    });
    // Mongoose: save the flight document
    await flight.save();
    res.status(201).json(flight);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
