import POOL from '../db.js';

export const calculateStats = async (userId) => {
  try {
    const [skills, projects, study] = await Promise.all([
      POOL.query('SELECT COUNT(*) FROM skills WHERE user_id = $1', [userId]),
      POOL.query('SELECT COUNT(*) FROM projects WHERE user_id = $1', [userId]),
      POOL.query('SELECT SUM(hours) FROM study_logs WHERE user_id = $1', [
        userId,
      ]),
    ]);

    const totalPoints =
      parseInt(skills.rows[0].count) * 10 +
      parseInt(projects.rows[0].count) * 50 +
      parseInt(study.rows[0].sum || 0) * 2;

    let level = 'Junior';
    if (totalPoints >= 500) level = 'Senior';
    else if (totalPoints >= 200) level = 'Mid';

    await POOL.query(
      `INSERT INTO user_stats (user_id, points, level) 
       VALUES ($1, $2, $3) 
       ON CONFLICT (user_id) 
       DO UPDATE SET points = $2, level = $3`,
      [userId, totalPoints, level],
    );

    return { totalPoints, level };
  } catch (error) {
    console.error('Error calculating statistics:', error);
    throw error;
  }
};
