import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { FaRegSave, FaTimes, FaPhone, FaEnvelope, FaStethoscope } from "react-icons/fa";

interface DoctorFormData {
  id: number;
  name: string;
  specialization: string;
  phone: string;
  email: string;
  status: string;
}

const EditDoctorForm: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const doctor = location.state?.doctor;

  const [formData, setFormData] = useState<DoctorFormData>({
    id: doctor?.id || 0,
    name: doctor?.name || "",
    specialization: doctor?.specialization || "",
    phone: doctor?.phone || "",
    email: doctor?.email || "",
    status: doctor?.status || "",
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true while updating
    try {
      const response = await axios.patch(
        `http://127.0.0.1:8000/api/doctors/${formData.id}/`,
        formData
      );

      if (response.status === 200) {
        alert("Doctor information updated successfully!");
        navigate("/admin/doctors"); // Redirect after update
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error("Error updating doctor:", err);
      setError("Failed to update doctor. Please check your input or try again later.");
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  if (!doctor) {
    return <div className="text-center py-10 text-lg text-red-500">Doctor data not available. Please try again later.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
        <FaStethoscope className="mr-2" /> Edit Doctor
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
          <label htmlFor="specialization" className="text-gray-700">Specialization:</label>
          <input
            type="text"
            id="specialization"
            name="specialization"
            value={formData.specialization}
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
                <svg className="w-5 h-5 text-white" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 1115.968-.62l3.645-1.368A10 10 0 10 12z"></path>
                </svg>
              </span>
            ) : (
              <FaRegSave className="mr-2" />
            )}
            Save Changes
          </button>
          <button
            type="button"
            onClick={() => navigate("/admin/doctors")}
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

export default EditDoctorForm;
