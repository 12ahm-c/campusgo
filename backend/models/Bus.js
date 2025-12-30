import mongoose from "mongoose";

const busSchema = new mongoose.Schema({
  bus_id: {
    type: String,
    required: true,
    unique: true,
  },

  driver_name: {
    type: String,
  },

  status: {
    type: String,
    enum: ["Active", "Inactive", "Maintenance"],
    default: "Active",
  },

  current_lat: {
    type: Number,
  },

  current_lng: {
    type: Number,
  },

  last_update: {
    type: Date,
  },
});

export default mongoose.model("Bus", busSchema);