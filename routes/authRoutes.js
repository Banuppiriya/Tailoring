import express from 'express';
import { register, login } from '../controllers/authController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

export default router;

// For all logged-in users
router.get('/profile', authMiddleware(), (req, res) => {
  res.json(req.user);
});

// For only admins
router.post('/admin/users', authMiddleware(['admin']), (req, res) => {
  res.json({ message: 'Admin access granted' });
});


