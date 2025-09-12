import Task from "../models/Task.js";

// Get all tasks with optional filtering
export const getAllTasks = async (req, res) => {
  try {
    const { status, priority } = req.query;
    let filter = { user: req.user._id };
    
    if (status) filter.status = status;
    if (priority) filter.priority = priority;
    
    const tasks = await Task.find(filter).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Create new task
export const createTask = async (req, res) => {
  try {
    const { title, description, priority, category, dueDate } = req.body;
    
    const task = new Task({
      title,
      description,
      priority,
      category,
      dueDate,
      user: req.user._id
    });
    
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update existing task
export const updateTask = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user._id });
    
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    
    Object.assign(task, req.body);
    await task.save();
    
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete task
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get task statistics
export const getTaskStats = async (req, res) => {
  try {
    const totalTasks = await Task.countDocuments({ user: req.user._id });
    const completedTasks = await Task.countDocuments({ user: req.user._id, status: 'completed' });
    const inProgressTasks = await Task.countDocuments({ user: req.user._id, status: 'in_progress' });
    const pendingTasks = await Task.countDocuments({ user: req.user._id, status: 'pending' });
    
    res.json({
      total: totalTasks,
      completed: completedTasks,
      inProgress: inProgressTasks,
      pending: pendingTasks,
      completionRate: totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};