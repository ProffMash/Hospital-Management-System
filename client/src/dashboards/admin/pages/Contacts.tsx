import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { FadeLoader } from "react-spinners";
import { fetchContacts, deleteContact } from "../../../api/ContactApi";

// Define the type for Contact (matching the server response)
export interface Contact {
  contact_id: number;  // Change id to contact_id to match the model
  name: string;
  email: string;
  message: string;
}

const Support: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  // Fetch contacts from the API
  useEffect(() => {
    const fetchContactsData = async () => {
      try {
        const fetchedContacts = await fetchContacts();
        setContacts(fetchedContacts);
      } catch (err) {
        setError("Failed to fetch contacts.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchContactsData();
  }, []);

  // Filter contacts based on search query (search by name or email)
  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Delete a contact by its contact_id
  const handleDelete = async (contact_id: number) => {
    try {
      await deleteContact(contact_id);  // Call the delete function from the API
      setContacts(contacts.filter((contact) => contact.contact_id !== contact_id)); // Remove the contact from the list
    } catch (err) {
      setError("Failed to delete contact.");
      console.error(err);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-extrabold text-blue-600">Support Tickets</h1>
      </div>

      {/* Search Bar */}
      <div className="flex justify-between mb-6">
        <div className="relative flex items-center">
          <input
            type="text"
            placeholder="Search tickets..."
            className="w-64 border border-gray-300 rounded-l-md shadow-sm px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="absolute right-0 top-0 bottom-0 bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700">
            <FaSearch />
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && <div className="text-red-600 mb-4">{error}</div>}

      {/* Loading Indicator */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <FadeLoader color="blue" />
        </div>
      ) : (
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          {/* Contact Table */}
          <table className="w-full border-collapse">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="py-3 px-6 text-left font-semibold">Name</th>
                <th className="py-3 px-6 text-left font-semibold">Email</th>
                <th className="py-3 px-6 text-left font-semibold">Message</th>
                <th className="py-3 px-6 text-left font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredContacts.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-3 px-6 text-center text-gray-500">
                    No tickets found.
                  </td>
                </tr>
              ) : (
                filteredContacts.map((contact, index) => (
                  <tr
                    key={contact.contact_id}  // Use contact_id as the key
                    className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-blue-50`}
                  >
                    <td className="py-3 px-6 text-gray-700">{contact.name}</td>
                    <td className="py-3 px-6 text-gray-700">{contact.email}</td>
                    <td className="py-3 px-6 text-gray-700">{contact.message}</td>
                    <td className="py-3 px-6 text-gray-700">
                      <button
                        onClick={() => handleDelete(contact.contact_id)}  // Pass contact_id for deletion
                        className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Support;
