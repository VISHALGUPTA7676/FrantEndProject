import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css'; // Import the CSS file
import axios from 'axios'

const Login = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    username: "",
    password: ""
  })
  const handleInputChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post("http://localhost:8080/api/auth/signin", data);
    if (res.status === 200) {
      localStorage.setItem("user", JSON.stringify(res.data));
      navigate("/addProduct");

    }
  }
  useEffect(() => {
    
  }, [])

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <div>
       
        <h2>Login Page</h2>
        <label>Username:</label>
        <input
          type="text"
          name='username'
          onChange={(e) => handleInputChange(e)}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          name='password'
          onChange={(e) => handleInputChange(e)}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
