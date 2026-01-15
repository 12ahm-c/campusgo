// scheduleRoutes.js
import express from "express";
import { getAllSchedules } from "../controllers/schedule.controller.js";

const router = express.Router();

// API Schedule
router.get("/", getAllSchedules); // ← غير /schedule إلى /

export default router;