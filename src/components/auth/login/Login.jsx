import React, { useState } from 'react';
import './style.scss';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [login, setLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleToggle = () => {
        setLogin(!login);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = { email, password };

        try {
            const response = await axios.post('http://localhost:3000/auth/login', user, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                console.log('Login successful', response.data);
                // You can save the token or any other response data here if needed
                // For example, localStorage.setItem('token', response.data.token);
                navigate('/');
            } else {
                console.error('Login failed', response.data);
            }
        } catch (error) {
            console.error('An error occurred', error.response ? error.response.data : error.message);
        }

        // Reset form fields
        setEmail('');
        setPassword('');
    };

    return (
        <div className="App">
            <div className="container">
                <div className="form-container">
                    <h1>Login</h1>
                    <form onSubmit={handleSubmit}>
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
                            Login
                        </button>
                    </form>
                    <div className="toggle-container">
                        <p>
                            Don't have an account?
                            <Link className="toggle-link" onClick={handleToggle} to={"/register"}>
                                Register here
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
