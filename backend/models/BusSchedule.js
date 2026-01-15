// models/BusSchedule.js
import mongoose from "mongoose";

const busScheduleSchema = new mongoose.Schema({
  bus_id: {
    type: String,
    ref: "Bus",
    required: true,
  },

  status: {
    type: String,
    enum: ["Active", "Inactive", "Maintenance"],
    default: "Active",
  },

  current_eta: {
    type: Number, // الوقت المتبقي للوصول بالدقائق
    default: null,
  },

  current_lat: {
    type: Number,
  },

  current_lng: {
    type: Number,
  },
});

export default mongoose.model("BusSchedule", busScheduleSchema);