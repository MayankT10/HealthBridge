import React, { useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText, Button, CircularProgress, Alert } from '@mui/material';

export default function ClinicsNearby() {
  const [clinics, setClinics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [locationError, setLocationError] = useState('');
  const [coords, setCoords] = useState(null);

  const fetchClinics = async (lat, lon) => {
    setLoading(true);
    setLocationError('');
    try {
      // Increase the bounding box for a wider search area
      const delta = 0.1;
      const left = lon - delta;
      const right = lon + delta;
      const top = lat + delta;
      const bottom = lat - delta;
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=clinic&limit=10&addressdetails=1&extratags=1&bounded=1&viewbox=${left},${top},${right},${bottom}`;
      const res = await fetch(url, { headers: { 'Accept-Language': 'en' } });
      const data = await res.json();
      if (data.length === 0) {
        setLocationError('No clinics found nearby. Try increasing your search area.');
      }
      setClinics(data);
      // For debugging:
      // console.log('Clinics data:', data);
    } catch (err) {
      setLocationError('Failed to fetch clinics. Try again later.');
    }
    setLoading(false);
  };

  const handleFindClinics = () => {
    setLocationError('');
    setLoading(true);
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser.');
      setLoading(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setCoords({ latitude, longitude });
        fetchClinics(latitude, longitude);
      },
      (err) => {
        setLocationError('Unable to retrieve your location. Please allow location access.');
        setLoading(false);
      }
    );
  };

  return (
    <Box sx={{ p: 3, minHeight: '100vh', background: 'linear-gradient(135deg, #e0f7fa 0%, #f8ffae 100%)' }}>
      <Typography variant="h4" fontWeight={700} mb={2}>Clinics Nearby</Typography>
      <Button variant="contained" onClick={handleFindClinics} sx={{ mb: 3 }}>
        {loading ? 'Locating...' : 'Find Clinics Near Me'}
      </Button>
      {locationError && <Alert severity="error" sx={{ mb: 2 }}>{locationError}</Alert>}
      {loading && <CircularProgress />}
      {!loading && clinics.length > 0 && (
        <List>
          {clinics.map((clinic, idx) => (
            <ListItem key={clinic.place_id} sx={{ mb: 2, border: '1px solid #e0e0e0', borderRadius: 2 }}>
              <ListItemText
                primary={clinic.display_name.split(',')[0]}
                secondary={clinic.display_name}
              />
              <Button
                variant="contained"
                color="primary"
                href={`https://www.google.com/maps/search/?api=1&query=${clinic.lat},${clinic.lon}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                View on Map
              </Button>
            </ListItem>
          ))}
        </List>
      )}
      {!loading && clinics.length === 0 && !locationError && (
        <Typography variant="body2" color="text.secondary" mt={2}>
          Click "Find Clinics Near Me" to see nearby clinics and hospitals.
        </Typography>
      )}
    </Box>
  );
}