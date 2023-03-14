import React, { useState } from 'react';
import './LandR.css'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import axios from 'axios'




const RegistrationForm = () => {
    const [UserName, setUsername] = useState('');
    const [Password, setPassword] = useState('');
    const [ID, setID] = useState('');
    const [Email, setEmail] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [Errormessage, setErrormessage] = useState('');
    const [idError, setIdError] = useState('');
    const [UserNameError, setUserNameError] = useState('');
    const [EmailError, setEmailError] = useState('');
    const [PasswordError, setPasswordmessage] = useState('');
    const [confirmPasswordError, setconfirmPasswordmessage] = useState('');




    function handleIDChange(event) {
        setID(event.target.value);
    }
    const handleUserNameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };
    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };


    const handleSubmit = (event) => {
        event.preventDefault();


        
        if (ID === '') {
            setIdError('ID is required');
        } else if (!/^\d+$/.test(ID)) {
            setIdError('ID must be a number');
        } else {
            setIdError('');
        }
        if (UserName === '') {
            setUserNameError('User is required');
        }
        

        else if (!/^[a-zA-Z]+$/.test(UserName)) {
            setUserNameError('Name must contain only letters');
        }
        else {
            setUserNameError('');
        }

        
        if (Email === '') {
            setEmailError('Email is required');
        } else if (!/\S+@\S+\.\S+/.test(Email)) {
            setEmailError('Email is invalid');
        } else {
            setEmailError('');
        }
        if (!Password) {
            setPasswordmessage('Please enter a password')
            return false;
        }
        else {
            setPasswordmessage('');
        }
        if (!confirmPassword) {
            setconfirmPasswordmessage('Please enter the confirm password')
            return false;
        }
        else {
            setconfirmPasswordmessage('')
        }
        if (Password !== confirmPassword) {
            setconfirmPasswordmessage('Password confirmation is invalid')
            return false;
        }

        if ((ID !== '') && (/^\d+$/.test(ID)) && (UserName !== '') && (/^[a-zA-Z]+$/.test(UserName)) && (Email !== '') && (/\S+@\S+\.\S+/.test(Email)) && (Password !== '') && (Password == confirmPassword)) {

            axios.post('https://localhost:44360/api/Login', {
                ID: ID,
                UserName: UserName,
                Password: Password,
                Email: Email
            })
                .then(response => {
                    console.log(response);
                })
                .catch(error => {
                    console.error(error)
                });

            toast.success('User Registered')

        }
        else{
            setErrormessage("invalid")
        }
    }

    return (
        <div className="login-page">
            <div className="login-form">
                <h2> Registration</h2>
                <form onSubmit={handleSubmit}>
                    <label className='label' style={{ display: 'block', marginBottom: '10px' }}>
                        ID:
                        <input type="text" value={ID} placeholder='ID' onChange={handleIDChange} />
                        <b />{idError && <p>{idError}</p>}
                    </label>
                    <label className='label'>
                        Username:
                        <input type="text" value={UserName} placeholder='UserName' onChange={handleUserNameChange} />
                        <b />{UserNameError && <p>{UserNameError}</p>}
                    </label>
                    <label className='label'>
                        Email:
                        <input type="Email" value={Email} placeholder='Email' onChange={handleEmailChange} />
                        <b />{EmailError && <p>{EmailError}</p>}
                    </label>

                    <label className='label'>
                        Password:
                        <input type="Password" value={Password} placeholder='Password' onChange={handlePasswordChange} />
                        <b />{PasswordError && <p>{PasswordError}</p>}
                    </label>
                    <label className='label'>
                        ConfirmPassword:
                        <input type="Password" value={confirmPassword} placeholder='ConfirmPassword' onChange={handleConfirmPasswordChange} />
                        <b />{confirmPasswordError && <p>{confirmPasswordError}</p>}
                    </label>

                    <br />


                    {Errormessage && <span>{Errormessage}</span>}
                    <br />
                    <button type="submit" onClick={handleSubmit} >Register</button>
                    <ToastContainer />
                    <br />

                    <Link to="/" >
                        Back to Login Page

                    </Link>
                </form>
            </div>
        </div>
    );
};
export default RegistrationForm;