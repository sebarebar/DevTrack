import pool from '../db.js';
import { calculateStats } from '../services/stats.service.js';
import { calculateStreak } from '../services/streak.service.js';

// GET /api/study-logs
export const getStudyLogs = async (req, res) => {
    try {
        const userId = req.user.id;

        const result = await pool.query(
            `
      SELECT *
      FROM study_logs
      WHERE user_id = $1
      ORDER BY log_date DESC
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

// POST /api/study-logs
export const addStudyLog = async (req, res) => {
    try {
        const userId = req.user.id;
        const { hours, log_date } = req.body;

        if (hours < 0.5 || hours > 24) {
    return res.status(400).json({
        error: 'Las horas deben estar entre 0.5 y 24.'
    });
}

        if (!hours || !log_date) {
            return res.status(400).json({
                error: 'Hours and log_date are required.',
            });
        }

        const exists = await pool.query(
            `
        SELECT id
        FROM study_logs
        WHERE user_id = $1
        AND log_date = $2
        `,
            [userId, log_date]
        );

        if (exists.rows.length > 0) {
            return res.status(409).json({
                error: 'A study log already exists for this date.',
            });
        }

        const result = await pool.query(
            `
      INSERT INTO study_logs
      (user_id, hours, log_date)
      VALUES ($1, $2, $3)
      RETURNING *
      `,
            [userId, hours, log_date]
        );

        await calculateStats(userId);
        await calculateStreak(userId);

        res.status(201).json({
            message: 'Study log created successfully.',
            studyLog: result.rows[0],
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: 'Internal server error.',
        });
    }
};

// PUT /api/study-logs/:id
export const updateStudyLog = async (req, res) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;
        const { hours, log_date } = req.body;

        if (!hours || !log_date) {
            return res.status(400).json({
                error: 'Hours and log_date are required.',
            });
        }

        // Check if another log already exists for the same date
        const exists = await pool.query(
            `
      SELECT id
      FROM study_logs
      WHERE user_id = $1
        AND log_date = $2
        AND id <> $3
      `,
            [userId, log_date, id]
        );

        if (exists.rows.length > 0) {
            return res.status(409).json({
                error: 'A study log already exists for this date.',
            });
        }

        const result = await pool.query(
            `
      UPDATE study_logs
      SET
        hours = $1,
        log_date = $2
      WHERE
        id = $3
        AND user_id = $4
      RETURNING *
      `,
            [hours, log_date, id, userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                error: 'Study log not found.',
            });
        }

        await calculateStats(userId);
        await calculateStreak(userId);

        res.status(200).json({
            message: 'Study log updated successfully.',
            studyLog: result.rows[0],
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: 'Internal server error.',
        });
    }
};

// DELETE /api/study-logs/:id
export const deleteStudyLog = async (req, res) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;

        console.log('StudyLog ID:', id);
        console.log('User ID:', userId);

        const result = await pool.query(
            `
      DELETE FROM study_logs
      WHERE id = $1
      AND user_id = $2
      RETURNING *
      `,
            [id, userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                error: 'Study log not found.',
            });
        }

        await calculateStats(userId);
        await calculateStreak(userId);

        res.status(200).json({
            message: 'Study log deleted successfully.',
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: 'Internal server error.',
        });
    }
};