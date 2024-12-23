import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/', 
  headers: {
    'Content-Type': 'application/json',
  },
});

export const createAdmin = async (adminData: {
  name: string;
  email: string;
  phone: string;
  status: string;
  password: string;
}) => {
  try {
    const response = await axiosInstance.post('admins/', adminData);
    return response.data;
  } catch (error) {
    console.error('Error creating admin:', error);
    throw error; 
  }
};

export const getAdmins = async () => {
    try {
      const response = await axiosInstance.get('admins/');
      const mappedData = response.data.map((admin: any) => ({
        admin_id: admin.admin_id, 
        name: admin.name,
        email: admin.email,
        phone: admin.phone,
        status: admin.status,
      }));
      return mappedData;
    } catch (error) {
      console.error('Error fetching admins:', error);
      throw error;
    }
  };

export const updateAdmin = async (id: number, adminData: {
  name?: string;
  email?: string;
  phone?: string;
  status?: string;
}) => {
  try {
    const response = await axiosInstance.put(`admins/${id}/`, adminData);
    return response.data;
  } catch (error) {
    console.error(`Error updating admin with ID ${id}:`, error);
    throw error; 
  }
};

export const deleteAdmin = async (id: number) => {
  try {
    await axiosInstance.delete(`admins/${id}/`);
  } catch (error) {
    console.error(`Error deleting admin with ID ${id}:`, error);
    throw error; 
  }
};

export const getAdminsCount = async () => {
  try {
    const response = await axiosInstance.get('admins/count');
    return response.data.count; 
  } catch (error) {
    console.error('Error fetching admins count:', error);
    return 0; 
  }
};
