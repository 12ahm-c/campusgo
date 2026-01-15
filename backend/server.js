import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.js";

import authRoutes from "./routes/auth.js";
import busRoutes from "./routes/busRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import scheduleRoutes from "./routes/scheduleRoutes.js";
import userRoutes from "./routes/User.js";

dotenv.config();
connectDB();

const app = express();

// ✅ إعداد CORS صحيح للسماح بالكوكيز
const corsOptions = {
  origin: "http://localhost:5173", // عنوان الفرونتند
  credentials: true,              // مهم للسماح بإرسال الكوكيز مع الطلبات
};

app.use(cors(corsOptions));
app.use(express.json());

// ==========================
// Routes
// ==========================
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/buses", busRoutes);
app.use("/api/schedule", scheduleRoutes);
app.use("/api/notifications", notificationRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on http://0.0.0.0:${PORT}`);
});