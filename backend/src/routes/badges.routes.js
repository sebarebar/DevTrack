import { Router } from 'express';
import { authenticateToken } from '../middlewares/auth.middleware.js';
import pool from '../db.js';

const router = Router();

router.get('/', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const result = await pool.query(
            `SELECT b.*,
                    CASE WHEN ub.id IS NOT NULL THEN true ELSE false END AS earned
             FROM badges b
             LEFT JOIN user_badges ub ON ub.badge_id = b.id AND ub.user_id = $1
             ORDER BY b.name`,
            [userId]
        );
        res.status(200).json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

export default router;
