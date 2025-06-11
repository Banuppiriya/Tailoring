import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  clothingType: { type: String, required: true },
  measurements: { type: Object, required: true },
  deliveryDate: { type: Date, required: true },
  status: { type: String, enum: ['pending', 'in progress', 'completed', 'cancelled'], default: 'pending' }
}, {
  timestamps: true,
  versionKey: false,
  toJSON: { virtuals: true }
});

export default mongoose.model('Order', orderSchema);
