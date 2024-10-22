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
import Footer from './components/Footer';
import EventDetailsAndEdit from './pages/EventDetailsAndEdit';
import CreateObject from './pages/CreateObject';
import ObjectDetailsPage from './pages/ObjectDetailsPage';
import ObjectsCreatedByUs from './pages/ObjectsCreatedByUs';

function App() {
  return (
    <UserProvider>
      <div className="flex flex-col min-h-screen"> {/* Flex container */}
        <Navbar />
        <main className="flex-grow"> {/* Main content area */}
          <AppRoutes />
        </main>
        <Footer /> {/* Footer will always be at the bottom */}
      </div>
    </UserProvider>
  );
}

function AppRoutes() {
  const userContext = useContext(UserContext);
  
  if (userContext?.isLoading) {
    return <div>Loading...</div>; 
  }

  const user = userContext?.user;

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/create-object" element={<CreateObject />} />
      <Route path="/object-details" element={<ObjectDetailsPage />} />
      <Route path="/our-objects" element={<ObjectsCreatedByUs />} />
      <Route path="/" element={<Home />} />
      <Route path="/event-details/:eventId" element={<EventDetailsAndEdit />} />

      {user ? (
        <>
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
