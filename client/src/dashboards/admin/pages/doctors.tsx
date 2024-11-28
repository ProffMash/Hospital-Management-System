import React, { useState } from "react";
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Doctors: React.FC = () => {
  const [doctors, setDoctors] = useState([
    {
      id: 1,
      name: "Dr. John Doe",
      specialization: "Cardiologist",
      phone: "+1 234 567 890",
      email: "johndoe@example.com",
      status: "Active",
    },
    {
      id: 2,
      name: "Dr. Jane Smith",
      specialization: "Dermatologist",
      phone: "+1 987 654 321",
      email: "janesmith@example.com",
      status: "Active",
    },
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleDelete = (id: number) => {
    setDoctors((prev) => prev.filter((doctor) => doctor.id !== id));
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredDoctors = doctors.filter((doctor) =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold text-blue-600">Manage Doctors</h1>
        <button
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700"
          onClick={() => navigate("/admin/add-doctor")}
        >
          Add Doctor
        </button>
      </div>

      {/* Search Bar */}
      <div className="flex items-center bg-white shadow rounded-lg p-2 mb-6 w-2/3 md:w-1/3">
        <FaSearch className="text-gray-400 mr-3" />
        <input
          type="text"
          placeholder="Search..."
          className="flex-1 outline-none text-gray-600"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      {/* Doctors Table */}
      <div className="bg-white shadow rounded-lg p-6">
        <table className="w-full text-left">
          <thead>
            <tr className="text-sm font-semibold text-gray-600 border-b">
              <th className="p-4">Name</th>
              <th className="p-4">Specialization</th>
              <th className="p-4">Phone</th>
              <th className="p-4">Email</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredDoctors.map((doctor) => (
              <tr
                key={doctor.id}
                className="text-sm text-gray-700 hover:bg-gray-50"
              >
                <td className="p-4">{doctor.name}</td>
                <td className="p-4">{doctor.specialization}</td>
                <td className="p-4">{doctor.phone}</td>
                <td className="p-4">{doctor.email}</td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      doctor.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {doctor.status}
                  </span>
                </td>
                <td className="p-4 flex items-center gap-3">
                  <button
                    className="text-blue-500 hover:text-blue-700"
                    onClick={() => navigate("/admin/edit-doctor", { state: { doctor } })}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDelete(doctor.id)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
            {filteredDoctors.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="p-4 text-center text-gray-500 italic"
                >
                  No doctors found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Doctors;
