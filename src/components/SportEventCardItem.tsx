import React, { useEffect, useState } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from "@mui/material";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { SportEvent, extractDateTime } from "../interfaces";
import HandymanIcon from "@mui/icons-material/Handyman";
import authHeader, { getEmailFromToken } from "../services/auth-header";
import { useNavigate } from "react-router-dom";
import api from '../requests/req';
import authService from "../services/authService";
import PopupInfo from "./PopupInfo";
import { useContext } from 'react';
import { UserContext } from "../contexts/UserContext";

interface Props {
  item: SportEvent;
  updatePlayerCount: (eventId: number, increment: boolean) => void;
}

const SportEventCardItem = ({ item ,updatePlayerCount  }: Props) => {

  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupSeverity, setPopupSeverity] = useState<'success' | 'error' | 'warning' | 'info'>('error');
  const [showPeopleListPopup, setShowPeopleListPopup] = useState(false);
  const [peopleList, setPeopleList] = useState<string[]>([]);


  const navigate = useNavigate();
  const formattedCost = item.price.toFixed(2);

  const userContext = useContext(UserContext);

  const renderMultiSport = () => {
    if (item.isMultisportCard) {
      return (
        <div className="absolute top-2 right-2 bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center">
          M
        </div>
      );
    }
    return null;
  };

  const renderEditButton = () => {
    const emailFromToken = getEmailFromToken();
    if (item.createdBy === emailFromToken) {
      return (
        <div className="absolute bottom-64 right-0 p-1">
          <IconButton onClick={() => navigate(`/event-details/${item.id}`)}>
            <HandymanIcon className="text-gray-800 cursor-pointer hover:text-orange-500" />
          </IconButton>
        </div>
      );
    }
    return null;
  };

  const parsedDateAndTime = extractDateTime(item.dateWhen);

  const handleSignIn = async (id: number) => {
    try {
      const response = await api.put(`/sportevents/assign-or-remove-from-event/${id}?operationType=add`,{},{ headers: authHeader() });
      if(response.status === 204){
        setPopupMessage("Success!");
        setPopupSeverity("success");
        setShowPopup(true);
        updatePlayerCount(id, true);
        await userContext?.fetchUserInfo();
      }
      else{
        setPopupMessage("Something went wrong!");
        setPopupSeverity("error");
        setShowPopup(true);
      }
    } catch (err: any) {
      if (err.response && err.response.status === 403) {
        authService.logout();
        navigate('/login');
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
        window.location.reload();
      }
      setPopupMessage("Something went wrong!");
      setPopupSeverity("error");
      setShowPopup(true);
    }
  };


  const handleShowPeopleList = async (id: number) => {
    try {
      const response = await api.get(`/sportevents/${id}/people-in-event`, { headers: authHeader() });
      if (response.status === 200) {
        setPeopleList(response.data);
        setShowPeopleListPopup(true);
      } else {
        setPopupMessage("Failed to load people list");
        setPopupSeverity("error");
        setShowPopup(true);
      }
    } catch (err: any) {
      console.log(err);
      setPopupMessage("Error fetching people list");
      setPopupSeverity("error");
      setShowPopup(true);
    }
  };
  

  const handleSignOut = async (id: number) => {
    try {
      const response = await api.put( `/sportevents/assign-or-remove-from-event/${id}?operationType=remove`,{},{ headers: authHeader() });
      if(response.status === 204){
        setPopupMessage("Success!");
        setPopupSeverity("success");
        setShowPopup(true);
        updatePlayerCount(id, false);
        await userContext?.fetchUserInfo();
      }else{
        setPopupMessage("Something went wrong!");
        setPopupSeverity("error");
        setShowPopup(true);
      }
    } catch (err: any) {
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

  const renderPeopleListPopup = () => {
    return (
      <Dialog 
      open={showPeopleListPopup} 
      onClose={() => setShowPeopleListPopup(false)}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle className="text-center text-2xl font-bold bg-gray-100 py-4">
        People in Event
      </DialogTitle>
      <DialogContent className="p-6">
        {peopleList.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {peopleList.map((email, index) => (
              <div
                key={index}
                className="p-4 bg-gray-100 rounded-lg shadow-md hover:bg-gray-200 transition"
              >
                <span className="text-gray-800 font-medium">{email}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500">
            <p>No one has joined this event yet.</p>
          </div>
        )}
      </DialogContent>
      <DialogActions className="justify-center pb-6">
        <Button
          variant="contained"
          color="primary"
          className="px-6 py-2 text-lg"
          onClick={() => setShowPeopleListPopup(false)}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
    
    );
  };

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

  const handleClosePopup = () => {
    setShowPopup(false);
  };


  return (
    <div className="relative flex flex-col bg-white rounded-[15px] border border-gray-300 
    max-w-[350px] text-gray-800 transition-transform transform hover:scale-105 shadow-lg">
      {renderMultiSport()}
      {renderEditButton()}
      <PopupInfo
      message={popupMessage}
      severity={popupSeverity}
      open={showPopup}
      handleClose={handleClosePopup}
    />
      <div className="ml-3 p-3 bg-orange-500 text-white mb-4 mt-4 max-w-[160px] rounded-[15px] flex flex-col">
        {item.objectCity}
      </div>
      <div className="flex justify-center max-w-full">
        <img
          className="rounded-[12px] max-w-[350px]"
          src={getCategoryImageSrc()}
          alt="image"
        />
      </div>
      <div className="flex items-center justify-center p-5 text-gray-600">
        <LocationOnIcon />
        <span className="ml-2">{item.address}</span>
      </div>
      <div className="border-b-[1px] border-gray-300 min-w-[85%] mx-auto"></div>
      <div className="flex items-center justify-between p-5 mx-[8px]">
        <div className="flex items-center text-gray-600">
          <CalendarMonthIcon />
          <span>{parsedDateAndTime.date}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <AccessTimeIcon />
          <span>{parsedDateAndTime.time}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <IconButton onClick={() => handleShowPeopleList(item.id)}>
            <PeopleAltIcon  />
          </IconButton>
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
      <div className="flex items-center justify-center text-gray-600">
        <StarBorderIcon />
        <span className="ml-2">{item.skillLevel}</span>
      </div>
      <div className="border-b-[1px] border-gray-300 min-w-[85%] mx-auto"></div>
      <div className="flex justify-center text-4xl my-[15px] text-gray-800">
        {formattedCost} zł
      </div>
      <div className="p-5">
        {item.currentUserAssignedToEvent ? (
          <Button
            className="w-[100%] bg-red-500 hover:bg-red-600 text-white"
            variant="outlined"
            onClick={() => handleSignOut(item.id)}
          >
            Sign Out
          </Button>
        ) : (
          <Button
            className="w-[100%] bg-orange-500 hover:bg-orange-600 text-white"
            variant="contained"
            endIcon={<LocalAtmIcon />}
            onClick={() => handleSignIn(item.id)}
          >
            Sign Up
          </Button>
        )}
      </div>
      {renderPeopleListPopup()}
    </div>
  );
};

export default SportEventCardItem;
