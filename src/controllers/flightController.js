import Flight from "../models/Flight.js";

export const getFlights = async (req, res) => {
  try {
    const { search, pilot, location } = req.query;
    const filter = {};
    if (search) {
      filter.$or = [
        { pilotName: { $reger: search, $options: "i" } },
        { location: { $reger: search, $option: "i" } },
      ];
    }
    if (pilot) filter.pilotName = pilot;
    if (location) filter.location = location;
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
