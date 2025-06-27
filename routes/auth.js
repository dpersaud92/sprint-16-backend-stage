const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { validateSignup, validateSignin } = require("../middlewares/validators");
const authMiddleware = require("../middlewares/authMiddleware");
const { getCurrentUser } = require("../controllers/userController");

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";

// POST /signup - Register a new user
router.post("/signup", validateSignup, async (req, res, next) => {
  console.log("SIGNUP BODY:", req.body);
  const { email, password, username } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      password: hashedPassword,
      username,
    });

    res.status(201).json({ email: user.email, username: user.username });
  } catch (error) {
    console.error("Signup Error:", error);
    error.statusCode = 400;
    next(error);
  }
});

// POST /signin - Authenticate user and return token
router.post("/signin", validateSignin, async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      const err = new Error("Invalid email or password");
      err.statusCode = 401;
      return next(err);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      const err = new Error("Invalid email or password");
      err.statusCode = 401;
      return next(err);
    }

    const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: "7d" });
    res.json({ token });
  } catch (error) {
    console.error("Signin Error:", error);
    error.statusCode = 500;
    next(error);
  }
});

router.get("/users/me", authMiddleware, getCurrentUser);

module.exports = router;
