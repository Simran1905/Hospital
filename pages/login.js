import React, { useState } from 'react';
import './LandR.css';
import RegistrationForm from './Reg';
import { Navigate, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';


const LoginForm = () => {

  const [id, setID] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();


  function handleIDChange(event) {
    setID(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    // Validate the form fields
    if (!id) {
      setError('id is required');
      return;
    }

    if (!password) {
      setError('Password is required');
      return;
    }
    axios.get('https://localhost:44360/api/Login', {
      params: {
        ID: id,
        Password: password
      }
    })
      .then(response => {
        console.log(response.data)
        console.log(password);
        if (response.data.ID == id && response.data.Password == password) {
          navigate('/dashboard');
          // Replace '/dashboard' with the path to your dashboard or main page
        } else {
          setError('Incorrect username or password');
        }
      })
      .catch(error => {
        console.log(error);
        // If user data is not found or the password does not match, display an error message to the user
        setError('Incorrect username or password');
      });
  }


  return (
    <div className="login-page">
      
        <div className="login-form">
          <h2> Login</h2>


          <form onSubmit={handleSubmit} >

            <label>
              ID:
              <input type="text" value={id} placeholder='ID' onChange={handleIDChange} />
            </label>
            <br />
            <label>
              Password:
              <input type="password" value={password} placeholder="Password" onChange={handlePasswordChange} />
            </label>
            <br />
            <b />{error && <p>{error}</p>}
            <button type="submit" onClick={handleSubmit}>Login</button>
            
          </form>
        </div>
      </div>
    

  );
};
export default LoginForm;