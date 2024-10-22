import React, { useEffect, useState } from 'react';
import { CircularProgress, Grid, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from '../requests/req';
import authService from '../services/authService';
import authHeader from '../services/auth-header';
import ObjectCardItem from '../components/ObjectCardItem';

interface Object {
  id: number;
  name: string;
  description: string;
  adress: string;
  city: string;
  objectType: string;
}

const ObjectListPage: React.FC = () => {
  const [objects, setObjects] = useState<Object[]>([]);
  const [loading, setLoading] = useState<boolean>(true); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchObjects = async () => {
      try {
        const response = await api.get('/objects-created-by-user', { headers: authHeader() });
        setObjects(response.data);
      } catch (error: any) {
        if (error.response && error.response.status === 403) {
          authService.logout();
          navigate('/login');
        } else {
          console.error('Failed to fetch objects', error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchObjects();
  }, [navigate]);

  const handleDeleteObject = (id: number) => {
    setObjects((prevObjects) => prevObjects.filter((object) => object.id !== id));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-100 to-white">
        <CircularProgress size={60} thickness={4.5} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 to-white p-8">
      <div className="flex justify-center mb-8">
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => navigate('/my-events')}
          sx={{
            backgroundColor: 'orange',
            '&:hover': {
              backgroundColor: '#ff9800',
            },
            color: 'white',
            padding: '12px 24px',
            borderRadius: '30px',
            textTransform: 'none', 
          }}
        >
          Events Assigned to Me
        </Button>
      </div>
      <Grid container spacing={3} justifyContent="center">
        {objects.map((object) => (
          <Grid item key={object.id} xs={12} sm={6} md={4} lg={3}>
            <ObjectCardItem
              id={object.id}
              name={object.name}
              description={object.description}
              address={object.adress}
              city={object.city}
              objectType={object.objectType}
              onClick={() => navigate(`/object-details/${object.id}`)} 
              onDelete={handleDeleteObject} // Pass the delete handler
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ObjectListPage;
