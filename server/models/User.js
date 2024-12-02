const mongoose = require("mongoose");

// Define the User schema
const UserSchema = new mongoose.Schema({
  slNo: { type: Number, required: true },
  name: { type: String, required: true },
  addressLine1: { type: String, required: true },
  addressLine2: { type: String, required: true },
});

module.exports = mongoose.model("User", UserSchema);
