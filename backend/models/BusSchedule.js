import mongoose from "mongoose";

const busScheduleSchema = new mongoose.Schema(
  {
    bus_id: {
      type: String,
      ref: "Bus",
      required: true,
    },

    route: {
      type: String,
      required: true,
    },

    departure_time: {
      type: String, // HH:mm
      required: true,
    },

    arrival_time: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["On Time", "Delayed", "Cancelled"],
      default: "On Time",
    },
  },
  { timestamps: true }
);

export default mongoose.model("BusSchedule", busScheduleSchema);