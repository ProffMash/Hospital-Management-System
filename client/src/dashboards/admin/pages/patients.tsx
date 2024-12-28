import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdEdit, MdDelete } from "react-icons/md";
import { getPatients, deletePatient } from "../../../api/patientApi";
import { FadeLoader } from "react-spinners";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Patient {
  id: number;
  name: string;
  age: number;
  phone: string;
  email: string;
  status: string;
}

const PatientsTable: React.FC = () => {
  const navigate = useNavigate();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const patientsPerPage = 5;

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        setLoading(true);
        const response = await getPatients();
        const mappedPatients = response.map((patient: any) => ({
          id: patient.patient_id,
          name: patient.name,
          age: patient.age,
          phone: patient.phone,
          email: patient.email,
          status: patient.status,
        }));
        setPatients(mappedPatients);
      } catch (error) {
        console.error("Error fetching patients:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  // Filter patients based on search term
  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Paginate filtered patients
  const indexOfLastPatient = currentPage * patientsPerPage;
  const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
  const currentPatients = filteredPatients.slice(indexOfFirstPatient, indexOfLastPatient);

  const totalPages = Math.ceil(filteredPatients.length / patientsPerPage);

  // Handle deletion with toast notification
  const handleDelete = async (id: number) => {
    try {
      await deletePatient(id);
      setPatients(patients.filter((patient) => patient.id !== id)); // Remove deleted patient from state
      toast.success("Patient deleted successfully", {
        position: "top-right",
        autoClose: 2000, // Auto close after 2 seconds
      });
    } catch (error) {
      console.error("Error deleting patient:", error);
      toast.error("Error deleting patient", {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  const handleEdit = (patient: Patient) => {
    navigate("/admin/edit-patient", { state: { patient } });
  };

  const handleAddPatient = () => {
    navigate("/admin/add-patient");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <FadeLoader height={15} width={5} color="#4A90E2" loading={loading} />
      </div>
    );
  }

  return (
    <div className="overflow-x-auto max-w-full">
      <h1 className="text-3xl font-extrabold text-blue-600">Manage Patients</h1>

      <div className="flex justify-between items-center mb-4 mt-4">
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-md px-4 py-2"
        />

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
          {currentPatients.map((patient) => (
            <tr key={patient.id} className="hover:bg-gray-50">
              <td className="border-b px-6 py-4">{patient.id}</td>
              <td className="border-b px-6 py-4">{patient.name}</td>
              <td className="border-b px-6 py-4">{patient.age}</td>
              <td className="border-b px-6 py-4">{patient.phone}</td>
              <td className="border-b px-6 py-4">{patient.email}</td>
              <td className="border-b px-6 py-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    patient.status.toLowerCase() === "admitted"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
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
                <button
                  onClick={() => handleDelete(patient.id)}
                  className="bg-red-600 text-white p-2 ml-2 rounded-md hover:bg-red-700 transition duration-150 ease-in-out"
                >
                  <MdDelete size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-6">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-l-md hover:bg-gray-400 disabled:opacity-50"
        >
          Prev
        </button>
        <span className="px-4 py-2 text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-r-md hover:bg-gray-400 disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default PatientsTable;
