const express = require("express");
const LoginModel = require("../models/Login");

const router = express.Router();

// Login Route
router.post("/check-login", async (req, res) => {
  console.log("Inside check-login route");

  const { userId, password, userType } = req.body;

  try {
    const user = await LoginModel.findOne({ userId, password, userType });

    if (user) {
      res.status(200).json({ message: "Login successful", user });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (err) {
    res.status(500).json({ error: "An error occurred", details: err });
  }
});

module.exports = router;