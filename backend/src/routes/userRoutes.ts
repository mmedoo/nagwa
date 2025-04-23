import express from 'express';
import { authenticateToken } from '../middleware/authMiddleware';
import { createUser } from '../controllers/userControllers/createUser';
import { loginUser } from '../controllers/userControllers/loginUser';
import { logoutUser } from '../controllers/userControllers/logoutUser';
import { getUser } from '../controllers/userControllers/getUser';

const router = express.Router();

router.post('/user/register', createUser);
router.post('/user/login', loginUser);
router.get('/logout', authenticateToken, logoutUser);
router.get('/me', authenticateToken, getUser);

export default router;