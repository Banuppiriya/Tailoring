import { authMiddleware } from '../middleware/authMiddleware.js';
import { getProfile, updateProfile } from '../controllers/profileController.js';
import express from 'express';

const router = express.Router();
router.get('/profile', authMiddleware, getProfile);
router.put('/profile', authMiddleware, updateProfile);


export default router;