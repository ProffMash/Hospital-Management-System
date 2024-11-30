import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/', 
  headers: {
    'Content-Type': 'application/json',
  },
});

// Create a new diagnosis
export const createDiagnosis = async (diagnosisData: {
  patient_id: number;
  patient_name: string;
  diagnosis: string;
  prescribed_medicine: string;
  dosage: string;
  next_checkup: string;
}) => {
  try {
    const response = await axiosInstance.post('patient-diagnosis/', diagnosisData);
    return response.data;
  } catch (error) {
    console.error('Error creating diagnosis:', error);
    throw error;
  }
};

// Fetch all diagnoses
export const getDiagnoses = async () => {
  try {
    const response = await axiosInstance.get('patient-diagnosis/');
    return response.data;
  } catch (error) {
    console.error('Error fetching diagnoses:', error);
    throw error;
  }
};

// Update a diagnosis by ID
export const updateDiagnosis = async (id: number, diagnosisData: object) => {
  try {
    const response = await axiosInstance.put(`patient-diagnosis/${id}/`, diagnosisData);
    return response.data;
  } catch (error) {
    console.error('Error updating diagnosis:', error);
    throw error;
  }
};

// Delete a diagnosis by ID
export const deleteDiagnosis = async (id: number) => {
  try {
    await axiosInstance.delete(`patient-diagnosis/${id}/`);
  } catch (error) {
    console.error('Error deleting diagnosis:', error);
    throw error;
  }
};
