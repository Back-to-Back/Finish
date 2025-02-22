const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: String },
  subcategories: { type: [String], required: true },
  excerpt: { type: String, required: true },
  seoTitle: { type: String },
  seoDescription: { type: String },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
});

// Define a new model called "Posting" using the same schema
const Posting = mongoose.model("Posting", postSchema);
module.exports = Posting;
