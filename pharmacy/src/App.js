import React, { useState } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './components/Login';
import Dashboard from './components/Dashboard';
// ...
const App = () => {
  

  return (
    <div className="App">
      <BrowserRouter>
      <Routes>

        
        <Route path="/" element={<Login/>} />
        <Route path="/dashboard" element={<Dashboard/>} />

      </Routes>
      </BrowserRouter>
    </div>  
  );
};

export default App;
