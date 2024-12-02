import axios from "axios";
import { Contact } from "../dashboards/admin/pages/Contacts";

// Define the base URL for the API
const BASE_URL = "http://localhost:8000/api"; // Replace with your backend API URL

// Function to fetch all contacts
export const fetchContacts = async (): Promise<Contact[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/contacts/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching contacts:", error);
    throw error;
  }
};

// Function to delete a contact by contact_id
export const deleteContact = async (contact_id: number): Promise<void> => {
  try {
    await axios.delete(`${BASE_URL}/contacts/${contact_id}/`);  // Use contact_id instead of id
  } catch (error) {
    console.error("Error deleting contact:", error);
    throw error;
  }
};
