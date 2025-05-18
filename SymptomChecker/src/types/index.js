// filepath: /SymptomChecker/SymptomChecker/src/types/index.js
export interface Symptom {
  id: number;
  name: string;
}

export interface Assessment {
  status: string;
  message: string;
  recommendations: string[];
}

export interface UserInput {
  symptoms: Symptom[];
}