import mongoose from "mongoose";

const MONGO_URI = "mongodb+srv://mohamedhadjweiss_db_user:LhC3Qvg0c80zD3vS@cluster0.nuezeew.mongodb.net/bus_tracking?authSource=admin";

async function connectDB() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("✅ MongoDB connected successfully!");
        process.exit(0);
    } catch (err) {
        console.error("❌ MongoDB connection error:", err.message);
        process.exit(1);
    }
}

connectDB();