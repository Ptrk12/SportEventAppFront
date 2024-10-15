import React, { useEffect, useState, useRef } from 'react';
import SportEventCardItem from '../components/SportEventCardItem';
import { Button, CircularProgress } from '@mui/material';
import EventSearchBar from '../components/EventSearchBar';
import api from '../requests/req';
import { SportEvent } from '../interfaces';
import { useLocation } from 'react-router-dom';

const Events = () => {
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
      const response = await api.get('/sportevents');
      setSportEventCardItems(response.data);
      setFilteredEvents(response.data);
      setLoading(false);
    } catch (err: any) {
      setLoading(false);
      setError('Failed to fetch events. Please try again.');
      if (err.response) {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
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
        ? event.address.toLowerCase().includes(searchString.toLowerCase())
        : true;
      return matchesDiscipline && matchesCity && matchesSearchString;
    });
    setFilteredEvents(filtered);
  };


  return (
    <div className="bg-gray-100 min-h-screen p-5 relative bg-[url('/public/assets/home-bg.jpg')] h-[600px] w-full bg-cover bg-center ">
      <EventSearchBar open={openDrawer} toggleDrawer={toggleDrawer} events={sportEventCardItems} onFilter={handleFilterEvents} />
      <div className="p-2">
        <Button
          onClick={() => toggleDrawer(true)}
          variant="contained"
          size="large"
          className="bg-orange-500 hover:bg-orange-600 text-white"
        >
          Search for event
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
