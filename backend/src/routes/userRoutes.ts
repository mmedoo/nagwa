import express from 'express';
import { authenticateToken } from '../middleware/authMiddleware';
import { registerUser } from '../controllers/user/registerUser';
import { loginUser } from '../controllers/user/loginUser';
import { logoutUser } from '../controllers/user/logoutUser';
import { fetchUser } from '../controllers/user/fetchUser';

const router = express.Router();

router.post('/user/register', registerUser);
router.post('/user/login', loginUser);
router.get('/logout', authenticateToken, logoutUser);
router.get('/me', authenticateToken, fetchUser);

export default router;