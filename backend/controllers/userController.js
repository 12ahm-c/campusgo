import bcrypt from "bcryptjs";
import User from "../models/User.js";

// GET profile
export const getProfile = async (req, res) => {
  try {
    const user = req.user;
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({
      username: user.username,
      bus_id: user.bus_id,
      notifications_enabled: user.notifications_enabled,
      dark_mode: user.dark_mode,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// UPDATE profile
export const updateProfile = async (req, res) => {
  try {
    const user = req.user;
    if (!user) return res.status(404).json({ message: "User not found" });

    const { username, bus_id, currentPassword, newPassword, notifications_enabled, dark_mode } = req.body;

    // تحديث الاسم
    if (username && username !== user.username) {
      const exists = await User.findOne({ username });
      if (exists) return res.status(400).json({ message: "Username already taken" });
      user.username = username;
    }

    if (bus_id) user.bus_id = bus_id;

    // تغيير كلمة المرور
    if (newPassword) {
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) return res.status(400).json({ message: "Current password incorrect" });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);
    }

    if (notifications_enabled !== undefined) user.notifications_enabled = notifications_enabled;
    if (dark_mode !== undefined) user.dark_mode = dark_mode;

    await user.save();

    res.json({
      username: user.username,
      bus_id: user.bus_id,
      notifications_enabled: user.notifications_enabled,
      dark_mode: user.dark_mode,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};