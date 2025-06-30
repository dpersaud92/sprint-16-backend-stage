const Article = require("../models/articles");

exports.getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find();
    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.createArticle = async (req, res) => {
  try {
    const article = await Article.create({
      ...req.body,
      owner: req.user._id, //
    });
    res.status(201).json(article);
  } catch (error) {
    console.error("❌ Article creation error:", error);
    res.status(400).json({ message: error.message, errors: error.errors });
  }
};
