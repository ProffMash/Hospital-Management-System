import React, { useState, useEffect } from 'react';
import { fetchSupportTickets, deleteSupportTicket } from '../../../api/SupportApi';
import type { Support } from '../../../api/SupportApi';
import { Search, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ITEMS_PER_PAGE = 5;

const Support: React.FC = () => {
  const [supports, setSupports] = useState<Support[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isSorted, setIsSorted] = useState(false);

  useEffect(() => {
    const loadSupports = async () => {
      try {
        const data = await fetchSupportTickets();
        setSupports(data);
      } catch (error) {
        console.error('Error loading support tickets:', error);
      }
    };

    loadSupports();
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this support ticket?')) {
      try {
        await deleteSupportTicket(id);
        setSupports(supports.filter((support) => support.support_id !== id));
        toast.success('Support ticket deleted successfully', {
          position: 'top-right',
          autoClose: 2000, 
        });
      } catch (error) {
        console.error('Error deleting support ticket:', error);
        toast.error('Failed to delete support ticket', {
          position: 'top-right',
          autoClose: 2000, 
        });
      }
    }
  };

  const handleSort = () => {
    const sorted = [...supports].sort((a, b) =>
      isSorted
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );
    setSupports(sorted);
    setIsSorted(!isSorted);
  };

  const filteredSupports = supports.filter(
    (support) =>
      support.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      support.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      support.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredSupports.length / ITEMS_PER_PAGE);
  const paginatedSupports = filteredSupports.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-blue-600 mb-4">Support Tickets</h1>

      {/* Search Bar */}
      <div className="flex items-center bg-white p-3 rounded shadow-md mb-4 w-1/3">
        <Search className="h-6 w-6 text-gray-500 mr-2" />
        <input
          type="text"
          placeholder="Search by name, email, or description"
          className="flex-grow outline-none bg-transparent"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Sort Button */}
      <div className="flex justify-end mb-4">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded shadow-md hover:bg-blue-700"
          onClick={handleSort}
        >
          Sort by Name
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="py-3 px-4 text-left">TICKET ID</th>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Description</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedSupports.length > 0 ? (
              paginatedSupports.map((support) => (
                <tr
                  key={support.support_id}
                  className="border-b hover:bg-gray-100"
                >
                  <td className="py-3 px-4">{support.support_id}</td>
                  <td className="py-3 px-4">{support.name}</td>
                  <td className="py-3 px-4">{support.email}</td>
                  <td className="py-3 px-4">{support.description}</td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => handleDelete(support.support_id!)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="h-6 w-6 inline" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="py-3 px-4 text-center text-gray-500"
                >
                  No support tickets found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded shadow-md ${
            currentPage === 1
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          <ChevronLeft className="inline h-5 w-5" />
          Prev
        </button>

        <p>
          Page {currentPage} of {totalPages}
        </p>

        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded shadow-md ${
            currentPage === totalPages
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          Next
          <ChevronRight className="inline h-5 w-5" />
        </button>
      </div>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default Support;
