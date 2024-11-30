import React, { useState, useEffect } from 'react';
import { FaUser, FaClipboardCheck, FaCheckCircle } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getDiagnoses, deleteDiagnosis } from '../../api/diagnosisApi';

const Users: React.FC = () => {
  const [usersData, setUsersData] = useState<any[]>([]); 

  useEffect(() => {
    const fetchDiagnoses = async () => {
      try {
        const data = await getDiagnoses();
        setUsersData(data);
      } catch (error) {
        console.error('Error fetching diagnoses:', error);
      }
    };
    fetchDiagnoses();
  }, []); 

  // Clear a patient from the list (remove from the state) and show a toast notification
  const clearPatient = async (id: number) => {
    try {
      await deleteDiagnosis(id); // Delete diagnosis from the backend
      setUsersData(usersData.filter((user) => user.id !== id)); // Update state to remove patient
      toast.success('Patient cleared successfully', { position: 'top-right' });
    } catch (error) {
      toast.error('Failed to clear patient', { position: 'top-right' });
    }
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
                  <span>{user.patient_name}</span> {/* Display patient_name directly */}
                </td>
                <td className="p-4">{user.diagnosis}</td>
                <td className="p-4 flex items-center space-x-2">
                  <FaClipboardCheck className="h-5 w-5 text-green-500" />
                  <span>{user.prescribed_medicine}</span>
                </td>
                <td className="p-4">{user.dosage}</td>
                <td className="p-4">{user.next_checkup}</td>
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
