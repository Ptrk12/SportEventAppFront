import React from 'react'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

interface Props {
    item: {
        category: string,
        city: string,
        address: string,
        dateWhen: string,
        dateTime: string,
        poepleCount: number,
        peopleAssigned: number,
        cost: number,
        skillLevel: string
    }
}

const SportEventCardItem = ({ item }: Props) => {

    const formattedCost = item.cost.toFixed(2)

    return (
        <div className='flex flex-col bg-white rounded-[15px] border border-gray-300 max-w-sm text-white-text-color'>
            <div className='ml-3 p-3 bg-violet-400 mb-4 mt-4 max-w-[160px] rounded-[15px]'>
                {item.city}
            </div>
            <div className='flex justify-center max-w-full'>
                <img className='rounded-[12px] max-w-[370px]' src="/assets/football.jpg" alt="Football" />
            </div>
            <div className='flex items-center justify-center p-5'>
                <LocationOnIcon />
                {item.address}
            </div>
            <div className='border-b-[1px] border-gray min-w-[85%] mx-auto'>
            </div>
            <div className='flex items-center justify-between p-5 mx-[8px]'>
                <div className='flex items-center'>
                    <CalendarMonthIcon />
                    <span>{item.dateWhen}</span>
                </div>
                <div className='flex items-center'>
                    <AccessTimeIcon />
                    <span>{item.dateTime}</span>
                </div>
                <div className='flex items-center'>
                    <PeopleAltIcon />
                    <span>{item.peopleAssigned}/{item.poepleCount}</span>
                </div>
            </div>
            <div className='border-b-[1px] border-gray min-w-[85%] mx-auto'>
            </div>
            <div className='flex justify-center text-4xl my-[15px]'>
                {formattedCost} zł
            </div>
        </div>
    )
}

export default SportEventCardItem
