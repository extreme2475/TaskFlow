import express from "express";
import { getAllUsers, getUserTasks } from "../controller/adminController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/users", protect, adminOnly, getAllUsers);

router.get("/tasks/:userId", protect, adminOnly, getUserTasks);

export default router;