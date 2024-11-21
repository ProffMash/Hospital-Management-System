import React from "react";
import { FaSearch, FaUserPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Patients: React.FC = () => {
  const navigate = useNavigate();

  const patients = [
    {
      id: 1,
      name: "John Doe",
      specialization: "Cardiology",
      phone: "123-456-7890",
      email: "johndoe@example.com",
      status: "Admitted",
    },
    {
      id: 2,
      name: "Jane Smith",
      specialization: "Pediatrics",
      phone: "987-654-3210",
      email: "janesmith@example.com",
      status: "Discharged",
    },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-blue-600">Patients</h1>
        <button
          onClick={() => navigate("/admin/add-patient")}
          className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700"
        >
          <FaUserPlus className="mr-2" />
          Add Patient
        </button>
      </div>

      {/* Search Bar */}
      <div className="flex justify-between mb-6">
        <div className="relative flex items-center">
          <input
            type="text"
            placeholder="Search patients..."
            className="w-64 border border-gray-300 rounded-l-md shadow-sm px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <button className="absolute right-0 top-0 bottom-0 bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700">
            <FaSearch />
          </button>
        </div>
      </div>

      {/* Patients Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="w-full border-collapse">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="py-3 px-6 text-left font-semibold">Name</th>
              <th className="py-3 px-6 text-left font-semibold">Specialization</th>
              <th className="py-3 px-6 text-left font-semibold">Phone</th>
              <th className="py-3 px-6 text-left font-semibold">Email</th>
              <th className="py-3 px-6 text-left font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient, index) => (
              <tr
                key={patient.id}
                className={`${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-blue-50`}
              >
                <td className="py-3 px-6 text-gray-700">{patient.name}</td>
                <td className="py-3 px-6 text-gray-700">{patient.specialization}</td>
                <td className="py-3 px-6 text-gray-700">{patient.phone}</td>
                <td className="py-3 px-6 text-gray-700">{patient.email}</td>
                <td className="py-3 px-6 text-gray-700">{patient.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Patients;
