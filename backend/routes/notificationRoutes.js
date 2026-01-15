import express from "express";
import { createNotification, getNotifications, markAsRead } from "../controllers/notification.controller.js";

const router = express.Router();

// جلب جميع التنبيهات
router.get("/",  getNotifications);

// تعليم تنبيه كمقروء
router.put("/:id/read", markAsRead);

// إنشاء إشعار جديد
router.post("/", createNotification);

export default router;