import pool from '../db.js';

const getUserStatistics = async (userId) => {
  const skills = await pool.query(
    'SELECT COUNT(*) FROM user_skills WHERE user_id = $1',
    [userId]
  );

  const projects = await pool.query(
    'SELECT COUNT(*) FROM projects WHERE user_id = $1',
    [userId]
  );

  const hours = await pool.query(
    `SELECT COALESCE(SUM(hours),0) AS total
     FROM study_logs
     WHERE user_id = $1`,
    [userId]
  );

  const streak = await pool.query(
    `SELECT current_streak
     FROM user_stats
     WHERE user_id = $1`,
    [userId]
  );

  return {
    skills: Number(skills.rows[0].count),
    projects: Number(projects.rows[0].count),
    hours: Number(hours.rows[0].total),
    streak: streak.rows.length
      ? Number(streak.rows[0].current_streak)
      : 0,
  };
};

const hasBadge = async (userId, badgeId) => {
  const result = await pool.query(
    `SELECT id
     FROM user_badges
     WHERE user_id = $1
       AND badge_id = $2`,
    [userId, badgeId]
  );

  return result.rows.length > 0;
};

export const checkAndAssignBadges = async (userId) => {
  try {

    const stats = await getUserStatistics(userId);

    const badges = await pool.query(
      'SELECT * FROM badges'
    );

    const earnedBadges = [];

    for (const badge of badges.rows) {

      let earned = false;

      switch (badge.condition_type) {

        case 'skills_count':
          earned = stats.skills >= badge.condition_value;
          break;

        case 'projects_count':
          earned = stats.projects >= badge.condition_value;
          break;

        case 'total_hours':
          earned = stats.hours >= badge.condition_value;
          break;

        case 'streak_days':
          earned = stats.streak >= badge.condition_value;
          break;

        default:
          break;
      }

      if (!earned) continue;

      const alreadyHasBadge = await hasBadge(
        userId,
        badge.id
      );

      if (alreadyHasBadge) continue;

      await pool.query(
        `
        INSERT INTO user_badges
        (user_id,badge_id)
        VALUES($1,$2)
        `,
        [userId, badge.id]
      );

      earnedBadges.push(badge.name);
    }

    return earnedBadges;

  } catch (error) {

    console.error(
      'Error assigning badges:',
      error
    );

    throw error;
  }
};