import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

export default function ActionAreaCard({ service }) {
  return (
    <Card sx={{ maxWidth: 345, borderRadius: 2, boxShadow: 3, overflow: 'hidden' }}>
      <CardActionArea>
        {/* Dynamically setting the image with fixed width and height */}
        <CardMedia
          component="img"
          sx={{
            width: '100%', // Set the width to 100% of the card
            height: 200, // Set a fixed height
            objectFit: 'cover', // Cover the area while maintaining aspect ratio
            borderTopLeftRadius: 2,
            borderTopRightRadius: 2,
          }}
          image={service.image || "/static/images/cards/default-image.jpg"} // Use default if no image
          alt={service.name}
        />
        <CardContent>
          {/* Display the service name */}
          <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: 'bold', color: '#333' }}>
            {service.name}
          </Typography>

          {/* Display the location */}
          <Typography variant="body2" sx={{ color: '#555', fontStyle: 'italic' }}>
            {service.location}
          </Typography>

          {/* Display other details like amenities */}
          <Typography variant="body2" sx={{ color: '#777', marginTop: 1 }}>
            Amenities: {service.amenities ? service.amenities.join(', ') : 'N/A'}
          </Typography>

          {/* Optionally display email or other fields */}
          <Typography variant="body2" sx={{ color: '#777', marginTop: 1 }}>
            Contact: {service.email}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
