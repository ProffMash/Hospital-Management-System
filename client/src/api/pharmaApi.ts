import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/', 
  headers: {
    'Content-Type': 'application/json',
  },
});

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
    const mappedData = response.data.map((pharmacist: any) => ({
      id: pharmacist.pharmacist_id, 
      name: pharmacist.name,
      specialization: pharmacist.specialization,
      phone: pharmacist.phone,
      email: pharmacist.email,
      status: pharmacist.status,
    }));
    return mappedData;
  } catch (error) {
    console.error('Error fetching pharmacists:', error);
    throw error; 
  }
};

export const updatePharmacist = async (id: number, pharmacistData: {
  name: string;
  specialization: string;
  phone: string;
  email: string;
  status: string;
}) => {
  try {
    const response = await axiosInstance.put(`pharmacists/${id}/`, pharmacistData);
    return response.data;
  } catch (error) {
    console.error(`Error updating pharmacist with ID ${id}:`, error);
    throw error; 
  }
};

export const deletePharmacist = async (id: number) => {
  try {
    await axiosInstance.delete(`pharmacists/${id}/`);
  } catch (error) {
    console.error(`Error deleting pharmacist with ID ${id}:`, error);
    throw error; 
  }
};

export const getPharmacistsCount = async () => {
  try {
    const response = await axiosInstance.get('pharmacists/count');
    return response.data.count; 
  } catch (error) {
    console.error('Error fetching pharmacists count:', error);
    return 0; 
  }
};
