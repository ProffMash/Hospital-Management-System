// src/api/appointmentApi.ts
import axiosInstance from '../utils/axiosInstance';

export const createAppointment = async (appointmentData: {
  patient_id: number;
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

export const getAppointments = async () => {
  try {
    const response = await axiosInstance.get('appointments/');
    return response.data;
  } catch (error) {
    console.error('Error fetching appointments:', error);
    throw error;
  }
};

export const updateAppointment = async (id: number, appointmentData: object) => {
  try {
    const response = await axiosInstance.put(`appointments/${id}/`, appointmentData);
    return response.data;
  } catch (error) {
    console.error('Error updating appointment:', error);
    throw error;
  }
};

export const deleteAppointment = async (id: number) => {
  try {
    await axiosInstance.delete(`appointments/${id}/`);
  } catch (error) {
    console.error('Error deleting appointment:', error);
    throw error;
  }
};
