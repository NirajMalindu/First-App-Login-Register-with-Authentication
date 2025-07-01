import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import validation from './LoginValidation';
import axios from 'axios';

function Login() {
    const [values, setValues] = useState({
        email: '',
        password: ''
    });


    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [apiError, setApiError] = useState('');

    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        const validationErrors = validation(values);
        setErrors(validationErrors);

        if (!validationErrors.email && !validationErrors.password) {
            try {
                const res = await axios.post('http://localhost:3000/login', values);
                if (res.data === "Success") {
                    navigate('/home'); // Redirect to home page
                } else {
                    setApiError("Invalid credentials, please try again.");
                }
            } catch (err) {
                console.error("Login error:", err.response ? err.response.data : err.message);
                setApiError("Login failed. Please try again.");
            }
        }
    };


    return (
        <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
            <div className='bg-white p-3 rounded w-25'>
                <h2>Sign-In</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor='email'> <strong>Email</strong> </label>
                        <input type='email' placeholder='Enter Email' name='email'
                            onChange={handleInput} className='form-control rounded-0' />
                        {errors.email && <span className='text-danger'>{errors.email}</span>}
                    </div>


                    <div className='mb-3'>
                        <label htmlFor='password'> <strong>Password</strong> </label>
                        <input type='password' placeholder='Enter Password' name='password'
                            onChange={handleInput} className='form-control rounded-0' />
                        {errors.password && <span className='text-danger'>{errors.password}</span>}
                    </div>


                    {apiError && <span className='text-danger'>{apiError}</span>}

                    <button type='submit' className='btn btn-success w-100 rounded-0'>Login</button>
                    <p>You agree to our terms and policies</p>
                    <Link to="/signup" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Create Account</Link>
                </form>
            </div>
        </div>
    );
}

export default Login;
