import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/', 
  headers: {
    'Content-Type': 'application/json',
  },
});

// Fetch all medicines from the API
export const getMedicines = async () => {
  try {
    const response = await axiosInstance.get('medicines/');
    return response.data;
  } catch (error) {
    console.error('Error fetching medicines:', error);
    throw error;
  }
};

// Create a new medicine entry
export const createMedicine = async (medicineData: {
  name: string;
  category: string;
  quantity: number;
  price: number;
}) => {
  try {
    const response = await axiosInstance.post('medicines/', medicineData);
    return response.data;
  } catch (error) {
    console.error('Error creating medicine:', error);
    throw error;
  }
};

// Update a medicine by ID
export const updateMedicine = async (id: number, medicineData: object) => {
  try {
    const response = await axiosInstance.put(`medicines/${id}/`, medicineData);
    return response.data;
  } catch (error) {
    console.error('Error updating medicine:', error);
    throw error;
  }
};

// Delete a medicine by ID
export const deleteMedicine = async (id: number) => {
  try {
    await axiosInstance.delete(`medicines/${id}/`);
  } catch (error) {
    console.error('Error deleting medicine:', error);
    throw error;
  }
};

//medicine count
export const getMedicinesCount = async () => {
  try {
    const response = await axiosInstance.get('api/medicines/count/');
    return response.data.count;
  } catch (error) {
    console.error('Error fetching medicines count:', error);
    return 0;
  }
};

//total stock value
export const getStockValue = async () => {
  try {
    const response = await axiosInstance.get('api/medicines/total-stock-value/');
    console.log('Stock Value Response:', response.data); 
    return response.data.total_stock_value || 0;
  } catch (error) {
    console.error('Error fetching stock value:', error);
    return 0;
  }
};

