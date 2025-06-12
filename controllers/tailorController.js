import Tailor from '../models/Tailor.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Register
export const registerTailor = async (req, res) => {
  try {
    const { name, email, password, contactNumber, specialization } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const tailor = new Tailor({ name, email, password: hashedPassword, contactNumber, specialization });
    await tailor.save();

    res.status(201).json({ message: 'Tailor registered successfully' });
  } catch (err) {
    res.status(400).json({ message: 'Registration failed', error: err.message });
  }
};

// Login
export const loginTailor = async (req, res) => {
  try {
    const { email, password } = req.body;
    const tailor = await Tailor.findOne({ email });

    if (!tailor || !(await bcrypt.compare(password, tailor.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: tailor._id, role: 'tailor' }, 'secret', { expiresIn: '1d' });
    res.json({ message: 'Login successful', token });
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
};
