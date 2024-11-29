import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { FadeLoader } from "react-spinners";
import { fetchSupportTickets } from "../../../api/supportTicketsApi";

export interface SupportTicket {
  ticketId: string;
  name: string;
  email: string;
  description: string;
  createdAt: string; // Ensure that createdAt is always included
}

const Support: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  // Fetch support tickets from the API
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const fetchedTickets = await fetchSupportTickets();
        setTickets(fetchedTickets);
      } catch (err) {
        setError("Failed to fetch tickets.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  // Filter tickets based on search query
  const filteredTickets = tickets.filter(
    (ticket) =>
      ticket.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.ticketId.toLowerCase().includes(searchQuery.toLowerCase()) // Added filtering by ticket ID as well
  );

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
          {/* Support Ticket Table */}
          <table className="w-full border-collapse">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="py-3 px-6 text-left font-semibold">Ticket ID</th>
                <th className="py-3 px-6 text-left font-semibold">Name</th>
                <th className="py-3 px-6 text-left font-semibold">Email</th>
                <th className="py-3 px-6 text-left font-semibold">Description</th>
                <th className="py-3 px-6 text-left font-semibold">Created At</th>
              </tr>
            </thead>
            <tbody>
              {filteredTickets.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-3 px-6 text-center text-gray-500">
                    No tickets found.
                  </td>
                </tr>
              ) : (
                filteredTickets.map((ticket, index) => (
                  <tr
                    key={ticket.ticketId}
                    className={`${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } hover:bg-blue-50`}
                  >
                    <td className="py-3 px-6 text-gray-700">{ticket.ticketId}</td>
                    <td className="py-3 px-6 text-gray-700">{ticket.name}</td>
                    <td className="py-3 px-6 text-gray-700">{ticket.email}</td>
                    <td className="py-3 px-6 text-gray-700">{ticket.description}</td>
                    <td className="py-3 px-6 text-gray-700">{ticket.createdAt}</td>
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