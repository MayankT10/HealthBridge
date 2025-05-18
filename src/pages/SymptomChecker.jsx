import React, { useState } from 'react';
import { Box, Typography, TextField, Button, List, ListItem, ListItemText } from '@mui/material';

const COMMON_SYMPTOMS = [
  "Fever", "Cough", "Headache", "Fatigue", "Sore throat", "Runny nose"
];

export default function SymptomChecker() {
  const [input, setInput] = useState('');
  const [symptoms, setSymptoms] = useState([]);
  const [result, setResult] = useState('');

  const handleCheck = () => {
    if (symptoms.includes("Fever") && symptoms.includes("Cough")) {
      setResult("Possible flu or viral infection. Please consult a doctor if symptoms persist.");
    } else if (symptoms.length === 0) {
      setResult("No symptoms entered.");
    } else {
      setResult("No major issues detected. Monitor your symptoms.");
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" fontWeight={700} mb={2}>Symptom Checker</Typography>
      <Typography variant="body1" mb={2}>Enter your symptoms (comma separated):</Typography>
      <TextField
        fullWidth
        label="Symptoms"
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="e.g. Fever, Cough"
        sx={{ mb: 2 }}
      />
      <Button variant="contained" onClick={() => setSymptoms(input.split(',').map(s => s.trim()))}>
        Add Symptoms
      </Button>
      <Box mt={2}>
        <Typography variant="subtitle1">Your Symptoms:</Typography>
        <List>
          {symptoms.map((sym, idx) => (
            <ListItem key={idx}>
              <ListItemText primary={sym} />
            </ListItem>
          ))}
        </List>
        <Button variant="outlined" onClick={handleCheck} sx={{ mt: 1 }}>
          Check
        </Button>
        {result && (
          <Typography variant="body2" color="primary" mt={2}>{result}</Typography>
        )}
      </Box>
    </Box>
  );
}