import BusSchedule from "../models/BusSchedule.js"; // ← لاحظ .js

// Récupérer tous les horaires de bus
export const getAllSchedules = async (req, res) => {
  try {
    const schedules = await BusSchedule.find(); // ← استخدم find() لأنك مع Mongoose
    res.status(200).json(schedules);
  } catch (error) {
    console.error("DB ERROR:", error);
    res.status(500).json({
      message: error.message,
    });
  }
};