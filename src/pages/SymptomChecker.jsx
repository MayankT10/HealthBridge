import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Chip, Stack, Paper, LinearProgress } from '@mui/material';

const COMMON_SYMPTOMS = [
  "Fever", "Cough", "Headache", "Fatigue", "Sore throat", "Runny nose", "Shortness of breath", "Chest pain", "Nausea", "Vomiting", "Diarrhea", "Loss of taste", "Loss of smell", "Muscle pain", "Rash"
];

// Each rule now has a 'probability' and 'actions'
const RISK_RULES = [
  {
    symptoms: ["Fever", "Cough", "Shortness of breath"],
    condition: "COVID-19 or Respiratory Infection",
    probability: 90,
    actions: [
      "Seek medical help immediately.",
      "Isolate yourself from others.",
      "Monitor oxygen levels if possible."
    ],
    risk: "high"
  },
  {
    symptoms: ["Chest pain", "Shortness of breath"],
    condition: "Possible Cardiac Issue",
    probability: 85,
    actions: [
      "Seek emergency care immediately.",
      "Do not ignore chest pain."
    ],
    risk: "high"
  },
  {
    symptoms: ["Fever", "Headache", "Rash"],
    condition: "Possible Viral Infection (e.g., Dengue, Measles)",
    probability: 70,
    actions: [
      "Consult a doctor soon.",
      "Stay hydrated.",
      "Monitor for worsening symptoms."
    ],
    risk: "medium"
  },
  {
    symptoms: ["Fever", "Cough"],
    condition: "Flu or Viral Infection",
    probability: 60,
    actions: [
      "Rest and drink fluids.",
      "Monitor symptoms.",
      "Consult a doctor if symptoms worsen."
    ],
    risk: "low"
  },
  {
    symptoms: ["Headache", "Fatigue"],
    condition: "Migraine or Fatigue",
    probability: 50,
    actions: [
      "Rest in a quiet, dark room.",
      "Stay hydrated.",
      "Consult a doctor if persistent."
    ],
    risk: "low"
  },
  {
    symptoms: ["Nausea", "Vomiting", "Diarrhea"],
    condition: "Gastroenteritis (Stomach Infection)",
    probability: 75,
    actions: [
      "Stay hydrated.",
      "Eat light, bland foods.",
      "Consult a doctor if symptoms persist or worsen."
    ],
    risk: "medium"
  },
  {
    symptoms: ["Loss of taste", "Loss of smell", "Fever"],
    condition: "Possible COVID-19",
    probability: 80,
    actions: [
      "Isolate yourself.",
      "Get tested for COVID-19.",
      "Consult a healthcare provider."
    ],
    risk: "high"
  },
  {
    symptoms: ["Rash", "Fever", "Muscle pain"],
    condition: "Possible Dengue or Viral Infection",
    probability: 70,
    actions: [
      "Avoid mosquito bites.",
      "Consult a doctor for blood tests.",
      "Monitor for bleeding or severe pain."
    ],
    risk: "medium"
  },
  {
    symptoms: ["Sore throat", "Runny nose", "Cough"],
    condition: "Common Cold",
    probability: 60,
    actions: [
      "Rest and drink fluids.",
      "Use throat lozenges.",
      "Consult a doctor if symptoms persist."
    ],
    risk: "low"
  },
  {
    symptoms: ["Chest pain", "Shortness of breath", "Fatigue"],
    condition: "Possible Heart Issue (e.g., Angina, Heart Attack)",
    probability: 95,
    actions: [
      "Seek emergency medical attention immediately.",
      "Do not attempt to drive yourself.",
      "Call emergency services."
    ],
    risk: "high"
  },
  {
    symptoms: ["Headache", "Nausea", "Vomiting"],
    condition: "Migraine",
    probability: 65,
    actions: [
      "Rest in a quiet, dark room.",
      "Take prescribed migraine medication if available.",
      "Consult a doctor if headaches are frequent."
    ],
    risk: "medium"
  },
  {
    symptoms: ["Fatigue", "Muscle pain", "Fever"],
    condition: "Viral Fever",
    probability: 55,
    actions: [
      "Rest and drink plenty of fluids.",
      "Monitor your temperature.",
      "Consult a doctor if symptoms worsen."
    ],
    risk: "low"
  },
  {
    symptoms: ["Shortness of breath", "Chest pain", "Cough"],
    condition: "Possible Pneumonia",
    probability: 85,
    actions: [
      "Seek medical attention.",
      "Monitor oxygen levels if possible.",
      "Do not ignore worsening symptoms."
    ],
    risk: "high"
  },
  {
    symptoms: ["Diarrhea", "Fatigue", "Fever"],
    condition: "Possible Food Poisoning",
    probability: 60,
    actions: [
      "Stay hydrated.",
      "Eat light foods.",
      "Consult a doctor if diarrhea persists more than 2 days."
    ],
    risk: "medium"
  },
  {
    symptoms: ["Sore throat", "Fever", "Headache"],
    condition: "Possible Strep Throat",
    probability: 65,
    actions: [
      "Consult a doctor for a throat swab.",
      "Avoid sharing utensils.",
      "Rest and drink fluids."
    ],
    risk: "medium"
  },
  {
    symptoms: ["Fever", "Night sweats", "Weight loss", "Cough"],
    condition: "Possible Tuberculosis",
    probability: 70,
    actions: [
      "Consult a doctor for TB testing.",
      "Avoid close contact with others.",
      "Monitor for worsening symptoms."
    ],
    risk: "medium"
  },
  {
    symptoms: ["Joint pain", "Rash", "Fever"],
    condition: "Possible Chikungunya",
    probability: 65,
    actions: [
      "Consult a doctor for blood tests.",
      "Rest and stay hydrated.",
      "Use mosquito repellents."
    ],
    risk: "medium"
  },
  {
    symptoms: ["Abdominal pain", "Nausea", "Vomiting", "Jaundice"],
    condition: "Possible Hepatitis",
    probability: 75,
    actions: [
      "Consult a doctor for liver function tests.",
      "Avoid alcohol.",
      "Rest and maintain hygiene."
    ],
    risk: "high"
  },
  {
    symptoms: ["Frequent urination", "Increased thirst", "Fatigue"],
    condition: "Possible Diabetes (Hyperglycemia)",
    probability: 60,
    actions: [
      "Consult a doctor for blood sugar testing.",
      "Monitor your diet.",
      "Stay hydrated."
    ],
    risk: "medium"
  },
  {
    symptoms: ["Burning urination", "Lower abdominal pain", "Fever"],
    condition: "Possible Urinary Tract Infection (UTI)",
    probability: 70,
    actions: [
      "Drink plenty of water.",
      "Consult a doctor for urine tests.",
      "Complete prescribed antibiotics if given."
    ],
    risk: "medium"
  },
  {
    symptoms: ["Severe headache", "Neck stiffness", "Fever", "Sensitivity to light"],
    condition: "Possible Meningitis",
    probability: 85,
    actions: [
      "Seek emergency medical attention.",
      "Do not delay treatment.",
      "Avoid bright lights."
    ],
    risk: "high"
  },
  {
    symptoms: ["Sudden weakness", "Difficulty speaking", "Facial droop"],
    condition: "Possible Stroke",
    probability: 95,
    actions: [
      "Call emergency services immediately.",
      "Note the time symptoms started.",
      "Do not give food or drink."
    ],
    risk: "high"
  },
  {
    symptoms: ["Itchy eyes", "Sneezing", "Runny nose"],
    condition: "Allergic Rhinitis",
    probability: 60,
    actions: [
      "Avoid allergens if known.",
      "Use antihistamines if prescribed.",
      "Consult a doctor if symptoms persist."
    ],
    risk: "low"
  },
  {
    symptoms: ["Red eye", "Eye discharge", "Itching"],
    condition: "Conjunctivitis (Pink Eye)",
    probability: 65,
    actions: [
      "Avoid touching your eyes.",
      "Wash hands frequently.",
      "Consult a doctor for eye drops."
    ],
    risk: "low"
  },
  {
    symptoms: ["Back pain", "Numbness in legs", "Loss of bladder control"],
    condition: "Possible Spinal Cord Compression",
    probability: 90,
    actions: [
      "Seek emergency medical attention.",
      "Do not delay treatment.",
      "Avoid heavy lifting."
    ],
    risk: "high"
  }
];

