import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const signup = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Mongoose: find user by field directly
    const existing = await User.findOne({ username });
    if (existing) {
      return res.status(400).json({ message: 'User already exists.' });
    }

    const hashed = await bcrypt.hash(password, 10);

    // Mongoose: create a new user document
    const user = new User({
      username,
      password: hashed,
    });

    await user.save();

    res.status(201).json({ message: 'Signup successful' });
  } catch (err) {
    // Handle duplicate key error (unique constraint)
    if (err.code === 11000) {
      return res.status(400).json({ message: 'User already exists.' });
    }
    res.status(500).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Mongoose: find by field directly
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
