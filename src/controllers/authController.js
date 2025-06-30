import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const signup = async (req, res) => {
  try {
    const { username, password } = req.body;
    // Sequelize: use where clause
    const existing = await User.findOne({ where: { username } });
    if (existing) return res.status(400).json({ message: 'User already exists.' });
    const hashed = await bcrypt.hash(password, 10);
    // Sequelize: use create
    await User.create({ username, password: hashed });
    res.status(201).json({ message: 'Signup successful' });
  } catch (err) {
    // Handle unique constraint error just in case
    if (err.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ message: 'User already exists.' });
    }
    res.status(500).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};