import Bus from "../models/Bus.js";
import BusLocation from "../models/BusLocation.js";
import BusSchedule from "../models/BusSchedule.js";

// جلب كل الباصات مع مواقعها الحالية
export const getAllBuses = async (req, res) => {
  try {
    const buses = await Bus.find({});
    res.json(buses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// جلب ETA للباص الخاص بالمستخدم
export const getBusETA = async (req, res) => {
  try {
    const { bus_id } = req.params;

    // جلب آخر موقع للباص
    const lastLocation = await BusLocation.findOne({ bus_id }).sort({ timestamp: -1 });

    // جلب جدول الرحلات الحالي للباص
    const schedule = await BusSchedule.findOne({ bus_id }).sort({ departure_time: 1 });

    if (!lastLocation || !schedule) return res.json({ eta: null });

    // حساب ETA تقريبي (مثال: نستخدم الوقت المتبقي حتى الوصول)
    // في تطبيق حقيقي، يمكن استخدام خرائط Google أو أي خوارزمية Route
    const etaMinutes = Math.max(0, Math.floor(
      (new Date(`1970-01-01T${schedule.arrival_time}:00Z`) - new Date(`1970-01-01T${schedule.departure_time}:00Z`)) / 60000
    ));

    res.json({ eta: etaMinutes });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};