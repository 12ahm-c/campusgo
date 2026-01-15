import Notification from "../models/Notification.js";

// جلب جميع التنبيهات للمستخدم الحالي
export const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ user_id: req.user._id })
      .sort({ createdAt: -1 }); // الأحدث أولاً
    res.status(200).json(notifications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// تعليم تنبيه كمقروء
export const markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { is_read: true },
      { new: true }
    );
    res.status(200).json(notification);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// إضافة إشعار جديد
export const createNotification = async (req, res) => {
  try {
    const { bus_id, type, message } = req.body;
    const notification = await Notification.create({
      user_id: req.user._id,
      bus_id,
      type,
      message
    });
    res.status(201).json(notification);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};