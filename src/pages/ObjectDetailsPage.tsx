import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, CircularProgress } from '@mui/material';
import api from '../requests/req';
import authService from "../services/authService";
import authHeader from "../services/auth-header";

interface Cities {
  id: number;
  name: string;
}

interface ObjectTypes {
  id: number;
  typeName: string;
}

interface ObjectDetails {
  id: number;
  name: string;
  description: string;
  address: string;
  city: Cities;
  objectType: ObjectTypes;
}

const ObjectDetailsPage = () => {
  const { id } = useParams<{ id: string }>(); 
  const navigate = useNavigate();
  const [objectDetails, setObjectDetails] = useState<ObjectDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true); 
  
  useEffect(() => {

    const fetchObjectDetails = async () => {
      try {
        const response = await api.get(`/object-details/${id}`, { headers: authHeader() });
        setObjectDetails(response.data);
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-100 to-white">
        <CircularProgress size={60} thickness={4.5} />
      </div>
    );
  }

  if (!objectDetails) {
    return <div><CircularProgress /></div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 to-white flex items-center justify-center">
      <div className="w-[90%] max-w-[800px] bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-2xl font-bold text-orange-600 mb-6">Object Details</h1>

        <form className="grid grid-cols-1 gap-6">
          <TextField
            label="Name"
            value={objectDetails.name}
            InputProps={{ readOnly: true }}
            fullWidth
            sx={{
              '& .MuiInputBase-root': {
                backgroundColor: 'rgba(255, 165, 0, 0.1)',
              },
            }}
          />

          <TextField
            label="Description"
            value={objectDetails.description}
            InputProps={{ readOnly: true }}
            fullWidth
            multiline
            minRows={3}
            sx={{
              '& .MuiInputBase-root': {
                backgroundColor: 'rgba(255, 165, 0, 0.1)',
              },
            }}
          />

          <TextField
            label="Address"
            value={objectDetails.address}
            InputProps={{ readOnly: true }}
            fullWidth
            sx={{
              '& .MuiInputBase-root': {
                backgroundColor: 'rgba(255, 165, 0, 0.1)',
              },
            }}
          />

          <TextField
            label="City"
            value={objectDetails.city?.name}
            InputProps={{ readOnly: true }}
            fullWidth
            sx={{
              '& .MuiInputBase-root': {
                backgroundColor: 'rgba(255, 165, 0, 0.1)',
              },
            }}
          />

          <TextField
            label="Object Type"
            value={objectDetails.objectType?.typeName}
            InputProps={{ readOnly: true }}
            fullWidth
            sx={{
              '& .MuiInputBase-root': {
                backgroundColor: 'rgba(255, 165, 0, 0.1)',
              },
            }}
          />
        </form>
      </div>
    </div>
  );
};

export default ObjectDetailsPage;
