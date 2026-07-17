import { Router } from 'express';

import { authenticateToken } from '../middlewares/auth.middleware.js';

import {
  getStudyLogs,
  addStudyLog,
  updateStudyLog,
  deleteStudyLog,
} from '../controllers/studyLogs.controller.js';

const router = Router();

router.get('/', authenticateToken, getStudyLogs);

router.post('/', authenticateToken, addStudyLog);

router.put('/:id', authenticateToken, updateStudyLog);

router.delete('/:id', authenticateToken, deleteStudyLog);

export default router;