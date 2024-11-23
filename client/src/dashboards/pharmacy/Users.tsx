import React, { useState } from 'react';
import { FaUser, FaClipboardCheck, FaCheckCircle } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Users: React.FC = () => {
  const [usersData, setUsersData] = useState([
    {
      id: 1,
      name: 'John Doe',
      diagnosis: 'Hypertension',
      prescribedMedicine: 'Lisinopril 10mg',
      dosage: 'Once daily',
      nextCheckup: '12/12/2024',
    },
    {
      id: 2,
      name: 'Jane Smith',
      diagnosis: 'Type 2 Diabetes',
      prescribedMedicine: 'Metformin 500mg',
      dosage: 'Twice daily',
      nextCheckup: '15/12/2024',
    },
    {
      id: 3,
      name: 'Alice Johnson',
      diagnosis: 'Asthma',
      prescribedMedicine: ['Albuterol 100mg', 'Fluticasone 50mg'],
      dosage: 'As needed',
      nextCheckup: '20/12/2024',
    },
    {
      id: 4,
      name: 'Bob Brown',
      diagnosis: 'Hypercholesterolemia',
      prescribedMedicine: 'Atorvastatin 20mg',
      dosage: 'Once daily',
      nextCheckup: '25/12/2024',
    },
    {
      id: 5,
      name: 'Eve Wilson',
      diagnosis: 'Depression',
      prescribedMedicine: 'Sertraline 50mg',
      dosage: 'Once daily',
      nextCheckup: '30/12/2024',
    },
    {
      id: 6,
      name: 'Michael Lee',
      diagnosis: 'Acid Reflux',
      prescribedMedicine: 'Omeprazole 20mg',
      dosage: 'Once daily',
      nextCheckup: '05/01/2025',
    },

  ]);

  // remove a user from the list and show a toast notification
  const clearPatient = (id: number) => {
    setUsersData(usersData.filter((user) => user.id !== id));
    toast.success('Patient cleared successfully', { 
    position: 'top-right'
    });
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-blue-800 mb-6">Patients List</h1>
      <div className="overflow-hidden rounded-lg shadow-lg">
        <table className="w-full bg-white">
          <thead>
            <tr className="bg-blue-100 text-gray-700">
              <th className="p-4 text-left">ID</th>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Diagnosis</th>
              <th className="p-4 text-left">Prescribed Medicine</th>
              <th className="p-4 text-left">Dosage</th>
              <th className="p-4 text-left">Next Checkup</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {usersData.map((user) => (
              <tr key={user.id} className="hover:bg-blue-50 transition duration-150">
                <td className="p-4">{user.id}</td>
                <td className="p-4 flex items-center space-x-2">
                  <FaUser className="h-5 w-5 text-blue-500" />
                  <span>{user.name}</span>
                </td>
                <td className="p-4">{user.diagnosis}</td>
                <td className="p-4 flex items-center space-x-2">
                  <FaClipboardCheck className="h-5 w-5 text-green-500" />
                  <span>{user.prescribedMedicine}</span>
                </td>
                <td className="p-4">{user.dosage}</td>
                <td className="p-4">{user.nextCheckup}</td>
                <td className="p-4">
                  <button
                    onClick={() => clearPatient(user.id)}
                    className="flex items-center space-x-1 text-red-500 hover:text-red-700"
                  >
                    <FaCheckCircle className="h-5 w-5" />
                    <span>Clear</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Toast container */}
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} />
    </div>
  );
};

export default Users;
