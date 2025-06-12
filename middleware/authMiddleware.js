import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const authMiddleware = (allowedRoles = []) => {
  return async (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;

      // Check if token is present
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'No token provided or malformed' });
      }

      const token = authHeader.split(' ')[1];

      let decoded;
      try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
      } catch (err) {
        return res.status(401).json({ message: 'Invalid token', error: err.message });
      }

      // Find user by decoded id
      const user = await User.findById(decoded.id).select('-password');
      if (!user) {
        return res.status(401).json({ message: 'User not found' });
      }

      // Check role permission
      if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
        return res.status(403).json({ message: 'Forbidden: Role not allowed' });
      }

      // Attach user to request object
      req.user = user;
      next();
    } catch (error) {
      console.error("Auth Middleware Error:", error);
      return res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
  };
};

export const protectTailor = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, 'secret');
    if (decoded.role !== 'tailor') throw new Error('Not a tailor');
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ message: 'Unauthorized' });
  }
};
