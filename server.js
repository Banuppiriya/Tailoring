import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';



import authRoutes from './routes/authRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
import employeeRoutes from './routes/employeeRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use('/api/orders', orderRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('✅ MongoDB connected successfully');

  // Start server only after successful DB connection
  app.listen(5000, () => {
    console.log('🚀 Server running on port 5000');
  });
})
.catch(err => {
  console.error('❌ MongoDB connection error:', err.message);
  process.exit(1);
});

// Routes (should be set after express.json())
app.use('/api', authRoutes);
app.use('/api', profileRoutes);
app.use('/api', employeeRoutes);
app.use('/api/admin', adminRoutes); // 👈 This sets up the route
app.use('/api/orders', orderRoutes); // 👈 This sets up the route

