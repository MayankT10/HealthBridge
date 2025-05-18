import React, { useState } from 'react';
import { Box, Typography, TextField, Button, List, ListItem, ListItemText, CircularProgress, LinearProgress } from '@mui/material';
import axios from 'axios';

export default function SymptomChecker() {
  const [input, setInput] = useState('');
  const [symptoms, setSymptoms] = useState([]);
  const [aiResult, setAiResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAddSymptoms = () => {
    setSymptoms(input.split(',').map(s => s.trim()).filter(Boolean));
    setAiResult(null);
    setError('');
  };

  const handleAIAnalyze = async () => {
    setLoading(true);
    setAiResult(null);
    setError('');
    try {
      const prompt = `
You are a medical assistant AI. Given these symptoms: ${symptoms.join(', ')}, estimate the risk of a serious illness as a percentage (0-100), and suggest possible causes and next steps. Respond in this JSON format:
{
  "risk": <number>,
  "causes": "<short text>",
  "advice": "<short text>"
}
      `.trim();

      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: prompt }],
          max_tokens: 150,
          temperature: 0.2,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
          },
        }
      );

      // Parse the AI's JSON response
      const text = response.data.choices[0].message.content;
      const json = JSON.parse(text);
      setAiResult(json);
    } catch (err) {
      setError('AI analysis failed. Please try again.');
    }
    setLoading(false);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" fontWeight={700} mb={2}>
        🤖 AI-Powered Symptom Checker
      </Typography>
      <Typography variant="body1" mb={2}>
        Enter your symptoms (comma separated):
      </Typography>
      <TextField
        fullWidth
        label="Symptoms"
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="e.g. Fever, Cough"
        sx={{ mb: 2 }}
      />
      <Button variant="contained" onClick={handleAddSymptoms}>
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
        <Button
          variant="outlined"
          onClick={handleAIAnalyze}
          sx={{ mt: 1 }}
          disabled={loading || symptoms.length === 0}
        >
          {loading ? "Analyzing..." : "AI Analyze"}
        </Button>
        {loading && (
          <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
            <CircularProgress size={24} />
            <Typography variant="body2">AI is analyzing your symptoms...</Typography>
          </Box>
        )}
        {aiResult && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle2" color="secondary">
              AI Risk Assessment:
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <LinearProgress
                variant="determinate"
                value={aiResult.risk}
                sx={{ width: 150, height: 10, borderRadius: 5 }}
                color={aiResult.risk >= 60 ? "error" : aiResult.risk >= 30 ? "warning" : "success"}
              />
              <Typography variant="body2" fontWeight={700}>
                {aiResult.risk}%
              </Typography>
            </Box>
            <Typography variant="body2" mt={2}>
              <strong>Possible Causes:</strong> {aiResult.causes}
            </Typography>
            <Typography variant="body2" color="primary" mt={1}>
              <strong>Advice:</strong> {aiResult.advice}
            </Typography>
          </Box>
        )}
        {error && (
          <Typography variant="body2" color="error" mt={2}>{error}</Typography>
        )}
      </Box>
    </Box>
  );
}