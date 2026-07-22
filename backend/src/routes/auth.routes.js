import { Router } from 'express';
import {
    registerUser,
    loginUser,
    getMe,
} from '../controllers/auth.controller.js';
import { authenticateToken } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', authenticateToken, getMe);

export default router;  