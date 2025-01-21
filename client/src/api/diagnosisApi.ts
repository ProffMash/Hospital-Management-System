import axios from 'axios';

// Axios instance with default configurations
const axiosInstance = axios.create({
  // baseURL: 'http://127.0.0.1:8000/api/',
  baseURL: 'https://hospital-m-s-backend.onrender.com/api/',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Type definition for diagnosis data
export interface DiagnosisData {
  patient: number;
  patient_name: string; 
  diagnosis: string; 
  prescribed_medicine: string; 
  dosage: string; 
}

// Fetch all diagnoses
export const getDiagnoses = async (): Promise<DiagnosisData[]> => {
  try {
    const response = await axiosInstance.get('patient-diagnosis/');
    return response.data; 
  } catch (error) {
    const err = error as any;
    console.error('Error fetching diagnoses:', err.response?.data || err.message);
    throw error;
  }
};

// Create a new diagnosis
export const createDiagnosis = async (diagnosisData: DiagnosisData): Promise<DiagnosisData> => {
  try {
    const response = await axiosInstance.post('patient-diagnosis/', diagnosisData);
    return response.data; // Returns the newly created diagnosis
  } catch (error) {
    const err = error as any;
    console.error('Error creating diagnosis:', err.response?.data || err.message);
    throw error;
  }
};

// Update an existing diagnosis by ID
export const updateDiagnosis = async (
  id: number,
  diagnosisData: Partial<DiagnosisData> // Partial allows updating only specific fields
): Promise<DiagnosisData> => {
  try {
    const response = await axiosInstance.put(`patient-diagnosis/${id}/`, diagnosisData);
    return response.data; // Returns the updated diagnosis
  } catch (error) {
    const err = error as any;
    console.error('Error updating diagnosis:', err.response?.data || err.message);
    throw error;
  }
};

// Delete a diagnosis by ID
export const deleteDiagnosis = async (id: number): Promise<void> => {
  try {
    await axiosInstance.delete(`patient-diagnosis/${id}/`);
  } catch (error) {
    const err = error as any;
    console.error('Error deleting diagnosis:', err.response?.data || err.message);
    throw error;
  }
};
