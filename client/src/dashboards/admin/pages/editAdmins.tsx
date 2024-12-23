import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaRegSave, FaTimes, FaPhone, FaEnvelope } from "react-icons/fa";
import { updateAdmin } from "../../../api/adminApi";

interface AdminFormData {
  admin_id: number;
  name: string;
  phone: string;
  email: string;
  status: string;
}

const EditAdminForm: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const admin = location.state?.admin;

  const [formData, setFormData] = useState<AdminFormData>({
    admin_id: admin?.admin_id || 0,
    name: admin?.name || "",
    phone: admin?.phone || "",
    email: admin?.email || "",
    status: admin?.status || "active",
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const validateForm = () => {
    const { name, phone, email, status} = formData;
    if (!name || !phone || !email || !status) {
      return "All fields are required!";
    }

    // Check if email is valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // simple email validation
    if (!email.match(emailRegex)) {
      return "Please enter a valid email address.";
    }

    return null; // no error
  };

  useEffect(() => {
    if (!admin) {
      setError("Admin data not available. Redirecting...");
      setTimeout(() => navigate("/admin/admins"), 3000); // Redirect after 3 seconds
    }
  }, [admin, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    try {
      await updateAdmin(formData.admin_id, formData);
      alert("Admin information updated successfully!");
      navigate("/admin/admins"); // Redirect after update
    } catch (err) {
      console.error("Error updating admin:", err);
      setError("Failed to update admin. Please check your input or try again later.");
    } finally {
      setLoading(false);
    }
  };

  if (!admin) {
    return (
      <div className="text-center py-10 text-lg text-red-500">
        {error || "Loading admin data..."}
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
        Edit Admin
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="name" className="text-gray-700">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 px-4 py-2 w-3/4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="phone" className="text-gray-700">Phone:</label>
          <div className="flex items-center border border-gray-300 rounded-lg w-3/4">
            <FaPhone className="ml-3 text-gray-500" />
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="mt-1 px-4 py-2 w-full rounded-r-lg focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
        </div>

        <div className="flex flex-col">
          <label htmlFor="email" className="text-gray-700">Email:</label>
          <div className="flex items-center border border-gray-300 rounded-lg w-3/4">
            <FaEnvelope className="ml-3 text-gray-500" />
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 px-4 py-2 w-full rounded-r-lg focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
        </div>

        <div className="flex flex-col">
          <label htmlFor="status" className="text-gray-700">Status:</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="mt-1 px-4 py-2 w-3/4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
            required
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <div className="flex justify-between items-center mt-6">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
          >
            {loading ? (
              <span className="animate-spin mr-2">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25"></circle>
                  <path
                    fill="currentColor"
                    className="opacity-75"
                    d="M12 2a10 10 0 100 20V2z"
                  ></path>
                </svg>
              </span>
            ) : (
              <FaRegSave className="mr-2" />
            )}
            Save Changes
          </button>
          <button
            type="button"
            onClick={() => navigate("/admin/admins")}
            className="flex items-center bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400"
          >
            <FaTimes className="mr-2" /> Cancel
          </button>
        </div>
      </form>
      {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
    </div>
  );
};

export default EditAdminForm;
