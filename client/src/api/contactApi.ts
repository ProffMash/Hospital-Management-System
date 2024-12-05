import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/api/contacts/';

export interface Contact {
  contact_id?: number; 
  name: string;
  email: string;
  message: string;
}

// Function to get all contacts
export const getContacts = async (): Promise<Contact[]> => {
  const response = await axios.get<Contact[]>(BASE_URL);
  return response.data;
};

// Function to get a specific contact by ID
export const getContactById = async (id: number): Promise<Contact> => {
  const response = await axios.get<Contact>(`${BASE_URL}${id}/`);
  return response.data;
};

// Function to create a new contact
export const createContact = async (contact: Omit<Contact, 'contact_id'>): Promise<Contact> => {
  const response = await axios.post<Contact>(BASE_URL, contact);
  return response.data;
};

// Function to update an existing contact by ID
export const updateContact = async (id: number, contact: Partial<Contact>): Promise<Contact> => {
  const response = await axios.put<Contact>(`${BASE_URL}${id}/`, contact);
  return response.data;
};

// Function to delete a contact by ID
export const deleteContact = async (id: number): Promise<void> => {
  await axios.delete(`${BASE_URL}${id}/`);
};
