import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import authHeader from "../services/auth-header";
import api from '../requests/req';

interface ObjectCardItemProps {
  id: number;
  name: string;
  description: string;
  address: string;
  city: string;
  objectType: string;
  onClick: () => void;
  onDelete: (id: number) => void; // New prop for deletion
}

const ObjectCardItem: React.FC<ObjectCardItemProps> = ({
  id,
  name,
  description,
  address,
  city,
  objectType,
  onClick,
  onDelete // Destructure new prop
}) => {
  const [open, setOpen] = useState(false); // For handling the dialog state
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  // Open the confirmation dialog
  const handleClickOpen = () => {
    setOpen(true);
  };

  // Close the dialog
  const handleClose = () => {
    setOpen(false);
    setErrorMessage(null); // Reset error message when closing
  };

  const handleDelete = async () => {
    try {
      const response = await api.delete(`/sport-objects/${id}`, { headers: authHeader() });

      if (response.status === 204) {
        onDelete(id); // Call the delete function passed from the parent
      } else if (response.status === 403) {
        authService.logout();
        navigate('/login');
      }
    } catch (error: any) {
      console.error('Error deleting the object:', error);
      setErrorMessage('Failed to delete the object.');
    } finally {
      setOpen(false);
    }
  };

  return (
    <div className="max-w-5xl w-80 bg-white rounded-3xl shadow-lg hover:shadow-2xl hover:scale-105 transform transition-all duration-300 m-8 cursor-pointer">
      {/* Card Header - clickable */}
      <div 
        onClick={onClick} 
        className="relative overflow-hidden rounded-t-3xl h-56 bg-gradient-to-br from-blue-500 to-purple-600"
      >
        <div className="absolute inset-0 bg-black opacity-25"></div>
        <div className="absolute inset-0 flex items-center justify-center text-white text-2xl font-semibold p-4 text-center z-10">
          {name}
        </div>
      </div>

      {/* Card Content */}
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

        {/* Delete Button - independent from card click */}
        <Button
          size="small"
          variant="contained"
          color="error"
          onClick={(e) => {
            e.stopPropagation(); // Stop the card's onClick from triggering
            handleClickOpen();
          }}
        >
          DELETE
        </Button>
      </div>

      {/* Confirmation Dialog */}
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
          {errorMessage && (
            <p className="text-red-500 font-semibold">{errorMessage}</p>
          )}
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
