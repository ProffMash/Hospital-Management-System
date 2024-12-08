import React, { useEffect, useState } from 'react';
import { getContacts, deleteContact, Contact } from '../../../api/contactApi';
import { FaTrash } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';

const Contacts: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(5);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const data = await getContacts();
      setContacts(data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      try {
        await deleteContact(id);
        setContacts((prev) => prev.filter((contact) => contact.contact_id !== id));
        toast.success('Contact deleted successfully!', { autoClose: 2000 }); 
      } catch (error) {
        console.error('Error deleting contact:', error);
        toast.error('Error deleting contact!', { autoClose: 2000 }); 
      }
    }
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentContacts = contacts.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(contacts.length / itemsPerPage);

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">Patient Contacts</h1>
      {loading ? (
        <p className="text-center text-gray-600">Loading contacts...</p>
      ) : (
        <>
          <div className="overflow-x-auto shadow-md rounded-lg">
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr className="bg-blue-700 text-white">
                  <th className="text-left px-4 py-2 font-semibold">Name</th>
                  <th className="text-left px-4 py-2 font-semibold">Email</th>
                  <th className="text-left px-4 py-2 font-semibold">Message</th>
                  <th className="text-center px-4 py-2 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentContacts.map((contact) => (
                  <tr key={contact.contact_id} className="hover:bg-gray-100">
                    <td className="border border-gray-300 px-4 py-2">{contact.name}</td>
                    <td className="border border-gray-300 px-4 py-2">{contact.email}</td>
                    <td className="border border-gray-300 px-4 py-2">{contact.message}</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      <button
                        onClick={() => handleDelete(contact.contact_id!)}
                        className="text-red-500 hover:text-red-600"
                        aria-label="Delete"
                      >
                        <FaTrash size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between items-center mt-4">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-300"
            >
              Previous
            </button>
            <span className="text-gray-700 font-semibold">
              Page {currentPage} of {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-300"
            >
              Next
            </button>
          </div>
        </>
      )}
      {/* Toast container */}
      <ToastContainer />
    </div>
  );
};

export default Contacts;
