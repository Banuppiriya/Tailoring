import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  tailorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  price: { type: Number, required: true },
  description: { type: String },
  category: { type: String }, // optional categories
  estimatedDeliveryDays: { type: Number },
  isAvailable: { type: Boolean, default: true },
  imageUrl: { type: String }
}, {
  timestamps: true,
  versionKey: false
});

export default mongoose.model('Service', serviceSchema);
