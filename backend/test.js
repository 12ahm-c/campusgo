import dotenv from "dotenv";
import mongoose from "mongoose";
import User from "./models/User.js";

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error(error);
  }
};

const createTestUser = async () => {
  await connectDB();

  const user = new User({
    name: "Ahmed Test",
    password: "123456",
    bus_id: "u01"
  });

  await user.save();
  console.log("Test user created!");
  process.exit();
};

createTestUser();