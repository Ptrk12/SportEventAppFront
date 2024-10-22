import React from 'react';
import { Card, CardContent, Typography, CardActionArea } from '@mui/material';

interface ObjectCardItemProps {
  name: string;
  description: string;
  address: string;
  city: string;
  objectType: string;
  onClick: () => void;
}

const ObjectCardItem: React.FC<ObjectCardItemProps> = ({
  name,
  description,
  address,
  city,
  objectType,
  onClick
}) => {
  return (
    <Card 
      onClick={onClick} 
      sx={{ 
        maxWidth: 345, 
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', 
        backgroundColor: '#fff', 
        margin: '16px' 
      }}
    >
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h6" component="div" color="primary">
            {name}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {description.length > 80 ? `${description.substring(0, 80)}...` : description}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Address: {address}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            City: {city}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Type: {objectType}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ObjectCardItem;
