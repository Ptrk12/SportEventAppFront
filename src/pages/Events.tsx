import React, { useState } from 'react'
import SportEventCardItem from '../components/SportEventCardItem'
import { Button } from '@mui/material'
import EventSearchBar from '../components/EventSearchBar'

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
    isMultisportCard: false
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
    isMultisportCard: true
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
    isMultisportCard: true
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
    isMultisportCard: false
  },
  {
    id: 5,
    category: "football",
    city: "Kraków",
    address: "Aleja 29 listopada 12/22",
    dateWhen: "02.06.2024",
    dateTime: "15:15",
    poepleCount: 10,
    peopleAssigned: 10,
    cost: 10.20,
    skillLevel: "Amateur",
    isMultisportCard: true
  }
]

const Events = () => {
  const [sportEventCardItems, setSportEventCardItems] = useState(tempToDeleteLater)

  const[openDrawer, setOpenDrawer] = useState(false);

  const toggleDrawer = (newOpen:boolean) =>{
    setOpenDrawer(newOpen);
  }

  console.log(openDrawer)
  return (
    <div>
      <EventSearchBar open={openDrawer} toggleDrawer={toggleDrawer} />
      <div className='p-2'>
      <Button onClick={() => toggleDrawer(true)} variant="outlined" size='large'>Search for event</Button>
      </div>
      <div className='flex flex-wrap justify-center gap-5 p-5'>
        {
          sportEventCardItems.map(x => {
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
