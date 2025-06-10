// controllers/orderController.js
import Order from '../models/Order.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// @desc    Create a new order
// @route   POST /api/orders
// @access  Private (Customer)
export const createOrder = async (req, res) => {
  try {
    const { clothingType, measurements, deliveryDate } = req.body;

    const newOrder = await Order.create({
      user: req.user.id,
      clothingType,
      measurements,
      deliveryDate,
      status: 'pending',
    });

    res.status(201).json(newOrder);
  } catch (error) {
    res.status(400).json({ error: 'Order creation failed', details: error.message });
  }
};

// @desc    Get all orders (for admin)
// @route   GET /api/orders/admin
// @access  Private (Admin)
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('user', 'name email');
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders', details: error.message });
  }
};

// @desc    Get orders for logged-in customer
// @route   GET /api/orders
// @access  Private (Customer)
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Could not fetch your orders', details: error.message });
  }
};

// @desc    Update order status
// @route   PUT /api/orders/:id
// @access  Private (Admin or Tailor)
export const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ error: 'Order not found' });

    order.status = req.body.status || order.status;
    await order.save();

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update order status', details: error.message });
  }
};

// @desc    Delete an order
// @route   DELETE /api/orders/:id
// @access  Private (Admin)
export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ error: 'Order not found' });

    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete order', details: error.message });
  }
};
