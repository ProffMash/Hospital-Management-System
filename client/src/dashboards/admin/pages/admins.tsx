import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getAdmins, deleteAdmin } from "../../../api/adminApi";
import { FadeLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Admin Type
interface Admin {
  admin_id: number; 
  name: string;
  phone: string;
  email: string;
  status: string;
}

const Admins: React.FC = () => {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch all admins on component mount
  useEffect(() => {
    const fetchAdmins = async () => {
      setLoading(true);
      try {
        const data = await getAdmins(); // Fetch admins using API
        setAdmins(data); // Set the fetched data in the state
      } catch (error: any) {
        console.error("Error fetching admins:", error);
        toast.error("Failed to fetch admins.", {
          position: "top-right",
          autoClose: 2000,
        });
      } finally {
        setLoading(false);
      }
    };
    fetchAdmins();
  }, []); // Runs once when the component mounts

  // Handle admin deletion
  const handleDelete = async (admin_id: number) => {
    try {
      await deleteAdmin(admin_id); 
      setAdmins((prev) => prev.filter((admin) => admin.admin_id !== admin_id)); // Update the state by removing the deleted admin
      toast.success("Admin deleted successfully!", {
        position: "top-right",
        autoClose: 2000,
      });
    } catch (error: any) {
      console.error("Error deleting admin:", error);
      toast.error("Failed to delete admin.", {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  // Handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Filtered admins based on search term
  const filteredAdmins = admins.filter((admin) =>
    admin.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <ToastContainer />
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold text-blue-600">Manage Admins</h1>
        <button
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700"
          onClick={() => navigate("/admin/add-admin")}
        >
          Add Admin
        </button>
      </div>

      {/* Search Input */}
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
                <th className="p-4">Admin ID</th>
                <th className="p-4">Name</th>
                <th className="p-4">Phone</th>
                <th className="p-4">Email</th>
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAdmins.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="p-4 text-center text-gray-500 italic"
                  >
                    No admins found.
                  </td>
                </tr>
              ) : (
                filteredAdmins.map((admin) => (
                  <tr
                    key={admin.admin_id}
                    className="text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <td className="p-4">{admin.admin_id}</td>
                    <td className="p-4">{admin.name}</td>
                    <td className="p-4">{admin.phone}</td>
                    <td className="p-4">{admin.email}</td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          admin.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {admin.status}
                      </span>
                    </td>
                    <td className="p-4 flex items-center gap-3">
                      <button
                        className="text-blue-500 hover:text-blue-700"
                        onClick={() =>
                          navigate("/admin/edit-admin", { state: { admin } })
                        }
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleDelete(admin.admin_id)}
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

export default Admins;
