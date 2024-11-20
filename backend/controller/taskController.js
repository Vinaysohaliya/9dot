import asyncHandler from "../middleware/asyncHandler.middleware.js";
import Task from "../models/Task.js";

export const getTasks =asyncHandler( async (req, res) => {
  try {

    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
})

export const getTaskById =asyncHandler( async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ message: "Invalid ID" });
  }
})




export const createTask = asyncHandler(async (req, res) => {
  try {

    const { title, description, dueDate, status } = req.body;
    const newTask = await Task.create({ title, description, dueDate, status });
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ message: "Invalid data" });
  }
})

export const updateTask =asyncHandler( async (req, res) => {
  try {

    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(400).json({ message: "Invalid ID or data" });
  }
})

export const deleteTask =asyncHandler( async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ message: "Task deleted" });
  } catch (error) {
    res.status(400).json({ message: "Invalid ID" });
  }
})
