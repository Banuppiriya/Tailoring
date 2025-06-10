import express from 'express';
import { getAllUsers } from '../controllers/adminController.js';
import { verifyAdmin } from '../middleware/authMiddleware.js'; // 👈 Add this line

const router = express.Router();

router.get('/users', verifyAdmin, getAllUsers);

export default router;

