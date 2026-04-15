import Task from "../models/Task.js";

/**
 * 👤 MY TASKS (USER + ADMIN)
 */
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * ➕ CREATE TASK (SELF OR ASSIGNED)
 */
export const createTask = async (req, res) => {
  try {
    const { title, description, userId } = req.body;

    const task = await Task.create({
      title,
      description,
      user: userId || req.user.id,
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * 👨‍💼 ADMIN → GET USER TASKS
 */
export const getUserTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.params.userId });

    res.json({
      tasks,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * 🗑 DELETE TASK (ADMIN OR OWNER)
 */
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    const isAdmin = req.user.role === "admin";
    const isOwner = task.user.toString() === req.user.id;

    if (!isAdmin && !isOwner) {
      return res.status(403).json({ message: "Not allowed" });
    }

    await task.deleteOne();

    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};