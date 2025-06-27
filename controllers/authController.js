const User = require("../models/User");
const bcrypt = require("bcryptjs");

const registerUser = async (req, res) => {
  try {
    const { email, password, username } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password: hashedPassword,
      username,
    });

    res.status(201).send({ message: "User created", user });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

module.exports = { registerUser };
