import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import 'font-awesome/css/font-awesome.min.css';
import axios from 'axios';

function LoginPage() {
  const [name, setname] = useState('');
  const [userId, setUserId] = useState('');
  const userType = 'employee';
 
  const [loading, setLoading] = useState(false); // Loading state for UI feedback
  const [showname, setShowname] = useState(false);


  const navigate = useNavigate();

  

  
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!userId || !name) {
      alert('Please enter both User ID and name');
      return;
    }

    setLoading(true); // Show loading state

    try {
      // Make the login request to the backend
      const response = await axios.post('http://localhost:3002/api/save-employee-details', { name, userId, userType });

      if (response.status === 201) {
        alert(`${userId} added`);
        // navigate('/admin');
      } else {
        alert('Invalid User Id and name! Please try again.');
      }
    } catch (err) {
      console.error('Login error:', err);
      alert('An error occurred while logging in. Please try again later.');
    } finally {
      setLoading(false); // Hide loading state
    }

    
  };

  function gohome(){
    navigate('/');
  }
  return (
    <div className="App">
      <header>
        <h2 onClick={gohome}>Si<strong>g</strong>vitas</h2>
      </header>
      <main>
        <form onSubmit={handleLogin}>
          <div id="div1">
            <input
              type="text"
              placeholder="Employee Name"
              minLength={8}
              value={name}
                onChange={(e) => setname(e.target.value)}
             
            />
            <br />
            <div style={{ position: 'relative' }}>
              <input
                type='text'
                placeholder="Enter User Id"
                minLength={8}
                value={userId}
              onChange={(e) => setUserId(e.target.value)}
              />
             
            </div>
            <br />
            <button id="logBtn" type="submit" disabled={loading}>
              {loading ? 'Saving...' : 'Save'}
            </button>
          </div>

          <div onChange={(e) => setShowname(e.target.value)}>
            <h3>Employee Details</h3>
 
     
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>User_Id</th>
          </tr>
        </thead>
        <tbody>
   
        <tr>
          <td>{name}</td>
          <td>{userId}</td>
         
        </tr>
     
        </tbody>
      </table>
   
 

          </div>
        </form>
      </main>
      <footer>
        <p>&copy; 2024 Sigvitas. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default LoginPage;