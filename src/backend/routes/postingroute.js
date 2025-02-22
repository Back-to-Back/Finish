const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const sanitizeHtml = require("sanitize-html");
const Posting = require('../models/Posting') // Import the Posting model

// Image Upload Setup
/*
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });
*/
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Navigate one directory up from routes, into uploads folder.
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
    const { title, content, subcategories, excerpt, seoTitle, seoDescription, author } = req.body;

    console.log("Uploaded file:", req.file);
    const image = req.file ? "uploads/" + req.file.filename : "";
    console.log("Image path being saved:", image);

    if (!mongoose.Types.ObjectId.isValid(author)) {
      return res.status(400).json({ error: "Invalid author ID" });
    }

    const sanitizedContent = sanitizeHtml(content, {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
      allowedAttributes: {
        ...sanitizeHtml.defaults.allowedAttributes,
        img: ["src", "alt", "width", "height"],
      },
    });

    const post = new Posting({
      title,
      content: sanitizedContent,
      image,
      subcategories: subcategories.split(","),
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
    const posts = await Posting.find().populate("author", "username email");
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single post by id with populated author details
router.get("/:id", async (req, res) => {
  try {
    const post = await Posting.findById(req.params.id).populate("author", "username email");
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a post by id
router.delete("/:id", async (req, res) => {
  try {
    const post = await Posting.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a post by id
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const { title, content, subcategories, excerpt, seoTitle, seoDescription } = req.body;
    const image = req.file ? req.file.path : currentImageUrl || ""; // Retain existing image

    const sanitizedContent = sanitizeHtml(content, {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
      allowedAttributes: {
        ...sanitizeHtml.defaults.allowedAttributes,
        img: ["src", "alt", "width", "height"],
      },
    });

    const updatedPost = await Posting.findByIdAndUpdate(
      req.params.id,
      {
        title,
        content: sanitizedContent,
        image,
        subcategories: subcategories.split(","),
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

router.get("/subcategory/:name", async (req, res) => {
  try {
    const subcategoryName = req.params.name;
    
    // Find posts where the 'subcategories' array contains the specified subcategory
    const posts = await Posting.find({
      subcategories: subcategoryName,
    }).populate("author", "username email");

    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
