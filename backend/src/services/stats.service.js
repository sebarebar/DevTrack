import pool from '../db.js';
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
        `
        SELECT COALESCE(SUM(hours),0) AS total
        FROM study_logs
        WHERE user_id = $1
        `,
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

    let currentLevel = 'Junior';

    if (totalPoints >= 500) {
      currentLevel = 'Senior';
    } else if (totalPoints >= 200) {
      currentLevel = 'Mid';
    }

    await pool.query(
      `
      INSERT INTO user_stats
      (
        user_id,
        total_points,
        current_level
      )
      VALUES ($1,$2,$3)

      ON CONFLICT (user_id)

      DO UPDATE SET
        total_points = EXCLUDED.total_points,
        current_level = EXCLUDED.current_level,
        updated_at = CURRENT_TIMESTAMP
      `,
      [
        userId,
        totalPoints,
        currentLevel,
      ]
    );

    await checkAndAssignBadges(userId);

    return {
      totalSkills,
      totalProjects,
      totalHours,
      totalPoints,
      currentLevel,
    };

  } catch (error) {
    console.error('Error calculating stats:', error);
    throw error;
  }
};