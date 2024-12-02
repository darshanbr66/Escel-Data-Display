const mongoose = require("mongoose");
const AdminsLogin = require("../models/Login"); 

mongoose.connect("mongodb://localhost:27017/employee", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
});

const admins = [
  { userId: "Yashaswini", password: "Yashaswini@123", userType:'admin' },
  { userId: "Darshanbr66", password: "Darshanbr66@123", userType:'admin' },
  { userId: "Example1", password: "Example1@123", userType:'admin' },
];


const saveAdmins = async () => {
  try {
    await AdminsLogin.insertMany(admins);
    console.log("All admins are inserted successfully");
  } catch (err) {
    console.error("Error inserting data:", err);
  } finally {
    mongoose.connection.close();
  }
};

saveAdmins();