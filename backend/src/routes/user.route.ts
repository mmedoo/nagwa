import express from 'express';
import { authenticateToken } from '../middleware/auth.middleware';
import { loginUser, logoutUser, registerUser } from "../controllers/user.controller";
import { fetchUser } from "../controllers/user.controller";

const router = express.Router();

router.get('/me', authenticateToken, fetchUser);
router.get('/logout', authenticateToken, logoutUser);
router.post('/user/login', loginUser);
router.post('/user/register', registerUser);

export default router;