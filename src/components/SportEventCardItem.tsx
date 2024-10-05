import React from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { Button, IconButton } from "@mui/material";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { SportEvent, extractDateTime } from '../interfaces';


//TODO DODAC ADRES DO API BACKEND !!!
interface Props {
  item: SportEvent
}

const SportEventCardItem = ({ item }: Props) => {

  const formattedCost = item.price.toFixed(2);

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

const parsedDateAndTime = extractDateTime(item.dateWhen);

  const getCategoryImageSrc = () => {
    switch (item.discipline) {
      case "Football":
        return "/assets/football.jpg";
      case "Basketball":
        return "/assets/basketball.jpg";
      case "Volleyball":
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
        {item.objectCity}
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
        {/* {item.address} */}
         Skrzypaczowice 95
      </div>
      <div className="border-b-[1px] border-gray min-w-[85%] mx-auto"></div>
      <div className="flex items-center justify-between p-5 mx-[8px]">
        <div className="flex items-center">
          <CalendarMonthIcon />
          <span>{parsedDateAndTime.date}</span>
        </div>
        <div className="flex items-center">
          <AccessTimeIcon />
          <span>{parsedDateAndTime.time}</span>
        </div>
        <div className="flex items-center">
          <PeopleAltIcon />
          <span
            className={
              item.peopleAssigned === item.amountOfPlayers
                ? "text-red-500"
                : "text-green-500"
            }
          >
            {item.peopleAssigned}/{item.amountOfPlayers}
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
