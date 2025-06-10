import express from 'express';
import auth from '../middleware/authMiddleware.js';
import { getProfile, updateProfile } from '../controllers/profileController.js';

const router = express.Router();
router.get('/profile', auth(), getProfile);
router.put('/profile', auth(), updateProfile);

export default router;
