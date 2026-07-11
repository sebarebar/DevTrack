import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
// app.use(cors());

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello from DEVTRACK...');
});

app.listen(PORT, () => {
  console.log(`Running on port http://localhost:${PORT}`);
});
