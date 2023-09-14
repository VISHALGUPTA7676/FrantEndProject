import React, { useState } from 'react';
import LoginPage from './components/LoginPage';

// ...
const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  

  const handleLogin = ({ username, password }) => {
    console.log(`Logging in with username: ${username} and password: ${password}`);
    setLoggedIn(true);
    setPassword(password); // Assuming you want to set the password on successful login
    setUsername(username); // Assuming you want to set the username on successful login
  };

  return (
    <div className="App">
      {loggedIn ? (

       
        <div>
          <div className="container">
      <h2>Data table</h2>
      <table className="styled-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>E-mail</th>
            <th>Password</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>{username}</td>
            <td>{password}</td>
          </tr>
        </tbody>
      </table>
    </div>
        </div>
      ) : (
        <LoginPage handleLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;
