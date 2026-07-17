import pool from '../db.js';
import { calculateStats } from '../services/stats.service.js';

// GET /api/skills
export const getSkills = async (req, res) => {
    try {
        const userId = req.user.id;

        const result = await pool.query(
            `
      SELECT
        us.id,
        us.level,
        s.id AS skill_id,
        s.name,
        sc.name AS category
      FROM user_skills us
      INNER JOIN skills s
        ON us.skill_id = s.id
      LEFT JOIN skill_categories sc
        ON s.category_id = sc.id
      WHERE us.user_id = $1
      ORDER BY s.name ASC
      `,
            [userId]
        );

        res.status(200).json(result.rows);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: 'Internal server error.',
        });
    }
};

// POST /api/skills
export const addSkill = async (req, res) => {
    try {
        const userId = req.user.id;
        const { skill_id, level } = req.body;

        if (!skill_id || !level) {
            return res.status(400).json({
                error: 'skill_id and level are required.',
            });
        }

        const exists = await pool.query(
            `
      SELECT id
      FROM user_skills
      WHERE user_id = $1
      AND skill_id = $2
      `,
            [userId, skill_id]
        );

        if (exists.rows.length > 0) {
            return res.status(409).json({
                error: 'Skill already added.',
            });
        }

        const result = await pool.query(
            `
      INSERT INTO user_skills
      (user_id, skill_id, level)
      VALUES ($1, $2, $3)
      RETURNING *
      `,
            [userId, skill_id, level]
        );

        await calculateStats(userId);

        res.status(201).json({
            message: 'Skill added successfully.',
            skill: result.rows[0],
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: 'Internal server error.',
        });
    }
};

// PUT /api/skills/:id
export const updateSkill = async (req, res) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;
        const { level } = req.body;

        if (!level) {
            return res.status(400).json({
                error: 'Level is required.',
            });
        }

        const result = await pool.query(
            `
      UPDATE user_skills
      SET level = $1
      WHERE id = $2
      AND user_id = $3
      RETURNING *
      `,
            [level, id, userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                error: 'Skill not found.',
            });
        }

        res.status(200).json({
            message: 'Skill updated successfully.',
            skill: result.rows[0],
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: 'Internal server error.',
        });
    }
};

// DELETE /api/skills/:id
export const deleteSkill = async (req, res) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;

        const result = await pool.query(
            `
      DELETE FROM user_skills
      WHERE id = $1
      AND user_id = $2
      RETURNING *
      `,
            [id, userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                error: 'Skill not found.',
            });
        }

        await calculateStats(userId);

        res.status(200).json({
            message: 'Skill deleted successfully.',
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: 'Internal server error.',
        });
    }
};