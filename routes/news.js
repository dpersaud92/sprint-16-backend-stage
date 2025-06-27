const express = require("express");
const fetch = require("node-fetch");
const router = express.Router();

const GNEWS_API_KEY = process.env.GNEWS_API_KEY;

router.get("/search", async (req, res) => {
  const { q } = req.query;

  if (!GNEWS_API_KEY) {
    console.error("❌ GNEWS_API_KEY is missing from .env");
    return res.status(500).json({ message: "Missing API key" });
  }

  const cleanQuery = q.trim().replace(/\.$/, "");
  const apiUrl = `https://gnews.io/api/v4/search?q=${encodeURIComponent(
    cleanQuery
  )}&lang=en&max=10&apikey=${GNEWS_API_KEY}`;

  console.log("🔍 Fetching GNews API:", apiUrl);

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (!response.ok) {
      console.error("❌ GNews API Error Response:", data);
      return res
        .status(response.status)
        .json({ message: data.message || "Failed to fetch from GNews" });
    }

    res.json(data);
  } catch (error) {
    console.error("❌ GNews Fetch Error:", error.message);
    res.status(500).json({ message: "Error fetching articles" });
  }
});

module.exports = router;
