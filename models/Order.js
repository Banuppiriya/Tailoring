import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  tailorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tailor', required: true },
  clothingType: { type: String, required: true },
  measurements: { type: Object, required: true },
  deliveryDate: { type: Date, required: true },
  status: {
    type: String,
    enum: ['pending', 'in progress', 'completed', 'cancelled'],
    default: 'pending'
  }
}, {
  timestamps: true,
  versionKey: false,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtuals to access user details from populated user ref
orderSchema.virtual('userDetails', {
  ref: 'User',
  localField: 'user',
  foreignField: '_id',
  justOne: true,
  select: 'email contactNumber deliveryAddress'
});

export default mongoose.model('Order', orderSchema);
