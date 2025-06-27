const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { validateSignup, validateSignin } = require("../middlewares/validators");

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";

// POST /signup - Register a new user
router.post("/signup", validateSignup, async (req, res) => {
  const { email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashedPassword });
    res.status(201).json({ email: user.email });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(400).json({
      message: "Registration failed",
      error: error.message,
    });
  }
});

// POST /signin - Authenticate user and return token
router.post("/signin", validateSignin, async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: "7d" });
    res.json({ token });
  } catch (error) {
    console.error("Signin Error:", error);
    res.status(500).json({
      message: "Login failed",
      error: error.message,
    });
  }
});

module.exports = router;

const { celebrate, Joi } = require("celebrate");

router.post(
  "/signup",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
      name: Joi.string().required().min(2).max(30), // ✅ Add this line
    }),
  }),
  createUser
);
