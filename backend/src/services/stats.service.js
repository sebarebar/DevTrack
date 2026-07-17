import pool from '../config/db.js';
import { checkAndAssignBadges } from './badges.service.js';

export const calculateStats = async (userId) => {
  try {
    const [skillsResult, projectsResult, studyLogsResult] = await Promise.all([
      pool.query(
        'SELECT COUNT(*) FROM user_skills WHERE user_id = $1',
        [userId]
      ),
      pool.query(
        'SELECT COUNT(*) FROM projects WHERE user_id = $1',
        [userId]
      ),
      pool.query(
        `SELECT COALESCE(SUM(hours), 0) AS total
         FROM study_logs
         WHERE user_id = $1`,
        [userId]
      ),
    ]);

    const totalSkills = Number(skillsResult.rows[0].count);
    const totalProjects = Number(projectsResult.rows[0].count);
    const totalHours = Number(studyLogsResult.rows[0].total);

    const totalPoints =
      totalSkills * 10 +
      totalProjects * 50 +
      totalHours * 2;

    let level = 'Junior';

    if (totalPoints >= 500) {
      level = 'Senior';
    } else if (totalPoints >= 200) {
      level = 'Mid';
    }

    await pool.query(
      `
      INSERT INTO user_stats (user_id, points, level)
      VALUES ($1, $2, $3)
      ON CONFLICT (user_id)
      DO UPDATE
      SET
        points = EXCLUDED.points,
        level = EXCLUDED.level
      `,
      [userId, totalPoints, level]
    );

    await checkAndAssignBadges(userId);

    return {
      totalSkills,
      totalProjects,
      totalHours,
      totalPoints,
      level,
    };
  } catch (error) {
    console.error('Error calculating user statistics:', error);
    throw error;
  }
};