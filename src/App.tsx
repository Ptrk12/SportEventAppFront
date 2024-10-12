import React from 'react';
import Navbar from './components/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Ranking from './pages/Ranking';
import Events from './pages/Events';
import About from './pages/About';
import CreateEvent from './pages/CreateEvent';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home/>}/> 
        <Route path='/events'  element={<Events/>}/> 
        <Route path='/ranking'  element={<Ranking/>}/> 
        <Route path='/about'  element={<About/>}/> 
        <Route path='/chat'  element={<Home/>}/> 
        <Route path='/create-sport-event' element={<CreateEvent/>}/>
      </Routes>
    </div>
  );
}

export default App;
