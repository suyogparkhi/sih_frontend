import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './components/Landing';
import Train from './components/Train';
import TestModel from './components/TestModel';
import Dashboard from './components/Dashboard';
const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-cyan-100 to-blue-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/train" element={<Train />} />
          <Route path="/test" element={<TestModel />} />
          <Route path="/Dashboard" element={<Dashboard/>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

