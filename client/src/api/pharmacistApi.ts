import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/patient-diagnosis/'; 
const PHARMACY_COUNT_API_URL = 'http://127.0.0.1:8000/api/api/pharmacists/count'; 

export const createPatientDiagnosis = async (patientDiagnosisData: {
  patient: number; // Patient ID
  diagnosis: string;
  prescribed_medicine: string;
  dosage: string;
  next_checkup: string;
}) => {
  try {
    const response = await axios.post(API_URL, patientDiagnosisData);
    return response.data;
  } catch (error) {
    console.error('Error creating patient diagnosis:', error);
    throw error;
  }
};

export const getPatientDiagnoses = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching patient diagnoses:', error);
    throw error;
  }
};

export const updatePatientDiagnosis = async (id: number, patientDiagnosisData: {
  diagnosis?: string;
  prescribed_medicine?: string;
  dosage?: string;
  next_checkup?: string;
}) => {
  try {
    const response = await axios.put(`${API_URL}${id}/`, patientDiagnosisData);
    return response.data;
  } catch (error) {
    console.error('Error updating patient diagnosis:', error);
    throw error;
  }
};

export const deletePatientDiagnosis = async (id: number) => {
  try {
    await axios.delete(`${API_URL}${id}/`);
  } catch (error) {
    console.error('Error deleting patient diagnosis:', error);
    throw error;
  }
};

export const getPharmacyCount = async (): Promise<number> => {
  try {
    const response = await axios.get(PHARMACY_COUNT_API_URL);
    return response.data.count; // Assuming the API response has a 'count' field
  } catch (error) {
    console.error('Error fetching pharmacy count:', error);
    throw error;
  }
};