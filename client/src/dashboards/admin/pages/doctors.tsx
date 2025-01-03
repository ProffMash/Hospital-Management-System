import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getDoctors, deleteDoctor } from "../../../api/doctorApi";
import { FadeLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Doctor {
  id: number;
  name: string;
  specialization: string;
  phone: string;
  email: string;
  status: string;
}

const Doctors: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch doctors on component mount
  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    setLoading(true);
    try {
      const data = await getDoctors();
      setDoctors(data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle deletion of a doctor
  const handleDelete = async (id: number) => {
    try {
      await deleteDoctor(id);
      setDoctors((prev) => prev.filter((doctor) => doctor.id !== id));

      toast.success("Doctor deleted successfully!", {
        position: "top-right",
        autoClose: 2000,
      });
    } catch (error) {
      console.error("Error deleting doctor:", error);
      toast.error("Error deleting doctor.", {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  // Handle search functionality
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredDoctors = doctors.filter((doctor) =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      {/* Toast Container */}
      <ToastContainer />

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold text-blue-600">Manage Doctors</h1>
        <button
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700"
          onClick={() => navigate("/admin/add-doctor")}
        >
          Add Doctor
        </button>
      </div>

      <div className="flex items-center bg-white shadow rounded-lg p-2 mb-6 w-2/3 md:w-1/3">
        <FaSearch className="text-gray-400 mr-3" />
        <input
          type="text"
          placeholder="Search by name..."
          className="flex-1 outline-none text-gray-600"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <FadeLoader color="#1D4ED8" />
        </div>
      ) : (
        <div className="bg-white shadow rounded-lg p-6">
          <table className="w-full text-left">
            <thead>
              <tr className="text-sm font-semibold text-gray-600 border-b">
                <th className="p-4">ID</th>
                <th className="p-4">Name</th>
                <th className="p-4">Specialization</th>
                <th className="p-4">Phone</th>
                <th className="p-4">Email</th>
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDoctors.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="p-4 text-center text-gray-500 italic"
                  >
                    No doctors found.
                  </td>
                </tr>
              ) : (
                filteredDoctors.map((doctor) => (
                  <tr
                    key={doctor.id}
                    className="text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <td className="p-4">{doctor.id}</td>
                    <td className="p-4">{doctor.name}</td>
                    <td className="p-4">{doctor.specialization}</td>
                    <td className="p-4">{doctor.phone}</td>
                    <td className="p-4">{doctor.email}</td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          doctor.status.toLowerCase() === "active"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {doctor.status}
                      </span>
                    </td>
                    <td className="p-4 flex items-center gap-3">
                      <button
                        className="text-blue-500 hover:text-blue-700"
                        onClick={() =>
                          navigate("/admin/edit-doctor", {
                            state: { doctor },
                          })
                        }
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
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Doctors;
