// src/api/doctorProfiles.ts

import axios from 'axios';

// Define the URL for API calls (adjust the base URL as needed)
const API_URL = 'http://localhost:8000/api/doctorprofiles/';

// Fetch all doctor profiles
export const getDoctorProfiles = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching doctor profiles:", error);
    throw error;
  }
};

// Create a new doctor profile
export const createDoctorProfile = async (profileData: { doctor: number; address: string }) => {
  try {
    const response = await axios.post(API_URL, profileData);
    return response.data;
  } catch (error) {
    console.error("Error creating doctor profile:", error);
    throw error;
  }
};

// Update a doctor profile
export const updateDoctorProfile = async (id: number, profileData: { address: string }) => {
  try {
    const response = await axios.put(`${API_URL}${id}/`, profileData);
    return response.data;
  } catch (error) {
    console.error("Error updating doctor profile:", error);
    throw error;
  }
};

// Delete a doctor profile
export const deleteDoctorProfile = async (id: number) => {
  try {
    const response = await axios.delete(`${API_URL}${id}/`);
    return response.data;
  } catch (error) {
    console.error("Error deleting doctor profile:", error);
    throw error;
  }
};
