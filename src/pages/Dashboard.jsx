import React from 'react';
import { Box, Typography, Grid, Card, CardContent, Button } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" fontWeight={700} mb={2}>Welcome to Your Dashboard</Typography>
      <Typography variant="subtitle1" mb={3}>
        Quick overview of your health activities and shortcuts.
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Today's Medicines</Typography>
              <Typography variant="body2" color="text.secondary" mb={2}>
                2 medicines scheduled for today.
              </Typography>
              <Button component={Link} to="/medicine-tracker" variant="contained" size="small">
                View Medicine Tracker
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Recent Symptom Checks</Typography>
              <Typography variant="body2" color="text.secondary" mb={2}>
                Last check: No major symptoms detected.
              </Typography>
              <Button component={Link} to="/symptom-checker" variant="contained" size="small">
                Check Symptoms
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Nearby Clinics</Typography>
              <Typography variant="body2" color="text.secondary" mb={2}>
                3 clinics within 5km.
              </Typography>
              <Button component={Link} to="/clinics-nearby" variant="contained" size="small">
                Find Clinics
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Profile & Settings</Typography>
              <Typography variant="body2" color="text.secondary" mb={2}>
                Update your preferences and profile.
              </Typography>
              <Button component={Link} to="/settings" variant="contained" size="small">
                Go to Settings
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}