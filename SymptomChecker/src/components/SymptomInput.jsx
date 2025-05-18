import React, { useState, useEffect } from 'react';
import { TextField } from '@mui/material';
import SuggestionsList from './SuggestionsList';

const COMMON_SYMPTOMS = [
  "Fever", "Cough", "Headache", "Fatigue", "Sore throat", "Runny nose"
];

export default function SymptomInput({ onSymptomsChange }) {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);

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

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleSuggestionClick = (symptom) => {
    setInput(symptom);
    onSymptomsChange(symptom);
    setSuggestions([]);
  };

  return (
    <div>
      <TextField
        fullWidth
        label="Enter Symptoms"
        value={input}
        onChange={handleInputChange}
        placeholder="e.g. Fever, Cough"
      />
      {suggestions.length > 0 && (
        <SuggestionsList 
          suggestions={suggestions} 
          onSuggestionClick={handleSuggestionClick} 
        />
      )}
    </div>
  );
}