import User from '../models/User.js';
import Order from '../models/Order.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';
import Service from '../models/Service.js';

//Admin login function
export const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(401).json({ message: 'Invalid email ' });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid password' });

    const token = jwt.sign({ id: admin._id, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '7d' });

    // Remove password before sending response
    const { password: _, ...adminData } = admin.toObject();

    return res.status(200).json({ message: 'Login successful', token, admin: adminData });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

//Admin login endpoint

//Admin get all users function
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users' });
  }
};
//Admin get all users endpoint

//Admin update user role function
export const updateUserRole = async (req, res) => {
  const { role } = req.body;
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    user.role = role;
    await user.save();
    res.json({ message: `User role updated to ${role}` });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update user role' });
  }
};
//Admin update user role endpoint

//Admin create user function
export const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashedPassword, role });
    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create user', error: error.message });
  }
};
//Admin create user endpoint

//Admin delete user function
export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete user', error: error.message });
  }
};
//Admin delete user endpoint

//Admin get all orders function

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('user', 'name email');
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Could not fetch orders', error: error.message });
  }
};
//Admin get all orders endpoint

//Admin update order status function
export const updateOrderStatus = async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  try {
    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    order.status = status;
    await order.save();

    res.status(200).json({ message: 'Order status updated', order });
  } catch (error) {
    res.status(500).json({ message: 'Error updating order status', error: error.message });
  }
};
//Admin update order status endpoint

//Admin create order function
export const createOrder = async (req, res) => {
  try {
    const { user, items, total, status } = req.body;
    const newOrder = await Order.create({ user, items, total, status });
    res.status(201).json({ message: 'Order created successfully', order: newOrder });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create order', error: error.message });
  }
};
//Admin create order endpoint

//Admin delete order function
export const deleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.orderId);
    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete order', error: error.message });
  }
};
//Admin delete order endpoint

//Admin get all services function
export const getAllServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch services' });
  }
};
//Admin get all services endpoint

// Admin create service function
export const createService = async (req, res) => {
  try {
    const {
      name,
      price,
      description,
      category,
      estimatedDeliveryDays,
      isAvailable
    } = req.body;

    // Validate category enum
    const validCategories = ['Mens', 'Womens', 'Kids',];
    if (!validCategories.includes(category)) {
      return res.status(400).json({ message: 'Invalid category' });
    }

    let imageUrl = '';
    if (req.file) {
      const result = await uploadToCloudinary(req.file.path);
      imageUrl = result.secure_url;
    }

    const newService = new Service({
      name,
      price,
      description,
      category,
      estimatedDeliveryDays,
      isAvailable,
      imageUrl
    });

    await newService.save();
    res.status(201).json({ message: 'Service created', service: newService });

  } catch (error) {
    res.status(500).json({ message: 'Failed to create service', error: error.message });
  }
};
// Admin create service endpoint

// Admin delete service function
export const deleteService = async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.json({ message: 'Service deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete service', error: error.message });
  }
};
// Admin delete service endpoint

// Admin assign tailor to order function
export const assignTailorToOrder = async (req, res) => {
  try {
    const { orderId, tailorId } = req.body;

    const order = await Order.findByIdAndUpdate(orderId, { tailorId }, { new: true });
    res.json({ message: 'Tailor assigned', order });
  } catch (err) {
    res.status(500).json({ message: 'Assignment failed', error: err.message });
  }
};
// Admin assign tailor to order endpoint