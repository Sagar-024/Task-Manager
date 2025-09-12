import express from 'express';
import { auth } from '../middleware/auth.js';
import { getAllTasks, createTask, updateTask, deleteTask, getTaskStats } from '../controllers/task.js';

const router = express.Router();

// Get task statistics (must be before /:id routes)
router.get('/stats', auth, getTaskStats);

// Get all tasks for user
router.get('/', auth, getAllTasks);

// Create task
router.post('/', auth, createTask);

// Update task
router.put('/:id', auth, updateTask);

// Delete task
router.delete('/:id', auth, deleteTask);

export default router;
