const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  userId: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userType: { type: String, required: true },
});

// Create and export the model
const EmployeeModel = mongoose.model("employees", employeeSchema); 

module.exports = EmployeeModel;