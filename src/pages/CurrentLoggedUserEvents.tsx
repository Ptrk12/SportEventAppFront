import React, { useEffect, useRef, useState } from 'react'
import api from '../requests/req';
import authHeader from '../services/auth-header';
import authService from '../services/authService';
import { useNavigate, useLocation } from 'react-router-dom';
import { SportEvent } from '../interfaces';
import SportEventCardItem from '../components/SportEventCardItem';

const CurrentLoggedUserEvents = () => {

  const navigate = useNavigate();

  const [sportEventCardItems, setSportEventCardItems] = useState<SportEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isFetching = useRef(false);

  const fetchEvents = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/sportevents/current-user-events',{ headers: authHeader() });
      setSportEventCardItems(response.data);
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

  const updatePlayerCount = (eventId: number, increment: boolean) => {
    setSportEventCardItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === eventId
            ? {
                ...item,
                peopleAssigned: increment
                  ? item.peopleAssigned + 1
                  : item.peopleAssigned - 1,
                currentUserAssignedToEvent: increment,
              }
            : item
        )
        .filter((item) => item.currentUserAssignedToEvent || item.id !== eventId)
    );
  };
  
  return (
    <div>
      <span className='text-lg'>List of events you are assigned to</span>
    <div className="bg-gray-100 p-5 flex-grow relative">
      <div className="flex flex-wrap justify-center gap-5 p-5">
        {sportEventCardItems.map((x) => (
          <SportEventCardItem key={x.id} item={x} updatePlayerCount={updatePlayerCount} />
        ))}
      </div>
    </div>
    </div>
  );
}

export default CurrentLoggedUserEvents