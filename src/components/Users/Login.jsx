import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import login from '../../data/features/ThuncFunctions/UsersThunk/Login.js';
import './Login.css'; // Import styles
import { useSelector } from 'react-redux';
const Login = () => {
  
  const [formData, setFormData] = useState({ username: '', password: '' });
  const navigate = useNavigate();
  
  const dispatch = useDispatch();
  const {isAuthenticated, error} = useSelector((state) => state.users);
 
  // Auto login
  useEffect(() => {
    const autoLogin = async () => {
      try {
        const token = localStorage.getItem('token') || null;
        const user = JSON.parse(localStorage.getItem('user') || null);
        if (token && user) {
          navigate('/Products');
        }
      } catch (error) {
        console.error('Failed to auto-login:', error);
      }
    };
    autoLogin();
  }, []);

  // is authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/Products');
    }
  }, [isAuthenticated]);
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(login(formData));
    
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="login-heading">Login</h2>

        <input
          className="login-input"
          type="text"
          name="username"
          placeholder="username"
          value={formData.username}
          onChange={handleChange}
        />

        <input
          className="login-input"
          type="password"
          name="password"
          placeholder="password"
          value={formData.password}
          onChange={handleChange}
        />

        {error && <p className="login-error">{error}</p>}

        <button className="login-button" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
