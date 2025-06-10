import express from 'express';
import {
  adminLogin,
  getAllUsers,
  getAllOrders,
  updateOrderStatus,
  updateUserRole,
  createUser,
  deleteUser,
  createOrder,
  deleteOrder
} from '../controllers/adminController.js';

import { verifyAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', adminLogin);

// Protected routes below
router.get('/users', verifyAdmin, getAllUsers);
router.get('/orders', verifyAdmin, getAllOrders);
router.put('/order/:orderId', verifyAdmin, updateOrderStatus);
router.put('/user/:id/role', verifyAdmin, updateUserRole);
router.post('/user', verifyAdmin, createUser);
router.delete('/user/:id', verifyAdmin, deleteUser);
router.post('/order', verifyAdmin, createOrder);
router.delete('/order/:orderId', verifyAdmin, deleteOrder);

export default router;