export default function SymptomChecker() {
  const [input, setInput] = useState('');
  const [symptoms, setSymptoms] = useState([]);
  const [results, setResults] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  // Suggest symptoms as user types
  const handleInputChange = (e) => {
    const val = e.target.value;
    setInput(val);
    if (val.length > 0) {
      const filtered = COMMON_SYMPTOMS.filter(
        sym => sym.toLowerCase().startsWith(val.toLowerCase()) && !symptoms.includes(sym)
      );
      setSuggestions(filtered.slice(0, 5));
    } else {
      setSuggestions([]);
    }
  };

  // Add symptom from input or suggestion
  const addSymptom = (sym) => {
    const newSym = sym || input.trim();
    if (newSym && !symptoms.includes(newSym)) {
      setSymptoms([...symptoms, newSym]);
    }
    setInput('');
    setSuggestions([]);
    setResults([]);
  };

  // Remove a symptom
  const removeSymptom = (sym) => {
    setSymptoms(symptoms.filter(s => s !== sym));
    setResults([]);
  };

  // Risk assessment logic with probabilities
  const handleCheck = () => {
    if (symptoms.length === 0) {
      setResults([{ condition: "No symptoms entered.", probability: 0, actions: [], risk: "low" }]);
      return;
    }
    // Find all matching rules, sorted by probability
    const matches = RISK_RULES
      .filter(rule => rule.symptoms.every(s => symptoms.includes(s)))
      .sort((a, b) => b.probability - a.probability);

    if (matches.length > 0) {
      setResults(matches);
    } else {
      // Fallback: suggest monitoring and general advice
      setResults([{
        condition: "No major issues detected. Monitor your symptoms. If you feel unwell, consult a doctor.",
        probability: 20,
        actions: [
          "Monitor your symptoms.",
          "Consult a doctor if you feel worse or are concerned."
        ],
        risk: "low"
      }]);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" fontWeight={700} mb={2}>Symptom Checker</Typography>
      <Typography variant="body1" mb={2}>Start typing a symptom and select from suggestions:</Typography>
      <TextField
        fullWidth
        label="Enter symptom"
        value={input}
        onChange={handleInputChange}
        onKeyDown={e => {
          if (e.key === 'Enter') addSymptom();
        }}
        placeholder="e.g. Fever"
        sx={{ mb: 1 }}
        autoComplete="off"
      />
      {suggestions.length > 0 && (
        <Paper sx={{ mb: 2, p: 1, background: '#f5f5f5' }}>
          <Stack direction="row" spacing={1}>
            {suggestions.map((sym, idx) => (
              <Chip
                key={idx}
                label={sym}
                onClick={() => addSymptom(sym)}
                color="primary"
                variant="outlined"
                sx={{ cursor: 'pointer' }}
              />
            ))}
          </Stack>
        </Paper>
      )}
      <Button
        variant="contained"
        onClick={() => addSymptom()}
        disabled={!input.trim()}
        sx={{ mb: 2 }}
      >
        Add Symptom
      </Button>
      <Box mt={2}>
        <Typography variant="subtitle1">Your Symptoms:</Typography>
        <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', mb: 2 }}>
          {symptoms.map((sym, idx) => (
            <Chip
              key={idx}
              label={sym}
              onDelete={() => removeSymptom(sym)}
              color="secondary"
              sx={{ mb: 1 }}
            />
          ))}
        </Stack>
        <Button
          variant="outlined"
          onClick={handleCheck}
          disabled={symptoms.length === 0}
          sx={{ mt: 1 }}
        >
          Check
        </Button>
        {results.length > 0 && (
          <Box mt={3}>
            <Typography variant="h6" mb={1}>Assessment Results:</Typography>
            {results.map((res, idx) => (
              <Paper key={idx} sx={{ p: 2, mb: 2, background: res.risk === "high" ? "#ffebee" : res.risk === "medium" ? "#fffde7" : "#e3fcec" }}>
                <Typography variant="subtitle1" fontWeight={600}>
                  {res.condition}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <LinearProgress
                    variant="determinate"
                    value={res.probability}
                    sx={{
                      height: 8,
                      borderRadius: 5,
                      width: 120,
                      mr: 2,
                      background: "#eee",
                      '& .MuiLinearProgress-bar': {
                        background: res.risk === "high" ? "#d32f2f" : res.risk === "medium" ? "#fbc02d" : "#43a047"
                      }
                    }}
                  />
                  <Typography variant="body2" fontWeight={700}>
                    {res.probability}%
                  </Typography>
                </Box>
                {res.actions.length > 0 && (
                  <ul style={{ margin: 0, paddingLeft: 18 }}>
                    {res.actions.map((act, i) => (
                      <li key={i}><Typography variant="body2">{act}</Typography></li>
                    ))}
                  </ul>
                )}
              </Paper>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
}