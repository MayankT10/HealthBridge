import axios from 'axios';

const API_URL = 'https://api.example.com/assess'; // Replace with the actual API endpoint

export const getAssessment = async (symptoms) => {
  try {
    const response = await axios.post(API_URL, { symptoms });
    return response.data; // Assuming the API returns the assessment data in the response
  } catch (error) {
    console.error('Error fetching assessment:', error);
    throw new Error('Could not retrieve assessment. Please try again later.');
  }
};