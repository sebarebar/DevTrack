import { Router } from 'express';

import { authenticateToken } from '../middlewares/auth.middleware.js';

import {
    getSkills,
    addSkill,
    updateSkill,
    deleteSkill,
    getSkillsCatalog,
} from '../controllers/skills.controller.js';

const router = Router();

// GET catalog (all skills + categories)
router.get('/catalog', authenticateToken, getSkillsCatalog);

// GET all user skills
router.get('/', authenticateToken, getSkills);

// Add a new skill
router.post('/', authenticateToken, addSkill);

// Update skill level
router.put('/:id', authenticateToken, updateSkill);

// Delete a skill
router.delete('/:id', authenticateToken, deleteSkill);

export default router;