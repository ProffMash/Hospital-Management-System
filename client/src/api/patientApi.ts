import axios from 'axios';

const API_URL = 'https://hospital-m-s-backend.onrender.com/api/patients/';

interface Patient {
  id: number;
  name: string;
  age: number;
  phone: number;
  email: string;
  status: string;
}

export const getPatients = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching patients:', error);
    throw error;
  }
};

export const getPatientById = async (id: number) => {
  try {
    const response = await axios.get(`${API_URL}${id}/`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching patient with ID ${id}:`, error);
    throw error;
  }
};

export const addPatient = async (patient: Omit<Patient, 'id'>) => {
  try {
    const response = await axios.post(API_URL, patient);
    return response.data;
  } catch (error) {
    console.error('Error adding patient:', error);
    throw error;
  }
};

export const updatePatient = async (id: number, patient: Omit<Patient, 'id'>) => {
  try {
    const response = await axios.patch(`${API_URL}${id}/`, patient);
    return response.data;
  } catch (error) {
    console.error(`Error updating patient with ID ${id}:`, error);
    throw error;
  }
};

export const deletePatient = async (id: number) => {
  try {
    await axios.delete(`${API_URL}${id}/`);
    console.log(`Patient with ID ${id} deleted successfully`);
  } catch (error) {
    console.error(`Error deleting patient with ID ${id}:`, error);
    throw error;
  }
};

export const getPatientsCount = async () => {
  try {
    const response = await axios.get('https://hospital-m-s-backend.onrender.com/api/patients/count/');
    return response.data.count; 
  } catch (error) {
    console.error('Error fetching patients count:', error);
    return 0;
  }
};

