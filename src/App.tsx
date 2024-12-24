import React, { useContext } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
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
import CurrentLoggedUserEvents from './pages/CurrentLoggedUserEvents';
import  Settings  from './pages/Settings'
import  Documentation  from './pages/Documentation'
import AddMoney from './pages/AddMoney';

function App() {
  return (
    <UserProvider>
      <div className="flex flex-col min-h-screen"> 
        <Navbar />
        <main className="flex-grow"> 
          <AppRoutes />
        </main>
        <Footer /> 
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
      <Route path="/documentation" element={<Documentation />} />
      <Route path="/about" element={<About />} />
      {user ? (
        <>
          <Route path="/events" element={<Events />} />
          <Route path="/create-sport-event" element={<CreateEvent />} />
          <Route path="/create-object" element={<CreateObject />} />
          <Route path="/object-details/:id" element={<ObjectDetailsPage />} />
          <Route path="/our-objects" element={<ObjectsCreatedByUs />} />
          <Route path="/" element={<Home />} />
          <Route path="/event-details/:eventId" element={<EventDetailsAndEdit />} />
          <Route path="/user-events" element={<CurrentLoggedUserEvents />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/add-money" element={<AddMoney />} />

        </>
      ) : (
        <Route path="*" element={<Navigate to="/login" />} />
      )}
    </Routes>
  );
}

export default App;
