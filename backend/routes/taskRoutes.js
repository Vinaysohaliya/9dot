import express from "express";
import { getTasks, getTaskById, createTask, updateTask, deleteTask } from "../controller/taskController.js";
import protect from "../middleware/authProtect.js";

const router = express.Router();

router.route("/").get(protect, getTasks).post(protect, createTask);
router.route("/:id").get(protect, getTaskById).put(protect, updateTask).delete(protect, deleteTask);

export default router;
