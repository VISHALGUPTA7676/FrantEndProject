import React, { useState } from 'react';
import './LoginForm.css'; // Import the CSS file

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState(''); // Define username and setUsername
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false); // Define loggedIn and setLoggedIn

  const handleSubmit = (e) => {
    e.preventDefault();
    // Pass the username and password to the handleLogin function
    handleLogin({ username, password });

    // Assuming handleLogin returns true for successful login
    setLoggedIn(true);
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <div>
        <h2>Login Page</h2>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">Login</button>
      {loggedIn && <p>Successfully logged in!</p>} {/* Display message if logged in */}
    </form>
  );
};

export default LoginForm;
