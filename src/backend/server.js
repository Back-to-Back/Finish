require('dotenv').config({ 
  path: 'C:/Users/user/Desktop/styled-narrative-hub/.env'
});
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 10000;
const HOST = "0.0.0.0";

// CORS Configuration
const corsOptions = {
  origin: "https://finish-rho.vercel.app", // Frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

// Manually set CORS headers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "https://finish-rho.vercel.app");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

// Middleware
app.use(express.json());

// Serve static files from the uploads folder
app.use("/uploads", express.static(path.resolve(__dirname, "uploads")));

// Routes
app.use('/api/auth', require('./routes/auth').default);
app.use('/api/payments', require('./routes/payments'));
app.use('/api/posts', require('./routes/posts'));
app.use('/api/postings', require('./routes/postingroute'));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Start Server
const server = app.listen(PORT, HOST, () => console.log(`Server running on port ${PORT}`));
