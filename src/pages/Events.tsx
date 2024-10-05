import React, { useEffect, useState } from 'react'
import SportEventCardItem from '../components/SportEventCardItem'
import { Button } from '@mui/material'
import EventSearchBar from '../components/EventSearchBar'
import api from '../requests/req'
import { SportEvent } from '../interfaces';

const Events = () => {
  const [sportEventCardItems, setSportEventCardItems] = useState<SportEvent[]>([])
  const [filteredEvents, setFilteredEvents] = useState<SportEvent[]>([]);
  const[openDrawer, setOpenDrawer] = useState(false);

  const toggleDrawer = (newOpen:boolean) =>{
    setOpenDrawer(newOpen);
  }

  useEffect(() => {
    const fetchEvents = async () => {
      try{
        const response= await api.get('/sportevents')
        setSportEventCardItems(response.data);
        setFilteredEvents(response.data);
      }catch(err : any){
        if(err.response){
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.rersponse.headers);
        }else{

        }
      }
    }
    fetchEvents();
  },[])

  const handleFilterEvents = (filtered: SportEvent[]) => {
    setFilteredEvents(filtered); 
};

  console.log(openDrawer)
  return (
    <div>
      <EventSearchBar open={openDrawer} toggleDrawer={toggleDrawer} events={sportEventCardItems}  onFilter = {handleFilterEvents}/>
      <div className='p-2'>
      <Button onClick={() => toggleDrawer(true)} variant="outlined" size='large'>Search for event</Button>
      </div>
      <div className='flex flex-wrap justify-center gap-5 p-5'>
        {
          filteredEvents.map(x => {
            return (
              <SportEventCardItem key={x.id} item={x} />
            )
          })
        }
      </div>
    </div>
  )
}

export default Events
