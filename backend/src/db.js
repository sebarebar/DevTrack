import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: false,
});

pool.connect((err, client, done) => {
  if (err) {
    console.error('Error de conexión:', err.message);
  } else {
    console.log('¡Conexión a la base de datos establecida correctamente!');
    client.release();
  }
});

export default pool;
