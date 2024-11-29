import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/patients/';

interface Patient {
  id: number;
  name: string;
  age: number;
  phone: number;
  email: string;
  status: string;
}

// Fetch all patients
export const getPatients = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching patients:', error);
    throw error;
  }
};

// Get a single patient by ID
export const getPatientById = async (id: number) => {
  try {
    const response = await axios.get(`${API_URL}${id}/`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching patient with ID ${id}:`, error);
    throw error;
  }
};

// Add a new patient
export const addPatient = async (patient: Omit<Patient, 'id'>) => {
  try {
    const response = await axios.post(API_URL, patient);
    return response.data;
  } catch (error) {
    console.error('Error adding patient:', error);
    throw error;
  }
};

// Update an existing patient
export const updatePatient = async (id: number, patient: Omit<Patient, 'id'>) => {
  try {
    const response = await axios.patch(`${API_URL}${id}/`, patient);
    return response.data;
  } catch (error) {
    console.error(`Error updating patient with ID ${id}:`, error);
    throw error;
  }
};

// Delete a patient
export const deletePatient = async (id: number) => {
  try {
    await axios.delete(`${API_URL}${id}/`);
    console.log(`Patient with ID ${id} deleted successfully`);
  } catch (error) {
    console.error(`Error deleting patient with ID ${id}:`, error);
    throw error;
  }
};

// Get getPatientsCount function using axios
export const getPatientsCount = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/patients/count/');
    return response.data.count; // Return the count from the API response
  } catch (error) {
    console.error('Error fetching patients count:', error);
    return 0;
  }
};

