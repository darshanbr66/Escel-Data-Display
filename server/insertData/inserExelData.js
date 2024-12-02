const xlsx = require("xlsx");
const User = require("../models/User"); // Import the User model
const mongoose = require("mongoose");


// Read Excel file and insert into MongoDB
const insertDataFromExcel = async () => {
  try {

    mongoose.connect("mongodb://localhost:27017/employee", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000,
      });
    // Read the Excel file
    const workbook = xlsx.readFile(
      "../new1.xlsx"
    );
    const sheetName = workbook.SheetNames[0];
    const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    // Map data to match the schema
    const users = sheetData.map((row) => ({
      slNo: row["Sl No"],
      name: row["Name"],
      addressLine1: row["Address Line 1"],
      addressLine2: row["Address Line 2"],
    }));

    // Insert data into MongoDB
    await User.insertMany(users);
    console.log("Data inserted successfully!");
  } catch (error) {
    console.error("Error inserting data:", error);
  }
};

insertDataFromExcel();
