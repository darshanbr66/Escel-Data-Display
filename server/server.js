const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require("body-parser");
const loginRoutes = require('./routes/login'); // Import login routes
const employeeRoutes = require('./routes/employee');
const insertDataFromExcel = require("./insertData/inserExelData.js");



const app = express();

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose
  .connect('mongodb://localhost:27017/employee', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB:', err));
  console.log('inside server');
// Routes
app.use('/api', loginRoutes); // Prefix for login routes
app.use('/api', employeeRoutes);

app.get("/insert-excel-data", async (req, res) => {
  try {
    await insertDataFromExcel();
    res.status(200).send("Data inserted from Excel successfully!");
  } catch (error) {
    res.status(500).send("Error inserting data: " + error.message);
  }
});

// Start the server
app.listen(3002, () => {
  console.log('Server running successfully on port 3002');
});