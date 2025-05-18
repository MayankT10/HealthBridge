import React, { useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText, Button } from '@mui/material';

const CLINICS = [
  { name: "City Health Clinic", address: "123 Main St", distance: "1.2 km" },
  { name: "Wellness Center", address: "456 Oak Ave", distance: "2.5 km" },
  { name: "Community Hospital", address: "789 Pine Rd", distance: "4.0 km" }
];

export default function ClinicsNearby() {
  const [clinics] = useState(CLINICS);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" fontWeight={700} mb={2}>Clinics Nearby</Typography>
      <List>
        {clinics.map((clinic, idx) => (
          <ListItem key={idx} sx={{ mb: 2, border: '1px solid #e0e0e0', borderRadius: 2 }}>
            <ListItemText
              primary={clinic.name}
              secondary={`${clinic.address} • ${clinic.distance}`}
            />
            <Button
              variant="contained"
              color="primary"
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(clinic.name + ' ' + clinic.address)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              View on Map
            </Button>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}