import React from 'react';
import Navbar from './components/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home/>}/> 
        <Route path='/notifications'  element={<Home/>}/> 
        <Route path='/chat'  element={<Home/>}/> 
        <Route path='/calendar'  element={<Home/>}/> 
      </Routes>
    </div>
  );
}

export default App;
