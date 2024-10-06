import React, { useEffect, useState, useRef } from 'react';
import SportEventCardItem from '../components/SportEventCardItem';
import { Button, CircularProgress } from '@mui/material';
import EventSearchBar from '../components/EventSearchBar';
import api from '../requests/req';
import { SportEvent } from '../interfaces';

const Events = () => {
  const [sportEventCardItems, setSportEventCardItems] = useState<SportEvent[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<SportEvent[]>([]);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Use a ref to track if the fetchEvents has been called
  const isFetching = useRef(false);

  const toggleDrawer = (newOpen: boolean) => {
    setOpenDrawer(newOpen);
  };

  const fetchEvents = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/sporteventss');
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
    // Ensure the fetchEvents is only called once during the initial mount
    if (!isFetching.current) {
      isFetching.current = true;  // Mark as fetching to prevent double calls
      fetchEvents();
    }
  }, []);

  const handleFilterEvents = (filtered: SportEvent[]) => {
    setFilteredEvents(filtered);
  };

  return (
    <div>
      <EventSearchBar open={openDrawer} toggleDrawer={toggleDrawer} events={sportEventCardItems} onFilter={handleFilterEvents} />

      <div className="p-2">
        <Button onClick={() => toggleDrawer(true)} variant="outlined" size="large">
          Search for event
        </Button>
      </div>
      {loading && (
        <div className="flex justify-center items-center">
          <CircularProgress />
        </div>
      )}
      {error && (
        <div className="flex justify-center items-center text-red-500">
          {error}
        </div>
      )}
      {!loading && !error && (
        <div className="flex flex-wrap justify-center gap-5 p-5">
          {filteredEvents.map((x) => {
            return <SportEventCardItem key={x.id} item={x} />;
          })}
        </div>
      )}
    </div>
  );
};

export default Events;
