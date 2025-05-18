import React, { useState } from 'react';
import { Box, Typography, Button, TextField, List, ListItem, ListItemText } from '@mui/material';

export default function MedicineTracker() {
  const [medicines, setMedicines] = useState([
    { name: 'Paracetamol', time: '08:00 AM' },
    { name: 'Vitamin D', time: '09:00 PM' }
  ]);
  const [name, setName] = useState('');
  const [time, setTime] = useState('');

  const addMedicine = () => {
    if (name && time) {
      setMedicines([...medicines, { name, time }]);
      setName('');
      setTime('');
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" fontWeight={700} mb={2}>Medicine Tracker</Typography>
      <Box mb={2}>
        <TextField
          label="Medicine Name"
          value={name}
          onChange={e => setName(e.target.value)}
          sx={{ mr: 2 }}
        />
        <TextField
          label="Time"
          type="time"
          value={time}
          onChange={e => setTime(e.target.value)}
          sx={{ mr: 2 }}
          InputLabelProps={{ shrink: true }}
        />
        <Button variant="contained" onClick={addMedicine}>Add</Button>
      </Box>
      <List>
        {medicines.map((med, idx) => (
          <ListItem key={idx}>
            <ListItemText primary={`${med.name} - ${med.time}`} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}