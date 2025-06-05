import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
  try {
    const hashed = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({ ...req.body, password: hashed });
    const token = jwt.sign({ id: user._id, role: user.role }, 'SECRET_KEY');
    res.status(201).json({ user_id: user._id, token });
  } catch {
    res.status(400).json({ error: 'Registration failed' });
  }
};

export const login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  const valid = user && await bcrypt.compare(req.body.password, user.password);
  if (!valid) return res.status(401).json({ error: 'Invalid credentials' });

  const token = jwt.sign({ id: user._id, role: user.role }, 'SECRET_KEY');
  res.status(200).json({ token, role: user.role });
};
