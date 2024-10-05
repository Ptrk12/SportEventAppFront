import React, { useState } from 'react';
import SportEventCardItem from '../components/SportEventCardItem';
import { Button } from '@mui/material';
import EventSearchBar from '../components/EventSearchBar';

const tempToDeleteLater = [
  {
    id: 1,
    category: "football",
    city: "Kraków",
    address: "Aleja 29 listopada 12/22",
    dateWhen: "02.06.2024",
    dateTime: "15:15",
    poepleCount: 10,
    peopleAssigned: 2,
    cost: 10.20,
    skillLevel: "Amateur",
    isMultisportCard: false,
  },
  {
    id: 2,
    category: "football",
    city: "Kraków",
    address: "Aleja 29 listopada 12/22",
    dateWhen: "02.06.2024",
    dateTime: "15:15",
    poepleCount: 10,
    peopleAssigned: 10,
    cost: 10.20,
    skillLevel: "Amateur",
    isMultisportCard: true,
  },
  {
    id: 3,
    category: "football",
    city: "Kraków",
    address: "Aleja 29 listopada 12/22",
    dateWhen: "02.06.2024",
    dateTime: "15:15",
    poepleCount: 10,
    peopleAssigned: 10,
    cost: 10.20,
    skillLevel: "Amateur",
    isMultisportCard: true,
  },
  {
    id: 4,
    category: "football",
    city: "Kraków",
    address: "Aleja 29 listopada 12/22",
    dateWhen: "02.06.2024",
    dateTime: "15:15",
    poepleCount: 10,
    peopleAssigned: 10,
    cost: 10.20,
    skillLevel: "Amateur",
    isMultisportCard: false,
  },
  
];

const Events = () => {
  const [sportEventCardItems, setSportEventCardItems] = useState(tempToDeleteLater);

  const [openDrawer, setOpenDrawer] = useState(false);

  const toggleDrawer = (newOpen: boolean) => {
    setOpenDrawer(newOpen);
  };

  console.log(openDrawer);
  return (
    <div className="bg-gray-100 min-h-screen p-5 relative bg-[url('/public/assets/home-bg.jpg')] h-[600px] w-full bg-cover bg-center ">
      <EventSearchBar open={openDrawer} toggleDrawer={toggleDrawer} />
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
        {sportEventCardItems.map((x) => (
          <SportEventCardItem key={x.id} item={x} />
        ))}
      </div>
    </div>
  );
};

export default Events;
//<div className="relative bg-[url('/public/assets/home-bg.jpg')] h-[600px] w-full bg-cover bg-center bg-top">