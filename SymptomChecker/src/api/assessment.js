import axios from 'axios';

const GEMINI_API_KEY = 'AIzaSyCzknNsNmANTRNRMYLmAAEWRyM3XaScoiM';

const getAssessment = async (symptoms) => {
  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [{
          parts: [{
            text: `Analyze these symptoms and provide suggestions: ${symptoms.join(', ')}. Also include a medical warning.`
          }]
        }]
      }
    );
    const generatedText = response.data.candidates[0].content.parts[0].text;
    return {
      suggestions: generatedText,
      warning: "Note: Home remedies are not suggested. Please consult a doctor for proper diagnosis and treatment."
    };
  } catch (error) {
    console.error('Gemini API error:', error);
    return {
      suggestions: [],
      warning: "Error getting assessment. Please try again later."
    };
  }
};

export { getAssessment };