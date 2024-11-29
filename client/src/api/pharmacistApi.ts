// src/api/pharmacistApi.ts
import axiosInstance from '../utils/axiosInstance';

export const createPharmacist = async (pharmacistData: {
  name: string;
  specialization: string;
  phone: string;
  email: string;
  status: string;
}) => {
  try {
    const response = await axiosInstance.post('pharmacists/', pharmacistData);
    return response.data;
  } catch (error) {
    console.error('Error creating pharmacist:', error);
    throw error;
  }
};

export const getPharmacists = async () => {
  try {
    const response = await axiosInstance.get('pharmacists/');
    return response.data;
  } catch (error) {
    console.error('Error fetching pharmacists:', error);
    throw error;
  }
};

export const updatePharmacist = async (id: number, pharmacistData: object) => {
  try {
    const response = await axiosInstance.put(`pharmacists/${id}/`, pharmacistData);
    return response.data;
  } catch (error) {
    console.error('Error updating pharmacist:', error);
    throw error;
  }
};

export const deletePharmacist = async (id: number) => {
  try {
    await axiosInstance.delete(`pharmacists/${id}/`);
  } catch (error) {
    console.error('Error deleting pharmacist:', error);
    throw error;
  }
};
