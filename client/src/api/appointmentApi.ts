import axios from 'axios';

// Create Axios instance for API calls
const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/', // Base URL for the API
  headers: {
    'Content-Type': 'application/json',
  },
});

// API Functions

// Create an appointment
export const createAppointment = async (appointmentData: {
  patient: string;
  date: string;
  time: string;
}) => {
  try {
    const response = await axiosInstance.post('appointments/', appointmentData);
    return response.data;
  } catch (error) {
    console.error('Error creating appointment:', error);
    throw error;
  }
};

// Fetch all appointments
export const getAppointments = async () => {
  try {
    const response = await axiosInstance.get('appointments/');
    return response.data;
  } catch (error) {
    console.error('Error fetching appointments:', error);
    throw error;
  }
};

// Update an appointment by ID
export const updateAppointment = async (
  id: number,
  appointmentData: {
    patient?: string;
    date?: string;
    time?: string;
  }
) => {
  try {
    const response = await axiosInstance.put(`appointments/${id}/`, appointmentData);
    return response.data;
  } catch (error) {
    console.error('Error updating appointment:', error);
    throw error;
  }
};

// Delete an appointment by ID
export const deleteAppointment = async (id: number) => {
  try {
    await axiosInstance.delete(`appointments/${id}/`);
  } catch (error) {
    console.error('Error deleting appointment:', error);
    throw error;
  }
};

// Count total appointments
export const getAppointmentsCount = async () => {
  try {
    const response = await axiosInstance.get('appointments/count/');
    return response.data.count; // Ensure the backend provides this `count` field
  } catch (error) {
    console.error('Error fetching appointments count:', error);
    return 0; // Return 0 as a fallback
  }
};
