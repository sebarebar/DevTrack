const pool = require('../db');

const reglas = [
  { code: 'first_skill', cumple: (s) => s.total_skills >= 1 },
  { code: 'first_project', cumple: (s) => s.total_projects >= 1 },
  { code: 'ten_hours', cumple: (s) => s.total_hours >= 10 },
  { code: 'five_skills', cumple: (s) => s.total_skills >= 5 },
  { code: 'week_streak', cumple: (s) => s.current_streak >= 7 }
];

async function obtenerStats(userId) {
  const skills = await pool.query('SELECT COUNT(*) FROM user_skills WHERE user_id = $1', [userId]);
  const projects = await pool.query('SELECT COUNT(*) FROM projects WHERE user_id = $1', [userId]);
  const hours = await pool.query('SELECT COALESCE(SUM(hours), 0) AS total FROM study_logs WHERE user_id = $1', [userId]);
  const stats = await pool.query('SELECT current_streak FROM user_stats WHERE user_id = $1', [userId]);

  return {
    total_skills: Number(skills.rows[0].count),
    total_projects: Number(projects.rows[0].count),
    total_hours: Number(hours.rows[0].total),
    current_streak: stats.rows[0] ? Number(stats.rows[0].current_streak) : 0
  };
}

async function usuarioTieneInsignia(userId, idInsignia) {
  const resultado = await pool.query(
    'SELECT 1 FROM user_badges WHERE user_id = $1 AND badge_id = $2',
    [userId, idInsignia]
  );
  return resultado.rowCount > 0;
}

async function checkAndAssignBadges(userId) {
  const stats = await obtenerStats(userId);
  const otorgados = [];

  for (const regla of reglas) {
    if (!regla.cumple(stats)) {
      continue;
    }

    const insignia = await pool.query('SELECT id, code FROM badges WHERE code = $1', [regla.code]);
    if (insignia.rowCount === 0) {
      continue;
    }

    const idInsignia = insignia.rows[0].id;
    if (await usuarioTieneInsignia(userId, idInsignia)) {
      continue;
    }

    await pool.query(
      'INSERT INTO user_badges (user_id, badge_id) VALUES ($1, $2)',
      [userId, idInsignia]
    );
    otorgados.push(insignia.rows[0].code);
  }

  return otorgados;
}

module.exports = { checkAndAssignBadges };
