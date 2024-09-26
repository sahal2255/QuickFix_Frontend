import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { useNavigate } from 'react-router-dom';

export default function ActionAreaCard({ service }) {
  const navigate = useNavigate();
  
  const handleCardClick = () => {
    navigate(`/service/${service._id}`);
  };

  return (
    <Card
      sx={{
        maxWidth: 345,
        borderRadius: 3,
        boxShadow: 5,
        overflow: 'hidden',
        transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
        },
        '&:hover .MuiTypography-h5': {
          background: 'linear-gradient(45deg, #f3ec78, #af4261)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        },
      }}
      onClick={handleCardClick}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          sx={{
            width: '100%', 
            height: 200, 
            objectFit: 'cover', 
          }}
          image={service.image || "/static/images/cards/default-image.jpg"} 
          alt={service.name}
        />
        <CardContent sx={{ padding: '16px' }}>
          {/* Service name with a gradient hover effect */}
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{
              fontWeight: 'bold',
              color: '#333',
              transition: 'background 0.3s ease',
            }}
          >
            {service.name}
          </Typography>

          {/* Location */}
          <Typography variant="body2" sx={{ color: '#555', fontStyle: 'italic' }}>
            {service.location}
          </Typography>

          {/* Category */}
          <Typography variant="body2" sx={{ color: '#777', marginTop: 1 }}>
            Category: {service.category || 'N/A'}
          </Typography>

          {/* Amenities */}
          <Typography variant="body2" sx={{ color: '#777', marginTop: 1 }}>
            Amenities: {service.amenities ? service.amenities.join(', ') : 'N/A'}
          </Typography>

          {/* Contact */}
          <Typography variant="body2" sx={{ color: '#777', marginTop: 1 }}>
            Contact: {service.email}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
