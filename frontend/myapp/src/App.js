import React, { useState } from 'react';
import './App.css';
import App1 from './code';
import Login from './login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function App() {
  return (
     <Router>
     <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/code" element={<App1/>} />
      </Routes>
    </Router>
  );
}

export default App;
