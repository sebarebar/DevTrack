import { Router } from 'express';

import { authenticateToken } from '../middlewares/auth.middleware.js';

import {
  getProjects,
  addProject,
  deleteProject,
  getGithubRepos,
} from '../controllers/projects.controller.js';

const router = Router();

router.get('/', authenticateToken, getProjects);

router.post('/', authenticateToken, addProject);

router.delete('/:id', authenticateToken, deleteProject);

router.get('/github/:username', authenticateToken, getGithubRepos);

export default router;