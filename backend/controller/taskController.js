import asyncHandler from "../middleware/asyncHandler.middleware.js";
import Task from '../models/Task.model.js'

export const getTasks = asyncHandler(async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch tasks", error: error.message });
  }
});

export const getTaskById = asyncHandler(async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user.id });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ message: "Invalid task ID", error: error.message });
  }
});

export const createTask = asyncHandler(async (req, res) => {
  try {
    const { title, description, dueDate, status } = req.body;

    if (!title || !description || !dueDate) {
      return res.status(400).json({ message: "Please fill out all fields" });
    }

    const newTask = await Task.create({
      title,
      description,
      dueDate,
      status,
      user: req.user.id, 
    });

    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ message: "Failed to create task", error: error.message });
  }
});

export const updateTask = asyncHandler(async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user.id });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(400).json({ message: "Failed to update task", error: error.message });
  }
});

export const deleteTask = asyncHandler(async (req, res) => {
  try {
    
    const task = await Task.findOne({ _id: req.params.id, user: req.user.id });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    await Task.findByIdAndDelete(req.params.id)
    
    res.status(200).json({ message: "Task deleted" });
  } catch (error) {
    res.status(400).json({ message: "Failed to delete task", error: error.message });
  }
});
