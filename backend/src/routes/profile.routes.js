import { Router } from 'express';
import pool from '../db.js';

const router = Router();

router.get('/:username', async (req, res) => {
    try {
        const { username } = req.params;
        const userResult = await pool.query(
            `SELECT u.id, u.username, u.full_name, u.avatar_url, u.github_username,
                    COALESCE(us.total_points, 0) AS total_points,
                    COALESCE(us.current_level, 'Junior') AS current_level,
                    COALESCE(us.current_streak, 0) AS current_streak
             FROM users u
             LEFT JOIN user_stats us ON us.user_id = u.id
             WHERE u.username = $1`,
            [username]
        );
        if (userResult.rows.length === 0) {
            return res.status(404).json({ error: 'User not found.' });
        }
        const user = userResult.rows[0];
        const [skillsResult, projectsResult, badgesResult] = await Promise.all([
            pool.query(
                `SELECT s.name, us.level, sc.name AS category
                 FROM user_skills us
                 JOIN skills s ON s.id = us.skill_id
                 LEFT JOIN skill_categories sc ON sc.id = s.category_id
                 WHERE us.user_id = $1
                 ORDER BY s.name`,
                [user.id]
            ),
            pool.query(
                `SELECT * FROM projects WHERE user_id = $1 ORDER BY created_at DESC`,
                [user.id]
            ),
            pool.query(
                `SELECT b.* FROM badges b
                 INNER JOIN user_badges ub ON ub.badge_id = b.id
                 WHERE ub.user_id = $1
                 ORDER BY b.name`,
                [user.id]
            ),
        ]);
        res.status(200).json({
            user,
            skills: skillsResult.rows,
            projects: projectsResult.rows,
            badges: badgesResult.rows,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

export default router;
