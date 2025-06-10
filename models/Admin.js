// models/Admin.js
import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // hashed
  name: { type: String },
  role: { type: String, default: 'admin' }
});

export default mongoose.model('Admin', adminSchema);
