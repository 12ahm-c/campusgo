import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    bus_id: {
      type: String,
      ref: "Bus",
    },

    type: {
      type: String,
      enum: ["Arrival", "Delay", "Cancel", "Schedule Change"],
      required: true,
    },

    message: {
      type: String,
      required: true,
    },

    is_read: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Notification", notificationSchema);