import express from "express";
import User from "../models/User.js";

const router = express.Router();

// تسجيل مستخدم جديد
router.post("/register", async (req, res) => {
  const { username, password, bus_id } = req.body;

  if (!username || !password || !bus_id) {
    return res.status(400).json({ message: "Missing fields" });
  }

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const user = await User.create({ username, password, bus_id });
    return res.status(201).json({
      message: "Account created successfully ✅",
      user: { _id: user._id, username: user.username, bus_id: user.bus_id }
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});

// تسجيل الدخول
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Missing fields" });
  }

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: "User not found" });

    // مؤقت: بدون تشفير، مجرد مقارنة مباشرة
    if (user.password !== password) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    // يمكن هنا إنشاء JWT لاحقًا
    return res.json({
      message: "Login successful ✅",
      user: { _id: user._id, username: user.username, bus_id: user.bus_id },
      token: "fake-jwt-token"
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});

export default router;