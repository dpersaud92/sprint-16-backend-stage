const User = require("../models/User");

const getCurrentUser = (req, res) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json({ email: user.email, username: user.username });
    })
    .catch((err) => {
      console.error("Error fetching user:", err);
      res.status(500).json({ message: "Internal server error" });
    });
};

module.exports = { getCurrentUser };
