import express from 'express';
import userRoutes from './routes/userRoutes.js';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import adminRoutes from './routes/adminRoutes.js';


dotenv.config();

connectDB();

const app = express();
app.use(express.json());

app.use('/api/admin', adminRoutes);
app.use('/api/users', userRoutes);


app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));




