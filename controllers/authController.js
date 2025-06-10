import User from '../models/User.js'; // or the correct path to your User model
import bcrypt from 'bcryptjs';
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Missing fields' });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, 'SECRET_KEY');

    res.status(200).json({ message: 'Login successful', token });

  } catch (error) {
    console.error('Error in login:', error.message);
    res.status(500).json({ message: 'Login Failed' });
  }
};
export const register = async (req, res) => {
  try {
    const { name, email, password , role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: 'Missing fields' });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: 'user'
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });

  } catch (error) {
    console.error('Error in register:', error.message);
    res.status(500).json({ message: 'Registration Failed' });
  }
};