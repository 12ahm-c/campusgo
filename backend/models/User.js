import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      index: true
    },

    password: {
      type: String,
      required: true
    },

    bus_id: {
      type: String,
      ref: "Bus",
      required: true
    },

    notifications_enabled: {
      type: Boolean,
      default: true
    },

    dark_mode: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);