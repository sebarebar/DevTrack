import { Router } from 'express';
import { registerUser, loginUser } from '../controller/auth.controller.js';

const router = Router();

router.post('/register', registerUser);
router.get('/login', loginUser);

export default router;
