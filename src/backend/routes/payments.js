import express from 'express';
import paypal from 'paypal-rest-sdk';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config();

const router = express.Router();

// Configure PayPal with your sandbox credentials
paypal.configure({
  mode: 'live', // Use 'live' for production
  client_id: process.env.PAYPAL_CLIENT_ID,
  client_secret: process.env.PAYPAL_CLIENT_SECRET
});

const BACKEND_URL = process.env.VITE_BACKEND_URL || "https://finish-jh38.onrender.com";
const FRONTEND_URL = "https://finish-rho.vercel.app"; 

// -------------------------------------
// Create Payment
// -------------------------------------
router.post('/create', async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      console.error("Invalid or missing userId:", userId);
      return res.status(400).json({ error: "Invalid or missing user ID" });
    }

    const existingUser = await User.findById(userId);
    if (!existingUser) {
      console.error("User not found:", userId);
      return res.status(404).json({ error: "User not found" });
    }

    const create_payment_json = {
      intent: "sale",
      payer: { payment_method: "paypal" },
      redirect_urls: {
        return_url: `${BACKEND_URL}/api/payments/success`,
        cancel_url: `${FRONTEND_URL}/cancel`
      },
      transactions: [{
        item_list: { items: [{
          name: "Blog Membership",
          sku: "001",
          price: "2.00",
          currency: "USD",
          quantity: 1
        }] },
        amount: { currency: "USD", total: "2.00" },
        description: "Membership for blog access"
      }]
    };

    paypal.payment.create(create_payment_json, async (error, payment) => {
      if (error) {
        console.error("PayPal Create Payment Error:", error);
        return res.status(500).json({ error: "PayPal payment creation failed" });
      }

      const approvalUrl = payment.links.find(link => link.rel === 'approval_url')?.href;
      if (!approvalUrl) {
        console.error("Approval URL not found in PayPal response");
        return res.status(400).json({ error: "Approval URL not found" });
      }

      try {
        const updatedUser = await User.findByIdAndUpdate(userId, { paymentId: payment.id }, { new: true });
        if (!updatedUser) {
          console.error(`User not found or not updated: ${userId}`);
          return res.status(400).json({ error: "User not updated with payment ID" });
        }
      } catch (err) {
        console.error("Error saving payment ID to user:", err);
        return res.status(500).json({ error: "Failed to update user with payment ID" });
      }

      return res.json({ approvalUrl });
    });

  } catch (err) {
    console.error("Error in /create route:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// -------------------------------------
// Execute Payment (Success Route)
// -------------------------------------
router.get('/success', async (req, res) => {
  try {
    const { paymentId, PayerID } = req.query;
    if (!paymentId || !PayerID) {
      return res.status(400).json({ error: "Missing paymentId or PayerID" });
    }

    const execute_payment_json = {
      payer_id: PayerID,
      transactions: [{ amount: { currency: "USD", total: "2.00" } }]
    };

    paypal.payment.execute(paymentId, execute_payment_json, async (error, payment) => {
      if (error) {
        return res.status(500).json({ error: "Payment execution failed" });
      }

      const user = await User.findOne({ paymentId });
      if (!user) {
        return res.status(404).json({ error: "User not found for this payment" });
      }

      user.isPaid = true;
      await user.save();

      return res.redirect(`${FRONTEND_URL}/dashboard`);
    });

  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
