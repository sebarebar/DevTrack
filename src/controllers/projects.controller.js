const pool = require('../db');
const { calculateStats } = require('../services/stats.service');

async function getProjects(req, res) {
  try {
    const resultado = await pool.query(
      'SELECT * FROM projects WHERE user_id = $1 ORDER BY id DESC',
      [req.user.id]
    );
    res.json(resultado.rows);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener proyectos' });
  }
}

async function addProject(req, res) {
  const { name, description, url } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'El nombre es obligatorio' });
  }

  try {
    const resultado = await pool.query(
      'INSERT INTO projects (user_id, name, description, url) VALUES ($1, $2, $3, $4) RETURNING *',
      [req.user.id, name, description, url]
    );
    await calculateStats(req.user.id);
    res.status(201).json(resultado.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear proyecto' });
  }
}

async function deleteProject(req, res) {
  try {
    const resultado = await pool.query(
      'DELETE FROM projects WHERE id = $1 AND user_id = $2 RETURNING *',
      [req.params.id, req.user.id]
    );

    if (resultado.rowCount === 0) {
      return res.status(404).json({ error: 'Proyecto no encontrado' });
    }

    await calculateStats(req.user.id);
    res.json({ mensaje: 'Proyecto eliminado' });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar proyecto' });
  }
}

async function getGithubRepos(req, res) {
  const { username } = req.params;

  try {
    const respuesta = await fetch(`https://api.github.com/users/${username}/repos`, {
      headers: { 'User-Agent': 'DevTrack' }
    });

    if (!respuesta.ok) {
      return res.status(404).json({ error: 'Usuario de GitHub no encontrado' });
    }

    const repositorios = await respuesta.json();
    const datos = repositorios.map((repositorio) => ({
      name: repositorio.name,
      description: repositorio.description,
      url: repositorio.html_url
    }));

    res.json(datos);
  } catch (err) {
    res.status(500).json({ error: 'Error al consultar GitHub' });
  }
}

module.exports = { getProjects, addProject, deleteProject, getGithubRepos };
