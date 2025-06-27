require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { errors } = require("celebrate");

const { requestLogger, errorLogger } = require("./middlewares/logger");
const errorHandler = require("./middlewares/errorHandler");

const authRoutes = require("./routes/auth");
const articleRoutes = require("./routes/articles");
const newsRoutes = require("./routes/news");

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// ✅ Request logger
app.use(requestLogger);

// Routes
app.use("/", authRoutes);
app.use("/articles", articleRoutes);
app.use("/news", newsRoutes);

// ✅ Error logger
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

// Root route
app.get("/", (req, res) => {
  res.send("API is running");
});

// Connect to MongoDB and start server
mongoose
  .connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/newsdb")
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });
