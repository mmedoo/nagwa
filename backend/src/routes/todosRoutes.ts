import express from 'express';
import { authenticateToken } from '../middleware/authMiddleware';
import { updateTodos } from '../controllers/todos/putTodos';
import { fetchUserTodos } from '../controllers/todos/getTodos';

const router = express.Router();

router.put('/todos', authenticateToken, updateTodos);
router.get('/todos', authenticateToken, fetchUserTodos);

export default router;
