import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import SymptomInput from '../components/SymptomInput';
import SuggestionsList from '../components/SuggestionsList';
import { getAssessment } from '../api/assessment';

const COMMON_SYMPTOMS = [
  "Fever", "Cough", "Headache", "Fatigue", "Sore throat", "Runny nose"
];

export default function SymptomChecker() {
  const [input, setInput] = useState('');
  const [symptoms, setSymptoms] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [result, setResult] = useState('');

  useEffect(() => {
    if (input) {
      const filteredSuggestions = COMMON_SYMPTOMS.filter(symptom =>
        symptom.toLowerCase().startsWith(input.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [input]);

  const handleCheck = async () => {
    if (symptoms.length === 0) {
      setResult("No symptoms entered.");
      return;
    }

    const assessmentResult = await getAssessment(symptoms);
    setResult(assessmentResult);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" fontWeight={700} mb={2}>Symptom Checker</Typography>
      <SymptomInput input={input} setInput={setInput} />
      <SuggestionsList suggestions={suggestions} setSymptoms={setSymptoms} />
      <Box mt={2}>
        <Typography variant="subtitle1">Your Symptoms:</Typography>
        <Typography variant="body1">{symptoms.join(', ') || 'None'}</Typography>
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