import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AnimationInit from './components/AnimationInit';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<Home />} />
        <Route path="/services" element={<Home />} />
        <Route path="/projects" element={<Home />} />
        <Route path="/contact-us" element={<Home />} />
      </Routes>
      <AnimationInit />
    </>
  );
}

export default App;
