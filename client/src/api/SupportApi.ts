import axios from 'axios';

// Base URL of the API
const API_BASE_URL = 'http://127.0.0.1:8000/api/supports/';

// Support Model Interface
export interface Support {
  support_id?: number; // Optional for new entries
  name: string;
  email: string;
  description: string;
}

// Fetch all support tickets
export const fetchSupportTickets = async (): Promise<Support[]> => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching support tickets:', error);
    throw error;
  }
};

export const createReport = async (reportData: { name: string; subject: string; message: string }) => {
  const response = await fetch('http://127.0.0.1:8000/api/reports/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(reportData),
  });

  if (!response.ok) {
    throw new Error('Failed to create report');
  }

  return response.json();
};


// Fetch a single support ticket by ID
export const fetchSupportTicketById = async (id: number): Promise<Support> => {
  try {
    const response = await axios.get(`${API_BASE_URL}${id}/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching support ticket:', error);
    throw error;
  }
};

// Update a support ticket
export const updateSupportTicket = async (id: number, data: Support): Promise<Support> => {
  try {
    const response = await axios.put(`${API_BASE_URL}${id}/`, data);
    return response.data;
  } catch (error) {
    console.error('Error updating support ticket:', error);
    throw error;
  }
};

// Delete a support ticket
export const deleteSupportTicket = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${API_BASE_URL}${id}/`);
  } catch (error) {
    console.error('Error deleting support ticket:', error);
    throw error;
  }
};
