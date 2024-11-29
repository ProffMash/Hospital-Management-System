import axios from "axios";

// Define the type for Support Ticket
interface SupportTicket {
  ticketId: string;
  name: string;
  email: string;
  description: string;
  status: "Open" | "Closed";
}

// Define the base URL for the API
const BASE_URL = "http://localhost:8000/api"; // Replace with your backend API URL

// Function to fetch all support tickets
export const fetchSupportTickets = async (): Promise<SupportTicket[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/support-tickets/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching support tickets:", error);
    throw error;
  }
};

// Function to create a new support ticket
export const createSupportTicket = async (ticket: SupportTicket): Promise<SupportTicket> => {
  try {
    const response = await axios.post(`${BASE_URL}/support-tickets/`, ticket);
    return response.data;
  } catch (error) {
    console.error("Error creating support ticket:", error);
    throw error;
  }
};

// Function to update the status of a support ticket
export const updateSupportTicketStatus = async (
  ticketId: string,
  status: "Open" | "Closed"
): Promise<SupportTicket> => {
  try {
    const response = await axios.put(`${BASE_URL}/support-tickets/${ticketId}/`, {
      status,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating support ticket status:", error);
    throw error;
  }
};

// Function to delete a support ticket
export const deleteSupportTicket = async (ticketId: string): Promise<void> => {
  try {
    await axios.delete(`${BASE_URL}/support-tickets/${ticketId}/`);
  } catch (error) {
    console.error("Error deleting support ticket:", error);
    throw error;
  }
};
