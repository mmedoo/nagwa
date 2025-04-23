import express from 'express';
import { authenticateToken } from '../middleware/authMiddleware';
import { updateTodos } from '../controllers/todosControllers/updateTodos';
import { getTodos } from '../controllers/todosControllers/getTodos';

const router = express.Router();

router.put('/todos', authenticateToken, updateTodos);
router.get('/todos', authenticateToken, getTodos);

export default router;
