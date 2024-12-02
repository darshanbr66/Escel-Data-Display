import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import 'font-awesome/css/font-awesome.min.css';
import axios from 'axios';

function LoginPage() {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const userType = 'admin';
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state for UI feedback

  const navigate = useNavigate();

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!userId || !password) {
      alert('Please enter both User ID and Password');
      return;
    }

    setLoading(true); 

    try {
      
      const response = await axios.post('http://localhost:3002/api/check-login', { userId, password, userType });

      if (response.status === 200) {
        alert(`Welcome, ${userId}`);
        navigate('/adminDashboard'); 
      } else {
        alert('Invalid User Id and Password! Please try again.');
      }
    } catch (err) {
      console.error('Login error:', err);
      alert('An error occurred while logging in. Please try again later.');
    } finally {
      setLoading(false); 
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
              placeholder="Enter user_id"
              minLength={8}
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
            <br />
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter password"
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                id="btn2"
                onClick={togglePasswordVisibility}
                className={`fa ${showPassword ? 'fa-eye' : 'fa-eye-slash'}`} // Toggle icon based on showPassword state
                style={{
                  position: 'absolute',
                 left: '80%',
                 width:'10px',
                  top: '55%',
                  right: '0',
                  transform: 'translateY(-80%)',
                  border: 'none',
                  background: 'transparent',
                  cursor: 'pointer',
                  color: 'black',
                }}
              />
            </div>
            <br />
            <button id="logBtn" type="submit" disabled={loading}>
              {loading ? 'Logging in...' : 'Log in'}
            </button>
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