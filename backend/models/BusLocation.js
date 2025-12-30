import mongoose from "mongoose";

const busLocationSchema = new mongoose.Schema({
  bus_id: {
    type: String,
    ref: "Bus",
    required: true,
  },

  lat: {
    type: Number,
    required: true,
  },

  lng: {
    type: Number,
    required: true,
  },

  timestamp: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("BusLocation", busLocationSchema);