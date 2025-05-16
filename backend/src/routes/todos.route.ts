import express from 'express';
import { authenticateToken } from '../middleware/auth.middleware';
import { updateTodos } from "../controllers/todos.controller";
import { fetchUserTodos } from "../controllers/todos.controller";

const router = express.Router();

router.put('/todos', authenticateToken, updateTodos);
router.get('/todos', authenticateToken, fetchUserTodos);

export default router;
