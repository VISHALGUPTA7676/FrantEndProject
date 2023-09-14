import React from 'react';
import LoginForm from './LoginForm';

const LoginPage = ({ handleLogin }) => {
  return (
    <div>
    
      <LoginForm handleLogin={handleLogin} />
    </div>
  );
};

export default LoginPage;
