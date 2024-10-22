import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, CircularProgress } from '@mui/material';
import api from '../requests/req';
import authService from "../services/authService";
import authHeader from "../services/auth-header";


interface ObjectDetails {
  id: number;
  name: string;
  description: string;
  adress: string;
  city: string;
  objectType: string;
}

const ObjectDetailsPage = () => {
  const { id } = useParams<{ id: string }>(); 
  const navigate = useNavigate();
  const [objectDetails, setObjectDetails] = useState<ObjectDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true); 
  
  useEffect(() => {

    const fetchObjectDetails = async () => {
      try {
        console.log('Fetching details...');
        if (id !== undefined) {
          const eventId = parseInt(id);
          const response = await api.get(`/sport-objects/${eventId}`, { headers: authHeader() });
          setObjectDetails(response.data);
        }

      } catch (error: any) {
        if (error.response && error.response.status === 403) {
          authService.logout();
          navigate('/login');
        } else {
          console.error('Failed to fetch object details:', error);
        }
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchObjectDetails();
    }
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <CircularProgress size={60} thickness={4.5} />
      </div>
    );
  }

  if (!objectDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <CircularProgress size={60} thickness={4.5} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10">
      <div className="w-full max-w-2xl bg-white shadow-2xl rounded-xl p-8 transition-transform transform hover:scale-105 duration-300">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Object Details</h1>

        <form className="space-y-6">
          <TextField
            label="Name"
            value={objectDetails?.name || ''}  
            InputProps={{ readOnly: true }}
            fullWidth
            sx={{
              '& .MuiInputBase-root': {
                backgroundColor: '#f3f4f6', 
              },
              '& label': {
                color: '#4b5563', 
              }
            }}
          />

          <TextField
            label="Description"
            value={objectDetails?.description || ''}  
            InputProps={{ readOnly: true }}
            fullWidth
            multiline
            minRows={3}
            sx={{
              '& .MuiInputBase-root': {
                backgroundColor: '#f3f4f6', 
              },
              '& label': {
                color: '#4b5563', 
              }
            }}
          />

          <TextField
            label="Address"
            value={objectDetails?.adress || ''}  
            InputProps={{ readOnly: true }}
            fullWidth
            sx={{
              '& .MuiInputBase-root': {
                backgroundColor: '#f3f4f6', 
              },
              '& label': {
                color: '#4b5563', 
              }
            }}
          />

          <TextField
            label="City"
            value={objectDetails?.city || ''}  
            InputProps={{ readOnly: true }}
            fullWidth
            sx={{
              '& .MuiInputBase-root': {
                backgroundColor: '#f3f4f6', 
              },
              '& label': {
                color: '#4b5563', 
              }
            }}
          />

          <TextField
            label="Object Type"
            value={objectDetails?.objectType || ''}  
            InputProps={{ readOnly: true }}
            fullWidth
            sx={{
              '& .MuiInputBase-root': {
                backgroundColor: '#f3f4f6', 
              },
              '& label': {
                color: '#4b5563', 
              }
            }}
          />
        </form>
      </div>
    </div>
  );
};

export default ObjectDetailsPage;
