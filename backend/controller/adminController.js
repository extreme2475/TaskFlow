import Task from "../models/Task.js";
import User from "../models/User.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserTasks = async (req, res) => {
  try {
    const userId = req.params.userId;

    const tasks = await Task.find({ user: userId });

    res.status(200).json({
      success: true,
      tasks,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};