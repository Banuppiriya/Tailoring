import express from 'express';
import {
  adminLogin,
  getAllUsers,
  updateUserRole,
  createUser,
  deleteUser,
  getAllOrders,
  updateOrderStatus,
  createOrder,
  deleteOrder,
  getAllServices,
  createService,
  deleteService
} from '../controllers/adminController.js';

import adminMiddleware from '../middleware/adminMiddleware.js';

const router = express.Router();

// Admin routes
router.post('/login', adminLogin);

router.get('/admin-only', adminMiddleware, (req, res) => {
  res.send('Welcome Admin!');
});

router.get('/users', adminMiddleware, getAllUsers);
router.put('/users/:id/role', adminMiddleware, updateUserRole);
router.post('/users', adminMiddleware, createUser);
router.delete('/users/:id', adminMiddleware, deleteUser);

router.get('/orders', adminMiddleware, getAllOrders);
router.put('/orders/:orderId/status', adminMiddleware, updateOrderStatus);
router.post('/orders', adminMiddleware, createOrder);
router.delete('/orders/:orderId', adminMiddleware, deleteOrder);

router.get('/services', adminMiddleware, getAllServices);
router.post('/services', adminMiddleware, createService);
router.delete('/services/:id', adminMiddleware, deleteService);

export default router;