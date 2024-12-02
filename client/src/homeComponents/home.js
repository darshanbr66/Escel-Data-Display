import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css';
import 'font-awesome/css/font-awesome.min.css';

function HomePage() {
const navigate = useNavigate();
const[label, setlabel] = useState('');
  
function loginSubmit(){
  if (label === 'Admin')
  {
    navigate('adminLoginPage');
  }
  else{
    if (label === 'Employee')
      {
        navigate('employeeLoginPage');
      }
  }

}

  return (
    <div className="App">
      <header>
      <h2>Si<strong>g</strong>vitas</h2>
      </header>
      <main>
        <div id='div1'>
          <h1>Welcome to Sigvitas</h1>

        </div>
          <div id='div'>
            
                <label >
                  <input type='radio' name='value' value='Admin' 
                  onChange={(e) => setlabel(e.target.value)} />Admin
                  </label>       
                  <label >
                  <input type='radio' name='value' value='Employee' 
                  onChange={(e) => setlabel(e.target.value)} />Employee
                  </label>
          
         <br />
            
            <button id='logBtn' type="submit" onClick={loginSubmit}>Login</button>
          </div>
        
      </main>
      <footer>
        <p>&copy; 2024 Sigvitas. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default HomePage;