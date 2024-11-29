import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/', 
  headers: {
    'Content-Type': 'application/json',
  },
});

// API Functions
export const createDoctor = async (doctorData: {
  name: string;
  specialization: string;
  phone: string;
  email: string;
  status: string;
}) => {
  const response = await axiosInstance.post('doctors/', doctorData);
  return response.data;
};

export const getDoctors = async () => {
  const response = await axiosInstance.get('doctors/');
  return response.data;
};

export const updateDoctor = async (id: number, doctorData: object) => {
  const response = await axiosInstance.put(`doctors/${id}/`, doctorData);
  return response.data;
};

export const deleteDoctor = async (id: number) => {
  await axiosInstance.delete(`doctors/${id}/`);
};

// Get getDoctorsCount function using axiosInstance
export const getDoctorsCount = async () => {
  try {
    const response = await axiosInstance.get('doctors/count'); 
    return response.data.count; 
  } catch (error) {
    console.error('Error fetching doctors count:', error);
    return 0;
  }
};
