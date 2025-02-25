import express from 'express';
import User from '../models/User.js'; 
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
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
router.post('login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send('Invalid credentials - user not found');
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).send('Invalid credentials - bad password');
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);

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