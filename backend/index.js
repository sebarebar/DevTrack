const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta de prueba
app.get('/', (req, res) => {
    res.json({ message: 'DevTrack API running 🚀' });
});

// Servidor
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});