import axios from 'axios';

// const BASE_URL = 'http://127.0.0.1:8000/api/auth';
const BASE_URL = 'https://hospital-m-s-backend.onrender.com/api/auth';

// Define types for requests and responses
export interface RegisterPharmacistRequest {
  email: string;
  password: string;
  name: string;
  specialization: string;
  phone: string;
  status: string;
  is_staff?: boolean;
  is_active?: boolean;
}

export interface LoginPharmacistRequest {
  email: string;
  password: string;
}

export interface PharmacistResponse {
  token: string; // Authentication token
  pharmacist_id: number;
  email: string;
  name: string;
  specialization: string;
  phone: string;
  status: string;
}

// Register a pharmacist
export const registerPharmacist = async (
  data: RegisterPharmacistRequest
): Promise<PharmacistResponse> => {
  try {
    const response = await axios.post(`${BASE_URL}/register/pharmacist/`, data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to register pharmacist');
  }
};

// Login a pharmacist
export const loginPharmacist = async (
  data: LoginPharmacistRequest
): Promise<{ token: string }> => {
  try {
    const response = await axios.post(`${BASE_URL}/login/pharmacist/`, data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to login pharmacist');
  }
};
