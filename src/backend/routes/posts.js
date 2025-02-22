const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const sanitizeHtml = require("sanitize-html");

// Post Schema (Consider moving this to a separate model file)
const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: String },
  categories: { type: [String], required: true },
  excerpt: { type: String, required: true },
  seoTitle: { type: String },
  seoDescription: { type: String },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
});
const Post = mongoose.model("Post", postSchema);

// Image Upload Setup using multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Navigate one directory up from routes into the uploads folder.
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// Create a new post
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { title, content, categories, excerpt, seoTitle, seoDescription, author } = req.body;
    
    console.log("Uploaded file:", req.file);
    // Store the image path as a relative URL (note the leading slash)
    const image = req.file ? "uploads/" + req.file.filename : "";
    console.log("Image path being saved:", image);
    
    if (!mongoose.Types.ObjectId.isValid(author)) {
      return res.status(400).json({ error: "Invalid author ID" });
    }

    // Sanitize content to allow only specific tags and attributes
    const sanitizedContent = sanitizeHtml(content, {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
      allowedAttributes: {
        ...sanitizeHtml.defaults.allowedAttributes,
        img: ["src", "alt", "width", "height"],
      },
    });

    const post = new Post({
      title,
      content: sanitizedContent,
      image,
      categories: categories.split(","),
      excerpt,
      seoTitle,
      seoDescription,
      author,
    });

    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all posts with populated author details
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().populate("author", "username email");
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single post by id with populated author details
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate("author", "username email");
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a post
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a post
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const { title, content, categories, excerpt, seoTitle, seoDescription } = req.body;
    const image = req.file ? req.file.path : currentImageUrl || ""; // Retain existing image
    
    const sanitizedContent = sanitizeHtml(content, {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
      allowedAttributes: {
        ...sanitizeHtml.defaults.allowedAttributes,
        img: ["src", "alt", "width", "height"],
      },
    });

    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      {
        title,
        content: sanitizedContent,
        image,
        categories: categories.split(","),
        excerpt,
        seoTitle,
        seoDescription,
      },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
