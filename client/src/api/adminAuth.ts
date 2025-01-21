import axios from 'axios';

const BASE_URL = 'https://hospital-m-s-backend.onrender.com/api/auth';
// const BASE_URL = 'http://127.0.0.1:8000/api/auth';

// Define types for requests and responses
export interface RegisterAdminRequest {
  email: string;
  password: string;
  name: string;
  phone: string;
  status: string;
  is_staff?: boolean;
  is_active?: boolean;
}

export interface LoginAdminRequest {
  email: string;
  password: string;
}

export interface AdminResponse {
  token: string; // Authentication token
  admin_id: number;
  email: string;
  name: string;
  phone: string;
  status: string;
}

// Register an admin
export const registerAdmin = async (
  data: RegisterAdminRequest
): Promise<AdminResponse> => {
  try {
    const response = await axios.post(`${BASE_URL}/register/admin/`, data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to register admin');
  }
};

// Login an admin
export const loginAdmin = async (
  data: LoginAdminRequest
): Promise<{ token: string }> => {
  try {
    const response = await axios.post(`${BASE_URL}/login/admin/`, data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to login admin');
  }
};
