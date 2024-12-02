import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './homeComponents/home.js';
import AdminLoginPage from './adminComponents/adminLoginPage.js';
import AdminDashboard from './adminComponents/adminDashBoard.js';
import EmployeeLoginPage from './employeeComponents/employeeLoginPage.js';
import EmployeeDashBoard from './workingSheet/employeeDashBoard.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/adminLoginPage" element={<AdminLoginPage />} />
        <Route path="/adminDashboard" element={<AdminDashboard />} />

        <Route path="/employeeLoginPage" element={<EmployeeLoginPage />} />
        <Route path="/EmployeeDashBoard" element={<EmployeeDashBoard />} /> 
      </Routes>
    </Router>
  );
}

export default App;