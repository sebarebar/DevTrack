import pool from '../db.js';
import { calculateStats } from '../services/stats.service.js';

export const getProjects = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT *
        FROM projects
        WHERE user_id = $1
        ORDER BY created_at DESC`,
      [req.user.userId]
    );

    res.status(200).json(result.rows);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: 'Internal server error'
    });
  }
};

export const addProject = async (req, res) => {

  const {
    name,
    description,
    url
  } = req.body;

  if (!name) {
    return res.status(400).json({
      error: 'Project name is required.'
    });
  }

  try {

    const result = await pool.query(
      `
      INSERT INTO projects
      (user_id, name, description, url)
      VALUES ($1,$2,$3,$4)
      RETURNING *
      `,
      [
        req.user.userId,
        name,
        description,
        url
      ]
    );

    await calculateStats(req.user.userId);

    res.status(201).json(result.rows[0]);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: 'Internal server error'
    });

  }

};

export const deleteProject = async (req, res) => {

  try {

    const result = await pool.query(
      `
      DELETE FROM projects
      WHERE id = $1
      AND user_id = $2
      RETURNING *
      `,
      [
        req.params.id,
        req.user.userId
      ]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        error: 'Project not found.'
      });
    }

    await calculateStats(req.user.userId);

    res.json({
      message: 'Project deleted successfully.'
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: 'Internal server error'
    });

  }

};

export const getGithubRepos = async (req, res) => {

  const { username } = req.params;

  try {

    const response = await fetch(
      `https://api.github.com/users/${username}/repos`,
      {
        headers: {
          'User-Agent': 'DevTrack'
        }
      }
    );

    if (!response.ok) {
      return res.status(404).json({
        error: 'GitHub user not found.'
      });
    }

    const repositories = await response.json();

    const repos = repositories.map(repo => ({
      name: repo.name,
      description: repo.description,
      url: repo.html_url
    }));

    res.json(repos);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: 'Internal server error'
    });

  }

};