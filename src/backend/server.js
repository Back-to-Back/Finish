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

// Middleware
app.use(cors({
  origin: "http://finish-rho.vercel.app", // Replace with your actual frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.json());

// Serve static files from the uploads folder using an absolute path
app.use("/uploads", express.static(path.resolve(__dirname, "uploads")));


// Routes
app.use('/api/auth', require('./routes/auth'));
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

const server =app.listen(PORT, HOST,() => console.log(`Server running on port ${PORT}`));
