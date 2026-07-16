const pool = require('../db');
const { checkAndAssignBadges } = require('./badges.service');

async function calculateStats(userId) {
  const habilidades = await pool.query('SELECT COUNT(*) FROM user_skills WHERE user_id = $1', [userId]);
  const proyectos = await pool.query('SELECT COUNT(*) FROM projects WHERE user_id = $1', [userId]);
  const horas = await pool.query('SELECT COALESCE(SUM(hours), 0) AS total FROM study_logs WHERE user_id = $1', [userId]);

  const totalHabilidades = Number(habilidades.rows[0].count);
  const totalProyectos = Number(proyectos.rows[0].count);
  const totalHoras = Number(horas.rows[0].total);

  const puntos = totalHabilidades * 10 + totalProyectos * 50 + totalHoras * 2;

  let nivel = 'Junior';
  if (puntos >= 500) {
    nivel = 'Senior';
  } else if (puntos >= 200) {
    nivel = 'Mid';
  }

  await pool.query(
    `INSERT INTO user_stats (user_id, points, level)
     VALUES ($1, $2, $3)
     ON CONFLICT (user_id) DO UPDATE SET points = $2, level = $3`,
    [userId, puntos, nivel]
  );

  await checkAndAssignBadges(userId);
}

module.exports = { calculateStats };
