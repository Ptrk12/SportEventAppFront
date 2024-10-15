import React, { useContext } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Ranking from './pages/Ranking';
import Events from './pages/Events';
import About from './pages/About';
import Register from './pages/Register';
import Login from './pages/Login';
import CreateEvent from './pages/CreateEvent';
import { UserProvider, UserContext } from './contexts/UserContext';

function App() {
  return (
    <UserProvider> {/* Wrap the app with UserProvider */}
      <Navbar />
      <AppRoutes /> {/* Separate routes into its own component */}
    </UserProvider>
  );
}

function AppRoutes() {
  const userContext = useContext(UserContext);
  
  // If userContext is still loading, don't show any routes yet
  if (userContext?.isLoading) {
    return <div>Loading...</div>; // You can replace this with a loader or spinner
  }

  const user = userContext?.user;

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Private routes: Only accessible when the user is authenticated */}
      {user ? (
        <>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/ranking" element={<Ranking />} />
          <Route path="/about" element={<About />} />
          <Route path="/create-sport-event" element={<CreateEvent />} />
        </>
      ) : (
        <Route path="*" element={<Navigate to="/login" />} />
      )}
    </Routes>
  );
}

export default App;
