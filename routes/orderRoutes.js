// routes/orderRoutes.js
import express from 'express';
import {
  createOrder,
  getAllOrders,
  getMyOrders,
  updateOrderStatus,
  deleteOrder,
} from '../controllers/orderController.js';

import auth, { verifyAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', auth(['customer']), createOrder);
router.get('/', auth(['customer']), getMyOrders);
router.get('/admin', auth(['admin']), getAllOrders);
router.put('/:id', auth(['admin', 'tailor']), updateOrderStatus);
router.delete('/:id', auth(['admin']), deleteOrder);

export default router;
