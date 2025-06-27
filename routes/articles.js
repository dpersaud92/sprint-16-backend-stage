const express = require("express");
const Article = require("../models/articles");
const auth = require("../middlewares/authMiddleware");
const { validateArticle } = require("../middlewares/validators");

const router = express.Router();

router.get("/", auth, async (req, res) => {
  try {
    const userId = req.user._id;
    const articles = await Article.find({ owner: userId });
    res.json(articles);
  } catch (error) {
    console.error("Error fetching articles:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/", auth, validateArticle, async (req, res) => {
  try {
    const article = await Article.create({ ...req.body, owner: req.user._id });
    res.status(201).json(article);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error creating article", error: error.message });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    if (!article.owner.equals(req.user._id)) {
      return res
        .status(403)
        .json({ message: "Forbidden: You do not own this article" });
    }

    await article.deleteOne();
    res.status(200).json({ message: "Article deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
