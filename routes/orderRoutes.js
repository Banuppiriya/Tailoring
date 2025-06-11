import express from 'express';
import {
  createOrder,
  getAllOrders,
  getMyOrders,
  updateOrderStatus,
  deleteOrder,
} from '../controllers/orderController.js';
import { authMiddleware } from '../middleware/authMiddleware.js'; // ✅ Keep only this

const router = express.Router();

router.post('/', authMiddleware(['customer']), createOrder);
router.get('/', authMiddleware(['customer']), getMyOrders);
router.get('/admin', authMiddleware(['admin']), getAllOrders);
router.put('/:id', authMiddleware(['admin', 'tailor']), updateOrderStatus);
router.delete('/:id', authMiddleware(['admin']), deleteOrder);

export default router;
