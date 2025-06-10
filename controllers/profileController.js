import User from '../models/User.js';
import bcrypt from 'bcryptjs';

export const getProfile = async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  res.json({ user });
};






export const updateProfile = async (req, res) => {
  const updated = await User.findByIdAndUpdate(req.user.id, req.body, { new: true }).select('-password');
  res.json({ updated_user: updated });
};
