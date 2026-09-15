import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Landing from './components/Landing';
import ClaimBot from './components/ClaimBot';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/app" element={<ClaimBot />} />
        <Route path="/app/:step" element={<ClaimBot />} />
      </Routes>
    </div>
  );
}

export default App;
