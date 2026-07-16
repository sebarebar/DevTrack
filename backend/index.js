import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './src/routes/auth.routes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Hello from DEVTRACK...');
});

app.listen(PORT, () => {
  console.log(`Running on port http://localhost:${PORT}`);
});
