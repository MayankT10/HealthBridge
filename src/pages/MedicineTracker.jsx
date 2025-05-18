import React, { useState } from 'react';
import {
  Box, Typography, Button, TextField, List,
  ListItem, ListItemText
} from '@mui/material';
import { motion } from 'framer-motion';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

export default function MedicineTracker() {
  const [medicines, setMedicines] = useState([]); // Start with empty list
  const [name, setName] = useState('');
  const [time, setTime] = useState('');
  const [date, setDate] = useState(null);

  const addMedicine = () => {
    if (name && time && date) {
      setMedicines([...medicines, { name, time, date }]);
      setName('');
      setTime('');
      setDate(null);
    }
  };

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      sx={{
        p: 4,
        maxWidth: 600,
        margin: '0 auto',
        backdropFilter: 'blur(10px)',
        backgroundColor: theme => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
        borderRadius: 4,
        boxShadow: 3,
      }}
    >
      <Typography variant="h4" fontWeight={800} gutterBottom>
        💊 Medicine Tracker
      </Typography>

      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Box mb={3} display="flex" gap={2} flexWrap="wrap">
          <TextField
            label="Medicine Name"
            variant="outlined"
            value={name}
            onChange={e => setName(e.target.value)}
            sx={{ flexGrow: 1, minWidth: '30%' }}
          />
          <TextField
            label="Time"
            type="time"
            value={time}
            onChange={e => setTime(e.target.value)}
            sx={{ minWidth: '20%' }}
            InputLabelProps={{ shrink: true }}
          />
          <DatePicker
            label="Date"
            value={date}
            onChange={setDate}
            renderInput={(params) => <TextField {...params} sx={{ minWidth: '30%' }} />}
          />
          <Button variant="contained" onClick={addMedicine}>
            Add
          </Button>
        </Box>
      </LocalizationProvider>

      <List disablePadding>
        {medicines.map((med, idx) => (
          <ListItem
            key={idx}
            component={motion.li}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.05 }}
            sx={{
              mb: 1,
              backgroundColor: theme => theme.palette.background.paper,
              borderRadius: 2,
              boxShadow: 1,
              '&:hover': {
                boxShadow: 3,
                transform: 'scale(1.02)',
                transition: '0.2s ease-in-out',
              }
            }}
          >
            <ListItemText
              primary={`${med.name}`}
              secondary={`Date: ${med.date ? new Date(med.date).toLocaleDateString() : ''} | Time: ${med.time}`}
              primaryTypographyProps={{ fontWeight: 600 }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
