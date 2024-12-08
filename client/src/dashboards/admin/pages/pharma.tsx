import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getPharmacists, deletePharmacist } from "../../../api/pharmaApi";
import { FadeLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import toast styles

interface Pharmacist {
  id: number;
  name: string;
  specialization: string;
  phone: string;
  email: string;
  status: string;
}

const Pharmacists: React.FC = () => {
  const [pharmacists, setPharmacists] = useState<Pharmacist[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch pharmacists on component mount
  useEffect(() => {
    const fetchPharmacists = async () => {
      setLoading(true); // Start loading
      try {
        const data = await getPharmacists();
        setPharmacists(data);
      } catch (error) {
        console.error("Error fetching pharmacists:", error);
      } finally {
        setLoading(false); // Stop loading
      }
    };
    fetchPharmacists();
  }, []);

  // Handle deletion of a pharmacist
  const handleDelete = async (id: number) => {
    try {
      await deletePharmacist(id);
      setPharmacists((prev) => prev.filter((pharmacist) => pharmacist.id !== id)); // Update state after deletion
      // Show toast after deletion
      toast.success("Pharmacist deleted successfully", {
        position: "top-right",
        autoClose: 2000, 
      });
    } catch (error) {
      console.error("Error deleting pharmacist:", error);
      toast.error("Failed to delete pharmacist", {
        position: "top-right",
        autoClose: 2000, // Auto-close after 2 seconds
        hideProgressBar: true,
        closeOnClick: true,
      });
    }
  };

  // Handle search functionality
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredPharmacists = pharmacists.filter((pharmacist) =>
    pharmacist.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold text-blue-600">Manage Pharmacists</h1>
        <button
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700"
          onClick={() => navigate("/admin/add-pharmacist")}
        >
          Add Pharmacist
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
              {filteredPharmacists.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="p-4 text-center text-gray-500 italic"
                  >
                    No pharmacists found.
                  </td>
                </tr>
              ) : (
                filteredPharmacists.map((pharmacist) => (
                  <tr
                    key={pharmacist.id}
                    className="text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <td className="p-4">{pharmacist.id}</td>
                    <td className="p-4">{pharmacist.name}</td>
                    <td className="p-4">{pharmacist.specialization}</td>
                    <td className="p-4">{pharmacist.phone}</td>
                    <td className="p-4">{pharmacist.email}</td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          pharmacist.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {pharmacist.status}
                      </span>
                    </td>
                    <td className="p-4 flex items-center gap-3">
                      <button
                        className="text-blue-500 hover:text-blue-700"
                        onClick={() =>
                          navigate("/admin/edit-pharmacist", { state: { pharmacist } })
                        }
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleDelete(pharmacist.id)}
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

      <ToastContainer /> 
    </div>
  );
};

export default Pharmacists;
