import React from "react";
import { useNavigate } from "react-router-dom"; 
import { MdEdit } from "react-icons/md"; 

interface Patient {
  id: string;
  name: string;
  specialization: string;
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
      specialization: "Cardiology",
      phone: "+123456789",
      email: "johndoe@example.com",
      status: "Active",
    },
    {
      id: "2",
      name: "Jane Smith",
      specialization: "Neurology",
      phone: "+987654321",
      email: "janesmith@example.com",
      status: "Inactive",
    },
  
  ];

  const handleEdit = (patient: Patient) => {
    // Store the patient in the state or context and navigate to the edit page
    navigate("/admin/edit-patient", { state: { patient } }); // Passing patient data through state
  };

  return (
    <div className="overflow-x-auto max-w-full">
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Specialization</th>
            <th className="border px-4 py-2">Phone</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <tr key={patient.id}>
              <td className="border px-4 py-2">{patient.name}</td>
              <td className="border px-4 py-2">{patient.specialization}</td>
              <td className="border px-4 py-2">{patient.phone}</td>
              <td className="border px-4 py-2">{patient.email}</td>
              <td className="border px-4 py-2">{patient.status}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleEdit(patient)} // Pass the patient to the edit handler
                  className="bg-blue-600 text-white py-1 px-4 rounded-md hover:bg-blue-700 transition"
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
