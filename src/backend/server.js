import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';

import authRoutes from './routes/auth.js';
import paymentRoutes from './routes/payments.js';
import postRoutes from './routes/posts.js';
import postingRoutes from './routes/postingroute.js';

dotenv.config({ path: 'C:/Users/user/Desktop/styled-narrative-hub/.env' });

const app = express();
const PORT = process.env.PORT || 10000;
const HOST = "0.0.0.0";

// CORS Configuration
const corsOptions = {
  //origin: "https://finish-rho.vercel.app", // Frontend URL
  origin: ["https://www.bloghobbyhub.online", "https://finish-rho.vercel.app"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

// Manually set CORS headers
/*app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "https://finish-rho.vercel.app");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});
*/
app.use((req, res, next) => {
  const allowedOrigins = ["https://www.bloghobbyhub.online", "https://finish-rho.vercel.app"];
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

app.use(express.json());
app.use("/uploads", express.static(path.resolve("uploads")));

// ✅ Corrected Route Imports
app.use('/api/auth', authRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/postings', postingRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Start Server
app.listen(PORT, HOST, () => console.log(`Server running on port ${PORT}`));
