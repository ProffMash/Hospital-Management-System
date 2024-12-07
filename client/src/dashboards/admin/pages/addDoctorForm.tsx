import React, { useState } from "react";
import {
  FaUserMd,
  FaBriefcaseMedical,
  FaPhone,
  FaEnvelope,
  FaArrowLeft,
  FaCheckCircle,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { registerDoctor } from "../../../api/doctorAuth";

const AddDoctorForm: React.FC = () => {
  const navigate = useNavigate();

  const [doctorData, setDoctorData] = useState({
    name: "",
    specialization: "",
    phone: "",
    email: "",
    password: "", 
    status: "",
    is_staff: true, // Default values for is_staff and is_active
    is_active: true,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setDoctorData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null); // Reset error before submitting

    try {
      await registerDoctor(doctorData);
      alert("Doctor registered successfully!");
      navigate("/admin/doctors");
    } catch (err: any) {
      setError("Failed to register doctor. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen flex items-center justify-center">
      <div className="relative w-full max-w-lg bg-white shadow-lg rounded-lg p-8">
        {/* Back Button */}
        <button
          onClick={() => navigate("/admin/doctors")}
          className="absolute top-4 left-4 text-gray-600 hover:text-blue-600 flex items-center gap-1"
        >
          <FaArrowLeft className="text-xl" />
          <span className="font-medium">Back</span>
        </button>

        <h1 className="text-2xl font-bold text-blue-600 mb-6 text-center">
          Add New Doctor
        </h1>

        {/* Error message */}
        {error && (
          <div className="text-red-500 text-center mb-4">{error}</div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-1 flex items-center gap-2">
              <FaUserMd className="text-blue-500" />
              Name
            </label>
            <input
              type="text"
              name="name"
              value={doctorData.name}
              onChange={handleInputChange}
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 px-3 py-2"
              placeholder="Doctor's name"
              required
            />
          </div>

          {/* Specialization */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-1 flex items-center gap-2">
              <FaBriefcaseMedical className="text-blue-500" />
              Specialization
            </label>
            <input
              type="text"
              name="specialization"
              value={doctorData.specialization}
              onChange={handleInputChange}
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 px-3 py-2"
              placeholder="Specialization"
              required
            />
          </div>

          {/* Phone */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-1 flex items-center gap-2">
              <FaPhone className="text-blue-500" />
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              value={doctorData.phone}
              onChange={handleInputChange}
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 px-3 py-2"
              placeholder="Phone number"
              required
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-1 flex items-center gap-2">
              <FaEnvelope className="text-blue-500" />
              Email
            </label>
            <input
              type="email"
              name="email"
              value={doctorData.email}
              onChange={handleInputChange}
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 px-3 py-2"
              placeholder="Email address"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={doctorData.password}
              onChange={handleInputChange}
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 px-3 py-2"
              placeholder="Password"
              required
            />
          </div>

          {/* Status */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-1 flex items-center gap-2">
              <FaCheckCircle className="text-blue-500" />
              Status
            </label>
            <select
              name="status"
              value={doctorData.status}
              onChange={handleInputChange}
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 px-3 py-2"
              required
            >
              <option value="">Select status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register Doctor"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddDoctorForm;

