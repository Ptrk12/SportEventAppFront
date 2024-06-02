import React from 'react'
import SportEventCardItem from '../components/SportEventCardItem'

const tempItemToDeleteLater = {
  category:"football",
  city:"Kraków",
  address:"Aleja 29 listopada 12/22",
  dateWhen:"02.06.2024",
  dateTime:"15:15",
  poepleCount:10,
  peopleAssigned:10,
  cost:10.20,
  skillLevel:"Amateur"
}

const Home = () => {
  return (
    <div>
      <SportEventCardItem item={tempItemToDeleteLater}/>
    </div>
  )
}

export default Home