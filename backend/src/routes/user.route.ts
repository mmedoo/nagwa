import express from 'express';
import { authenticateToken } from '../middleware/auth.middleware';
import { registerUser } from '../controllers/user.controller/registerUser';
import { loginUser } from '../controllers/user.controller/loginUser';
import { logoutUser } from '../controllers/user.controller/logoutUser';
import { fetchUser } from '../controllers/user.controller/fetchUser';

const router = express.Router();

router.get('/me', authenticateToken, fetchUser);
router.post('/user/login', loginUser);
router.post('/user/register', registerUser);
router.get('/logout', authenticateToken, logoutUser);

export default router;