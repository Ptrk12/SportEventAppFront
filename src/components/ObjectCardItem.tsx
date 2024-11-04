import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import authHeader from "../services/auth-header";
import api from '../requests/req';
import PopupInfo from './PopupInfo';

interface ObjectCardItemProps {
  id: number;
  name: string;
  description: string;
  address: string;
  city: string;
  objectType: string;
  onClick: () => void;
  onDelete: (id: number) => void; 
}

const ObjectCardItem: React.FC<ObjectCardItemProps> = ({
  id,
  name,
  description,
  address,
  city,
  objectType,
  onClick,
  onDelete 
}) => {
  const [open, setOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupSeverity, setPopupSeverity] = useState<'success' | 'error' | 'warning' | 'info'>('error');
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    try {
      const response = await api.delete(`/sport-objects/${id}`, { headers: authHeader() });

      if (response.status === 204) {
        onDelete(id);
        setShowPopup(true);
        setPopupMessage("Success !");
        setPopupSeverity("success");
      } else if (response.status === 403) {
        authService.logout();
        navigate('/login');
      }else if(response.status === 409){
        setShowPopup(true);
        setPopupMessage("Something went wrong !");
        setPopupSeverity("error");
      }
    } catch (error: any) {
      setShowPopup(true);
      setPopupMessage("Something went wrong !");
      setPopupSeverity("error");
    } finally {
      setOpen(false);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="max-w-5xl w-80 bg-white rounded-3xl shadow-lg hover:shadow-2xl hover:scale-105 transform transition-all duration-300 m-8 cursor-pointer">
       <PopupInfo
      message={popupMessage}
      severity={popupSeverity}
      open={showPopup}
      handleClose={handleClosePopup}
    />
      <div 
        onClick={onClick} 
        className="relative overflow-hidden rounded-t-3xl h-56 bg-gradient-to-br from-blue-500 to-purple-600"
      >
        <div className="absolute inset-0 bg-black opacity-25"></div>
        <div className="absolute inset-0 flex items-center justify-center text-white text-2xl font-semibold p-4 text-center z-10">
          {name}
        </div>
      </div>
      <div className="p-6 space-y-4">
        <p className="text-lg text-gray-700">
          {description.length > 100 ? `${description.substring(0, 100)}...` : description}
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="text-sm text-gray-500">
            <span className="font-semibold">Address:</span> {address}
          </div>
          <div className="text-sm text-gray-500">
            <span className="font-semibold">City:</span> {city}
          </div>
          <div className="text-sm text-gray-500">
            <span className="font-semibold">Type:</span> {objectType}
          </div>
        </div>
        <Button
          size="small"
          variant="contained"
          color="error"
          onClick={(e) => {
            e.stopPropagation(); 
            handleClickOpen();
          }}
        >
          DELETE
        </Button>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Are you sure you want to delete this object?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            The object will only be deleted if no events are assigned to it. 
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ObjectCardItem;
