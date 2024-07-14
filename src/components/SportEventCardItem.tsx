import React from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { Button, IconButton } from "@mui/material";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import StarBorderIcon from '@mui/icons-material/StarBorder';

interface Props {
  item: {
    id:number;
    category: string;
    city: string;
    address: string;
    dateWhen: string;
    dateTime: string;
    poepleCount: number;
    peopleAssigned: number;
    cost: number;
    skillLevel: string;
    isMultisportCard: boolean | null
  };
}

const SportEventCardItem = ({ item }: Props) => {
  const formattedCost = item.cost.toFixed(2);

  const renderMultiSport = () => {
    if (item.isMultisportCard === true) {
      return (
        <div className="absolute top-2 right-2 bg-cyan-600 text-white rounded-full w-8 h-8 flex items-center justify-center">
          M
        </div>
      );
    }
    return null;
  };

  const getCategoryImageSrc = () => {
    switch (item.category) {
      case "football":
        return "/assets/football.jpg";
      case "basketball":
        return "/assets/basketball.jpg";
      case "volleyball":
        return "/assets/volleyball.jpg";
      default:
        return "/assets/default.jpg";
    }
  };

  return (
    <div className="relative flex flex-col bg-white rounded-[15px] border border-gray-300 
    max-w-[350px] text-white-text-color transition-transform transform hover:scale-105">
        {renderMultiSport()}
      <div className="ml-3 p-3 bg-violet-400 mb-4 mt-4 max-w-[160px] rounded-[15px]">
        {item.city}
      </div>
      <div className="flex justify-center max-w-full">
        <img
          className="rounded-[12px] max-w-[350px]"
          src={getCategoryImageSrc()}
          alt="image"
        />
      </div>
      <div className="flex items-center justify-center p-5">
        <LocationOnIcon />
        {item.address}
      </div>
      <div className="border-b-[1px] border-gray min-w-[85%] mx-auto"></div>
      <div className="flex items-center justify-between p-5 mx-[8px]">
        <div className="flex items-center">
          <CalendarMonthIcon />
          <span>{item.dateWhen}</span>
        </div>
        <div className="flex items-center">
          <AccessTimeIcon />
          <span>{item.dateTime}</span>
        </div>
        <div className="flex items-center">
          <PeopleAltIcon />
          <span
            className={
              item.peopleAssigned === item.poepleCount
                ? "text-red-500"
                : "text-green-500"
            }
          >
            {item.peopleAssigned}/{item.poepleCount}
          </span>
        </div>
      </div>
      <div className="flex items-center justify-center">
            <StarBorderIcon />
            <span>
                {item.skillLevel}
            </span>
      </div>
      <div className="border-b-[1px] border-gray min-w-[85%] mx-auto"></div>
      <div className="flex justify-center text-4xl my-[15px]">
        {formattedCost} zł
      </div>
      <div className="p-5">
        <Button
            className="w-[100%]"
          variant="contained"
          endIcon={<LocalAtmIcon />}
          color="secondary"
        >
          Sign up
        </Button>
      </div>
    </div>
  );
};

export default SportEventCardItem;
