import mongoose from "mongoose";

const busSchema = new mongoose.Schema({
  bus_id: {
    type: String,
    required: true,
    // ✅ لم يعد فريدًا، يمكن تكراره لعدة باصات
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

  // ⚠️ معرف داخلي فريد لكل باص
  internal_id: {
    type: String,
    unique: true,
    default: () => new mongoose.Types.ObjectId().toString(),
  },
});

export default mongoose.model("Bus", busSchema);