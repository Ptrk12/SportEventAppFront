import React, { useEffect, useState, useRef } from 'react';
import SportEventCardItem from '../components/SportEventCardItem';
import { Button } from '@mui/material';
import EventSearchBar from '../components/EventSearchBar';
import api from '../requests/req';
import { SportEvent } from '../interfaces';
import { useLocation, useNavigate } from 'react-router-dom';
import authHeader from '../services/auth-header';
import authService from '../services/authService';

const Events = () => {
  const navigate = useNavigate();

  const [sportEventCardItems, setSportEventCardItems] = useState<SportEvent[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<SportEvent[]>([]);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();
  const isFetching = useRef(false);

  const toggleDrawer = (newOpen: boolean) => {
    setOpenDrawer(newOpen);
  };

  const fetchEvents = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/sportevents',{ headers: authHeader() });
      setSportEventCardItems(response.data);
      setFilteredEvents(response.data);
      filterEvents(response.data); 
      setLoading(false);
    } catch (err: any) {
      setLoading(false);
      setError('Failed to fetch events. Please try again.');
      if (err.response && err.response.status === 403) {
        authService.logout();
        navigate('/login');
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
        window.location.reload();
      }
    }
  };

  useEffect(() => {
    if (!isFetching.current) {
      isFetching.current = true;  
      fetchEvents();
    }
  }, []);

  const handleFilterEvents = (filtered: SportEvent[]) => {
    setFilteredEvents(filtered);
  };

  const filterEvents = (events: SportEvent[]) => {
    const { discipline, city, searchString } = location.state || {};
    const filtered = events.filter((event) => {
      const matchesDiscipline = discipline ? event.discipline === discipline : true;
      const matchesCity = city ? event.objectCity === city : true;
      const matchesSearchString = searchString
        ? event.objectCity.toLowerCase().includes(searchString.toLowerCase())
        : true;
      return matchesDiscipline && matchesCity && matchesSearchString;
    });
    setFilteredEvents(filtered);
  };

  return (
    <div className="bg-gray-100 p-5 flex-grow relative"> {/* Flex-grow added here */}
      <EventSearchBar open={openDrawer} toggleDrawer={toggleDrawer} events={sportEventCardItems} onFilter={handleFilterEvents} />
      <div className='flex justify-between p-2'>
        <Button
          onClick={() => toggleDrawer(true)}
          variant="contained"
          size="large"
          className="bg-orange-500 hover:bg-orange-600 text-white"
        >
          Search for event
        </Button>
        <Button
          onClick={() => navigate('/create-sport-event')}
          variant="contained"
          size="large"
          className="bg-orange-500 hover:bg-orange-600 text-white"
        >
          Create event
        </Button>
      </div>
      <div className="flex flex-wrap justify-center gap-5 p-5">
        {filteredEvents.map((x) => (
          <SportEventCardItem key={x.id} item={x} />
        ))}
      </div>
    </div>
  );
};

export default Events;
