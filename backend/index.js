import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './src/routes/auth.routes.js';
import skillsRoutes from './src/routes/skills.routes.js';
import projectsRoutes from './src/routes/projects.routes.js';
import studyLogsRoutes from './src/routes/studyLogs.routes.js';
import badgesRoutes from './src/routes/badges.routes.js';
import profileRoutes from './src/routes/profile.routes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/skills', skillsRoutes);
app.use('/api/projects', projectsRoutes);
app.use('/api/study-logs', studyLogsRoutes);
app.use('/api/badges', badgesRoutes);
app.use('/api/profile', profileRoutes);

// Health check
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'DevTrack API is running.',
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Route not found.',
  });
});

app.listen(PORT, () => {
  console.log(`🚀 DevTrack API running on http://localhost:${PORT}`);
});