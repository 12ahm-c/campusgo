// routes/busRoutes.js
import express from "express";
import Bus from "../models/Bus.js";
import BusLocation from "../models/BusLocation.js";

const router = express.Router();

// جلب كل الباصات ومواقعها الأخيرة
router.get("/", async (req, res) => {
  try {
    const buses = await Bus.find();
    const locations = await BusLocation.aggregate([
      { $sort: { timestamp: -1 } },
      { $group: { _id: "$bus_id", lat: { $first: "$lat" }, lng: { $first: "$lng" } } },
    ]);

    const result = buses.map(bus => {
      const loc = locations.find(l => l._id === bus.bus_id);
      return {
        bus_id: bus.bus_id,
        driver_name: bus.driver_name,
        status: bus.status,
        current_lat: loc ? loc.lat : bus.current_lat,
        current_lng: loc ? loc.lng : bus.current_lng,
      };
    });

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;