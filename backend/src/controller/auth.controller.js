import POOL from '../db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await POOL.query(
      'SELECT * FROM users WHERE email = $1',
      [email],
    );
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await POOL.query(
      'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *',
      [email, hashedPassword],
    );
    res
      .status(201)
      .json({ message: 'User registered ', user: newUser.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await POOL.query('SELECT * FROM users WHERE email = $1', [
      email,
    ]);
    if (user.rows.length === 0) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      user.rows[0].password,
    );
    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign(
      { userId: user.rows[0].id },
      process.env.JWT_SECRET,
      {
        expiresIn: '1h',
      },
    );
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
