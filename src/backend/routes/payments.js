const express = require('express');
const router = express.Router();
const paypal = require('paypal-rest-sdk');
const mongoose = require('mongoose');
const User = require('../models/User').default;

// Configure PayPal with your sandbox credentials
paypal.configure({
  mode: 'sandbox', // Use 'live' for production
  client_id: process.env.PAYPAL_CLIENT_ID,
  client_secret: process.env.PAYPAL_CLIENT_SECRET
});

// -------------------------------------
// Create Payment
// -------------------------------------
router.post('/create', async (req, res) => {
  try {
    const { userId } = req.body;

    // Validate userId
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      console.error("Invalid or missing userId:", userId);
      return res.status(400).json({ error: "Invalid or missing user ID" });
    }

    // Check if user exists
    const existingUser = await User.findById(userId);
    console.log("Existing user from DB:", existingUser);

    if (!existingUser) {
      console.error("User not found:", userId);
      return res.status(404).json({ error: "User not found" });
    }

    // Build the PayPal payment object
    const create_payment_json = {
      intent: "sale",
      payer: {
        payment_method: "paypal"
      },
      redirect_urls: {
        return_url: "http://localhost:5000/api/payments/success",
        cancel_url: "http://localhost:3000/cancel"
      },
      transactions: [{
        item_list: {
          items: [{
            name: "Blog Membership",
            sku: "001",
            price: "2.00",
            currency: "USD",
            quantity: 1
          }]
        },
        amount: {
          currency: "USD",
          total: "2.00"
        },
        description: "Membership for blog access"
      }]
    };

    // Create the PayPal payment
    paypal.payment.create(create_payment_json, async (error, payment) => {
      if (error) {
        console.error("PayPal Create Payment Error:", error);
        return res.status(500).json({ error: "PayPal payment creation failed" });
      }

      console.log("PayPal payment created:", payment);

      // Extract approval URL
      const approvalUrl = payment.links.find(link => link.rel === 'approval_url')?.href;
      if (!approvalUrl) {
        console.error("Approval URL not found in PayPal response");
        return res.status(400).json({ error: "Approval URL not found" });
      }

      // Save the PayPal paymentId in the user document
      try {
        const updatedUser = await User.findByIdAndUpdate(
          userId,
          { paymentId: payment.id },
          { new: true }
        );
        console.log("Updated user after saving paymentId:", updatedUser);

        if (!updatedUser) {
          console.error(`User not found or not updated: ${userId}`);
          return res.status(400).json({ error: "User not updated with payment ID" });
        }

        console.log(`Payment ID ${payment.id} saved for user ${updatedUser._id}`);
      } catch (err) {
        console.error("Error saving payment ID to user:", err);
        return res.status(500).json({ error: "Failed to update user with payment ID" });
      }

      // Return the approval URL to the frontend
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
    console.log("Success route query:", req.query);

    if (!paymentId || !PayerID) {
      console.error("Missing paymentId or PayerID:", req.query);
      return res.status(400).json({ error: "Missing paymentId or PayerID" });
    }

    // Build execute payment object
    const execute_payment_json = {
      payer_id: PayerID,
      transactions: [{
        amount: {
          currency: "USD",
          total: "2.00"
        }
      }]
    };

    // Execute the PayPal payment
    paypal.payment.execute(paymentId, execute_payment_json, async (error, payment) => {
      if (error) {
        console.error("PayPal Execute Payment Error:", error.response || error);
        return res.status(500).json({ error: "Payment execution failed" });
      }

      console.log("PayPal payment executed:", payment);

      // Retrieve the user using the stored paymentId
      const user = await User.findOne({ paymentId });
      console.log("User found by paymentId:", user);

      if (!user) {
        console.error("User not found for paymentId:", paymentId);
        return res.status(404).json({ error: "User not found for this payment" });
      }

      // Mark the user as paid
      user.isPaid = true;
      await user.save();
      console.log(`User ${user._id} marked as paid`);

      // Redirect to success page (change URL as needed)
      return res.redirect('http://localhost:8080/dashboard');
    });

  } catch (err) {
    console.error("Error in /success route:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
