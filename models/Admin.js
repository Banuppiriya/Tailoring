import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        // Minimum 6 characters, must contain at least one letter and one number
        return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(value);
      },
      message: 'Password must be at least 6 characters and include at least one letter and one number.'
    }
  },
  name: { type: String },
  role: { type: String, default: 'admin' }
});

export default mongoose.model('Admin', adminSchema);
