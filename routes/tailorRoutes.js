import express from 'express';
import {
  registerTailor,
  loginTailor
} from '../controllers/tailorController.js';

import {
  getOrdersForTailor
} from '../controllers/orderController.js';

import { protectTailor } from '../middleware/authMiddleware.js';

const router = express.Router();

// Tailor Auth
router.post('/tailor/register', registerTailor);
router.post('/tailor/login', loginTailor);

// Tailor Order View
router.get('/tailor/orders', protectTailor, getOrdersForTailor);

export default router;
