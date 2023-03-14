import React from 'react';
//import RegistrationForm from './Registration';
import LoginForm from './login';
import RegistrationForm from './Reg';



const LoginRegistrationForm = () => {
    return (
      <div>
        <h2>Login Form</h2>
        <LoginForm />
        <h2>Registration Form</h2>
        <Reg />
      </div>
    );
  };
  
  export default LoginRegistrationForm;