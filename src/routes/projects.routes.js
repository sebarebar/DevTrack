const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth.middleware');
const {
  getProjects,
  addProject,
  deleteProject,
  getGithubRepos
} = require('../controllers/projects.controller');

router.get('/', auth, getProjects);
router.post('/', auth, addProject);
router.delete('/:id', auth, deleteProject);
router.get('/github/:username', auth, getGithubRepos);

module.exports = router;
