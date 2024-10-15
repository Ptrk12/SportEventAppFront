import React from 'react';
import Navbar from './components/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Ranking from './pages/Ranking';
import Events from './pages/Events';
import About from './pages/About';
import Register from './pages/Register';
import Login from './pages/Login';
import { UserProvider } from './contexts/UserContext';
import CreateEvent from './pages/CreateEvent';

function App() {
  return (
    <UserProvider>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/events' element={<Events />} />
        <Route path='/ranking' element={<Ranking />} />
        <Route path='/about' element={<About />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/create-sport-event' element={<CreateEvent/>}/>
      </Routes>
    </UserProvider>
  );
}

export default App;
