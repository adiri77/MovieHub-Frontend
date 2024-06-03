import React, { useState } from 'react';
import './style.scss';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const [login, setLogin] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleToggle = () => {
        setLogin(!login);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const user = { name, email, password };

        try {
            const response = await axios.post('http://localhost:3000/auth/register', user, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 201) {
                console.log('Registration successful', response.data);
                // Redirect to login page
                navigate('/login');
            } else {
                console.error('Registration failed', response.data);
            }
        } catch (error) {
            console.error('An error occurred', error.response ? error.response.data : error.message);
        }

        // Reset form fields
        setName('');
        setEmail('');
        setPassword('');
    };

    return (
        <div className="App">
            <div className="container">
                <div className="form-container">
                    <h1>Register</h1>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button type="submit">
                            Register
                        </button>
                    </form>
                    <div className="toggle-container">
                        <p>
                            Already have an account?
                            <Link className="toggle-link" onClick={handleToggle} to={"/login"}>
                                Login here
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
