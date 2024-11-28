import React from "react";
import { useNavigate } from "react-router-dom";
import { MdEdit } from "react-icons/md";

interface Patient {
  id: string;
  name: string;
  age: number;
  phone: string;
  email: string;
  status: string;
}

const PatientsTable: React.FC = () => {
  const navigate = useNavigate();

  const patients: Patient[] = [
    {
      id: "1",
      name: "John Doe",
      age: 30,
      phone: "+123456789",
      email: "johndoe@example.com",
      status: "Active",
    },
    {
      id: "2",
      name: "Jane Smith",
      age: 45,
      phone: "+987654321",
      email: "janesmith@example.com",
      status: "Inactive",
    },
    // Add more patients as needed
  ];

  const handleEdit = (patient: Patient) => {
    navigate("/admin/edit-patient", { state: { patient } });
  };

  const handleAddPatient = () => {
    navigate("/admin/add-patient");
  };

  return (
    <div className="overflow-x-auto max-w-full">
      {/* Title: Manage Patients */}
      <h1 className="text-3xl font-extrabold text-blue-600">Manage Patients</h1>

      {/* Add Patient Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={handleAddPatient}
          className="bg-green-600 text-white py-2 px-6 rounded-md hover:bg-green-700 transition duration-150 ease-in-out"
        >
          Add Patient
        </button>
      </div>

      <table className="min-w-full table-auto bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="border-b px-6 py-3 text-left font-semibold text-sm">ID</th>
            <th className="border-b px-6 py-3 text-left font-semibold text-sm">Name</th>
            <th className="border-b px-6 py-3 text-left font-semibold text-sm">Age</th>
            <th className="border-b px-6 py-3 text-left font-semibold text-sm">Phone</th>
            <th className="border-b px-6 py-3 text-left font-semibold text-sm">Email</th>
            <th className="border-b px-6 py-3 text-left font-semibold text-sm">Status</th>
            <th className="border-b px-6 py-3 text-left font-semibold text-sm">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-600">
          {patients.map((patient) => (
            <tr key={patient.id} className="hover:bg-gray-50">
              <td className="border-b px-6 py-4">{patient.id}</td>
              <td className="border-b px-6 py-4">{patient.name}</td>
              <td className="border-b px-6 py-4">{patient.age}</td>
              <td className="border-b px-6 py-4">{patient.phone}</td>
              <td className="border-b px-6 py-4">{patient.email}</td>
              <td className="border-b px-6 py-4">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm ${patient.status === "Active" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}
                >
                  {patient.status}
                </span>
              </td>
              <td className="border-b px-6 py-4">
                <button
                  onClick={() => handleEdit(patient)}
                  className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition duration-150 ease-in-out"
                >
                  <MdEdit size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PatientsTable;
