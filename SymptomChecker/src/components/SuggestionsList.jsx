import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';

export default function SuggestionsList({ suggestions, onSelect }) {
  return (
    <List>
      {suggestions.map((symptom, index) => (
        <ListItem button key={index} onClick={() => onSelect(symptom)}>
          <ListItemText primary={symptom} />
        </ListItem>
      ))}
    </List>
  );
}