import mongoose from 'mongoose';

const tailorSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String, // Hash in production
  contactNumber: String,
  specialization: String
}, {
  timestamps: true
});

export default mongoose.model('Tailor', tailorSchema);
