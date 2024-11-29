// src/api/medicineInventoryApi.ts
import axiosInstance from '../utils/axiosInstance';

export const createMedicine = async (medicineData: {
  name: string;
  category: string;
  quantity: number;
  price: number;
}) => {
  try {
    const response = await axiosInstance.post('medicine-inventory/', medicineData);
    return response.data;
  } catch (error) {
    console.error('Error creating medicine:', error);
    throw error;
  }
};

export const getMedicines = async () => {
  try {
    const response = await axiosInstance.get('medicine-inventory/');
    return response.data;
  } catch (error) {
    console.error('Error fetching medicines:', error);
    throw error;
  }
};

export const updateMedicine = async (id: number, medicineData: object) => {
  try {
    const response = await axiosInstance.put(`medicine-inventory/${id}/`, medicineData);
    return response.data;
  } catch (error) {
    console.error('Error updating medicine:', error);
    throw error;
  }
};

export const deleteMedicine = async (id: number) => {
  try {
    await axiosInstance.delete(`medicine-inventory/${id}/`);
  } catch (error) {
    console.error('Error deleting medicine:', error);
    throw error;
  }
};
