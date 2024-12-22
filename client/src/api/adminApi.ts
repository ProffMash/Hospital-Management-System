import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/api/admins';

//Admin Type
interface Admin {
    admin_id: number;
    name: string;
    role: string;
    phone: string;
    email: string;
    status: string;
  }

// Fetch all admins
export const getAdmins = async (): Promise<Admin[]> => {
    try {
        const response = await axios.get(`${BASE_URL}/`);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Failed to fetch admins');
    }
};

// Delete an admin
export const deleteAdmin = async (id: number): Promise<void> => {
    try {
        await axios.delete(`${BASE_URL}/${id}/`);
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Failed to delete admin');
    }
};

// Update an admin
export const updateAdmin = async (id: number, data: Admin): Promise<Admin> => {
    try {
        const response = await axios.put(`${BASE_URL}/${id}/`, data);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Failed to update admin');
    }
};