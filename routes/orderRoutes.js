import express from 'express';
import {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder
} from '../controllers/orderController.js';

const router = express.Router();

// POST - Create Order
router.post('/', createOrder);

// GET - All Orders
router.get('/', getAllOrders);

// GET - Single Order by ID
router.get('/:id', getOrderById);

// PUT - Update Order
router.put('/:id', updateOrder);

// DELETE - Delete Order
router.delete('/:id', deleteOrder);

export default router;
