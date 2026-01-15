// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import authRoutes from "./routes/auth.js";
import busRoutes from "./routes/busRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import scheduleRoutes from "./routes/scheduleRoutes.js";
import userRoutes from "./routes/User.js";

dotenv.config();
connectDB();

const app = express();

// ==========================
// CORS Configuration
// ==========================
const allowedOrigins = [
  "http://localhost:5173",        // dev
  "https://campusgo-5e7z.vercel.app", // frontend deployed
];

const corsOptions = {
  origin: function (origin, callback) {
    // allow requests with no origin (like Postman)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = `CORS policy: This origin (${origin}) is not allowed.`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true, // مهم لإرسال الكوكيز / JWT
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

// ==========================
// Start server
// ==========================
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on http://0.0.0.0:${PORT}`);
});