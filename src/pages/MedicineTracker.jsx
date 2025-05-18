import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Button, TextField, List, ListItem, ListItemText, IconButton, Checkbox, Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import format from 'date-fns/format';

function getToday() {
  return format(new Date(), 'yyyy-MM-dd');
}

const STORAGE_KEY = 'medicine-tracker-v2';

export default function MedicineTracker() {
  const [medicines, setMedicines] = useState([]);
  const [name, setName] = useState('');
  const [time, setTime] = useState('');
  const [date, setDate] = useState(new Date());
  const [editIdx, setEditIdx] = useState(null);
  const [editDialog, setEditDialog] = useState(false);
  const [editMed, setEditMed] = useState({});
  const [taken, setTaken] = useState({}); // { 'yyyy-MM-dd': { idx: true } }
  const today = getToday();

  // Load from localStorage
  useEffect(() => {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      setMedicines(parsed.medicines || []);
      setTaken(parsed.taken || {});
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ medicines, taken }));
  }, [medicines, taken]);

  const addMedicine = () => {
    if (name && time && date) {
      setMedicines([
        ...medicines,
        { name, time, date: format(date, 'yyyy-MM-dd') }
      ]);
      setName('');
      setTime('');
      setDate(new Date());
    }
  };

  const deleteMedicine = idx => {
    setMedicines(medicines.filter((_, i) => i !== idx));
    // Remove taken status for this idx
    const newTaken = { ...taken };
    Object.keys(newTaken).forEach(day => {
      if (newTaken[day][idx]) delete newTaken[day][idx];
    });
    setTaken(newTaken);
  };

  const openEdit = idx => {
    setEditIdx(idx);
    setEditMed({ ...medicines[idx] });
    setEditDialog(true);
  };

  const handleEditSave = () => {
    const updated = medicines.map((med, i) =>
      i === editIdx ? editMed : med
    );
    setMedicines(updated);
    setEditDialog(false);
    setEditIdx(null);
  };

  const toggleTaken = (idx, medDate) => {
    const day = medDate || today;
    setTaken(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [idx]: !prev[day]?.[idx]
      }
    }));
  };

  // Filter medicines for selected date
  const [calendarDate, setCalendarDate] = useState(new Date());
  const calendarDay = format(calendarDate, 'yyyy-MM-dd');
  const medsForDay = medicines.filter(med => med.date === calendarDay);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" fontWeight={700} mb={2}>Medicine Tracker</Typography>
        <Box mb={2} display="flex" alignItems="center" flexWrap="wrap" gap={2}>
          <TextField
            label="Medicine Name"
            value={name}
            onChange={e => setName(e.target.value)}
            sx={{ minWidth: 180 }}
          />
          <TextField
            label="Time"
            type="time"
            value={time}
            onChange={e => setTime(e.target.value)}
            InputLabelProps={{ shrink: true }}
            sx={{ minWidth: 120 }}
          />
          <DatePicker
            label="Date"
            value={date}
            onChange={setDate}
            slotProps={{ textField: { size: 'small', sx: { minWidth: 140 } } }}
          />
          <Button variant="contained" onClick={addMedicine}>Add</Button>
        </Box>
        <Box mb={3}>
          <Typography variant="h6" mb={1}>Calendar</Typography>
          <DatePicker
            label="View Medicines For"
            value={calendarDate}
            onChange={setCalendarDate}
            slotProps={{ textField: { size: 'small', sx: { minWidth: 180 } } }}
          />
        </Box>
        <Typography variant="h6" mb={1}>
          Medicines for {format(calendarDate, 'dd MMM yyyy')}
        </Typography>
        <List>
          {medsForDay.length === 0 && (
            <ListItem>
              <ListItemText primary="No medicines scheduled for this day." />
            </ListItem>
          )}
          {medsForDay.map((med, idx) => {
            // Find the index in the full medicines array
            const medIdx = medicines.findIndex(
              m => m.name === med.name && m.time === med.time && m.date === med.date
            );
            return (
              <ListItem
                key={medIdx}
                secondaryAction={
                  <>
                    <IconButton onClick={() => openEdit(medIdx)}><Edit /></IconButton>
                    <IconButton onClick={() => deleteMedicine(medIdx)}><Delete /></IconButton>
                  </>
                }
              >
                <Checkbox
                  checked={!!taken[calendarDay]?.[medIdx]}
                  onChange={() => toggleTaken(medIdx, calendarDay)}
                  color="success"
                />
                <ListItemText
                  primary={`${med.name} - ${med.time}`}
                  secondary={`Date: ${format(new Date(med.date), 'dd MMM yyyy')}`}
                  sx={{
                    textDecoration: taken[calendarDay]?.[medIdx] ? 'line-through' : 'none'
                  }}
                />
              </ListItem>
            );
          })}
        </List>
        <Dialog open={editDialog} onClose={() => setEditDialog(false)}>
          <DialogTitle>Edit Medicine</DialogTitle>
          <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            <TextField
              label="Medicine Name"
              value={editMed.name || ''}
              onChange={e => setEditMed({ ...editMed, name: e.target.value })}
            />
            <TextField
              label="Time"
              type="time"
              value={editMed.time || ''}
              onChange={e => setEditMed({ ...editMed, time: e.target.value })}
              InputLabelProps={{ shrink: true }}
            />
            <DatePicker
              label="Date"
              value={editMed.date ? new Date(editMed.date) : new Date()}
              onChange={d => setEditMed({ ...editMed, date: format(d, 'yyyy-MM-dd') })}
              slotProps={{ textField: { size: 'small' } }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditDialog(false)}>Cancel</Button>
            <Button variant="contained" onClick={handleEditSave}>Save</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </LocalizationProvider>
  );
}