import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

interface SupportTicket {
  ticketId: string;
  name: string;
  email: string;
  description: string;
  createdAt: string;
}

const Support: React.FC = () => {

  const [searchQuery, setSearchQuery] = useState("");

  // Sample support tickets data
  const tickets: SupportTicket[] = [
    {
      ticketId: "T001",
      name: "Dr. John Doe",
      email: "john.doe@example.com",
      description: "I'm unable to view patient history in the system.",
      createdAt: "2024-11-15",
    },
    {
      ticketId: "T002",
      name: "Jane Doe (Patient)",
      email: "jane.doe@example.com",
      description: "I could not book an appointment for a consultation.",
      createdAt: "2024-11-12",
    },
    {
      ticketId: "T003",
      name: "Dr. Emily Smith",
      email: "emily.smith@example.com",
      description: "There is an error when trying to update patient details.",
      createdAt: "2024-11-14",
    },
  ];

  // Filtering tickets based on search query
  const filteredTickets = tickets.filter(
    (ticket) =>
      ticket.name.toLowerCase().includes(searchQuery.toLowerCase()) 
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

      {/* Support Ticket Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
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
            {filteredTickets.map((ticket, index) => (
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
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Support;
