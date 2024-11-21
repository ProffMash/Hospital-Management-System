import React from "react";
import { FaUserMd, FaBriefcaseMedical, FaPhone, FaEnvelope, FaArrowLeft, FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AddDoctorForm: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Doctor added successfully!");
    navigate("/"); // Navigate back to the Doctors page after form submission
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
        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-1 flex items-center gap-2">
              <FaUserMd className="text-blue-500" />
              Name
            </label>
            <input
              type="text"
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
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 px-3 py-2"
              placeholder="Email address"
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
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 px-3 py-2"
              required
            >
              <option value="">Select Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md shadow hover:bg-blue-700"
          >
            Add Doctor
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddDoctorForm;
