import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://hospital-m-s-backend.onrender.com/api/', 
  // baseURL: 'http://127.0.0.1:8000/api/', 
  headers: {
    'Content-Type': 'application/json',
  },
});

export const createDoctor = async (doctorData: {
  name: string;
  specialization: string;
  phone: string;
  email: string;
  status: string;
}) => {
  try {
    const response = await axiosInstance.post('doctors/', doctorData);
    return response.data;
  } catch (error) {
    console.error('Error creating doctor:', error);
    throw error; 
  }
};

export const getDoctors = async () => {
  try {
    const response = await axiosInstance.get('doctors/');
    const mappedData = response.data.map((doctor: any) => ({
      id: doctor.doctor_id, 
      name: doctor.name,
      specialization: doctor.specialization,
      phone: doctor.phone,
      email: doctor.email,
      status: doctor.status,
    }));
    return mappedData;
  } catch (error) {
    console.error('Error fetching doctors:', error);
    throw error; 
  }
};

export const updateDoctor = async (id: number, doctorData: object) => {
  try {
    const response = await axiosInstance.put(`doctors/${id}/`, doctorData);
    return response.data;
  } catch (error) {
    console.error(`Error updating doctor with ID ${id}:`, error);
    throw error; 
  }
};


export const deleteDoctor = async (id: number) => {
  try {
    await axiosInstance.delete(`doctors/${id}/`);
  } catch (error) {
    console.error(`Error deleting doctor with ID ${id}:`, error);
    throw error; 
  }
};

export const getDoctorsCount = async () => {
  try {
    const response = await axiosInstance.get('doctors/count');
    return response.data.count; 
  } catch (error) {
    console.error('Error fetching doctors count:', error);
    return 0; 
  }
};