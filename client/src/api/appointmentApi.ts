import axios from "axios";

// const BASE_URL = "http://127.0.0.1:8000/api/medappointment/";
const BASE_URL = "https://hospital-m-s-backend.onrender.com/api/medappointment/";

// Define the Appointment interface
export interface Appointment {
  appointment_id?: number; 
  patient_name: string;   
  date: string;            
  time: string;            
}

// Fetch all appointments
export const getAppointments = async (): Promise<Appointment[]> => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

// Fetch a specific appointment by ID
export const getAppointmentById = async (appointment_id: number): Promise<Appointment> => {
  const response = await axios.get(`${BASE_URL}${appointment_id}/`);
  return response.data;
};

// Create a new appointment
export const createAppointment = async (appointment: Appointment): Promise<Appointment> => {
  const response = await axios.post(BASE_URL, appointment);
  return response.data;
};

// Update an existing appointment by ID
export const updateAppointment = async (appointment_id: number, appointment: Appointment): Promise<Appointment> => {
  const response = await axios.put(`${BASE_URL}${appointment_id}/`, appointment);
  return response.data;
};

// Delete an appointment by ID
export const deleteAppointment = async (appointment_id: number): Promise<void> => {
  await axios.delete(`${BASE_URL}${appointment_id}/`);
};
