import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/api/auth';

// Define types for requests and responses
export interface RegisterDoctorRequest {
  email: string;
  password: string;
  name: string;
  specialization: string;
  phone: string | number;
  status: string;
  is_staff?: boolean;
  is_active?: boolean;
}

export interface LoginDoctorRequest {
  email: string;
  password: string;
}

export interface DoctorResponse {
  token: string; // Auth token
  doctor_id: number;
  email: string;
  name: string;
  specialization: string;
  phone: string;
  status: string;
}

// Register a doctor
export const registerDoctor = async (
  data: RegisterDoctorRequest
): Promise<DoctorResponse> => {
  try {
    const response = await axios.post(`${BASE_URL}/register/doctor/`, data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to register doctor');
  }
};

// Login a doctor
export const loginDoctor = async (
  data: LoginDoctorRequest
): Promise<{ token: string }> => {
  try {
    const response = await axios.post(`${BASE_URL}/login/doctor/`, data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to login doctor');
  }
};
