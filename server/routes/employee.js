const express = require("express");
const UserModel = require("../models/User"); // Import the User model

const router = express.Router();

// Add a new user
router.post("/add-user", async (req, res) => {
  const { name, addressLine1, addressLine2 } = req.body;

  try {
    // Find the maximum current slNo in the collection
    const lastUser = await UserModel.findOne().sort({ slNo: -1 }).exec();
    const nextSlNo = lastUser ? lastUser.slNo + 1 : 1; // Start with 1 if no users exist

    const newUser = new UserModel({
      name,
      addressLine1,
      addressLine2,
      slNo: nextSlNo,
    });

    const savedUser = await newUser.save();
    res.status(201).json({
      message: "User added successfully",
      data: savedUser,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred while adding user." });
  }
});


// Update an existing user
router.put("/update-user/:slNo", async (req, res) => {
  const { slNo } = req.params;//comes from express 
  const { name, addressLine1, addressLine2 } = req.body;

  try {
    const updatedUser = await UserModel.findOneAndUpdate(
      { slNo: slNo+1 },
      { name, addressLine1, addressLine2 },
      { new: true } // return the updated user -- db
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred while updating user." });
  }
});

// Update multiple users
router.put("/update-users", async (req, res) => {
  const users = req.body; // Expect an array of users with their updated details

  try {
    const updatePromises = users.map((user) =>
      UserModel.findOneAndUpdate(
        { slNo: user.slNo }, // Match by slNo
        { name: user.name, addressLine1: user.addressLine1, addressLine2: user.addressLine2 },
        { new: true }
      )
    );
    const updatedUsers = await Promise.all(updatePromises);

    res.status(200).json({
      message: "All users updated successfully",
      data: updatedUsers,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred while updating users." });
  }
});

// Fetch all users
router.get("/fetch-users", async (req, res) => {
  try {
    const users = await UserModel.find();  // Fetch all users from the User model
    res.status(200).json({
      message: "Users fetched successfully",
      data: users,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred while fetching users." });
  }
});

module.exports = router;
