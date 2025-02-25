import { Router } from 'express';
const router = Router();
import User, { findOne } from '../models/User';
import { sign } from 'jsonwebtoken';
import { compare } from 'bcryptjs';


const API_URL = import.meta.env.VITE_BACKEND_URL;
// Register
router.post(`${API_URL}/auth/register`, async (req, res) => {
  const { username, email, password, role } = req.body;
  try {
    const user = new User({ username, email, password, role });
    await user.save();

    // Return the userId in the response
    res.status(201).json({ 
      message: 'User registered',
      userId: user._id 
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Login
router.post(`${API_URL}/auth/login`, async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await findOne({ email });
    if (!user) {
      return res.status(400).send('Invalid credentials - user not found');
    }

    const match = await compare(password, user.password);
    if (!match) {
      return res.status(400).send('Invalid credentials - bad password');
    }

    const token = sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);

    // Return role and isPaid status as well
    res.json({
      token,
      userId: user._id,
      role: user.role,
      isPaid: user.isPaid  // <-- Add this flag to indicate if the user has paid
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

export default router;
