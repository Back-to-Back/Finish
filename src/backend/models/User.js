import { Schema, model } from 'mongoose';
import { hash } from 'bcryptjs';

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['guest', 'user', 'member', 'admin'], default: 'guest' },
  isPaid: { type: Boolean, default: false },
  paymentId: { type: String } // <-- Added field for PayPal payment ID
});

// Hash the password before saving
UserSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await hash(this.password, 8);
  }
  next();
});

export default model('User', UserSchema);
