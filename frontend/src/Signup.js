import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import validation from './SignupValidation';
import axios from 'axios';


function Signup() {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: ''
    });


    const [successMessage, setSuccessMessage] = useState(''); // State for success message
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



        if (!validationErrors.name && !validationErrors.email && !validationErrors.password) {
            try {
                await axios.post('http://localhost:3000/signup', values);
                setSuccessMessage("Signup successful! You can now log in."); // Set success message
                setApiError(''); // Clear any previous API error
                setTimeout(() => {
                    navigate('/login'); // Redirect to login page after a brief delay
                }, 2000); // Delay before redirect
            } catch (err) {
                console.error("Signup error:", err.response ? err.response.data : err.message);
                setApiError("Signup failed. Please try again.");
                setSuccessMessage(''); // Clear success message on error
            }
        }
    };

    

    return (
        <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
            <div className='bg-white p-3 rounded w-25'>
                <h2>Sign-Up</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor='name'> <strong>Name</strong> </label>
                        <input type='text' placeholder='Enter Name' name='name'
                            onChange={handleInput} className='form-control rounded-0' />
                        {errors.name && <span className='text-danger'>{errors.name}</span>}
                    </div>

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
                    {successMessage && <span className='text-success'>{successMessage}</span>} {/* Display success message */}

                    <button type='submit' className='btn btn-success w-100 rounded-0'>Signup</button>
                    <p>You agree to our terms and policies</p>
                    <Link to="/login" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Login</Link>
                </form>
            </div>
        </div>
    );
}

export default Signup;
