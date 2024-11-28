import React, { useState, useEffect } from "react";
import { FaUser, FaStethoscope, FaPhoneAlt, FaEnvelope, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

const EditDoctorForm: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const doctor = location.state?.doctor;

  const [formData, setFormData] = useState({
    id: "", // Added ID to the state
    name: "",
    specialization: "",
    phone: "",
    email: "",
    status: "",
  });

  useEffect(() => {
    if (doctor) {
      setFormData({
        id: doctor.id, // Set ID from doctor data
        name: doctor.name,
        specialization: doctor.specialization,
        phone: doctor.phone,
        email: doctor.email,
        status: doctor.status,
      });
    }
  }, [doctor]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate updating the doctor data
    alert("Doctor information updated successfully!");
    navigate("/admin/doctors"); // Navigate back to the doctors page
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <h1 className="text-3xl font-extrabold text-blue-600 mb-6">Edit Doctor</h1>

      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-8 max-w-3xl mx-auto">
        {/* Doctor ID (Hidden or Readonly) */}
        <div className="mb-6 flex items-center">
          <label htmlFor="id" className="block text-sm font-semibold text-gray-600">Doctor ID</label>
          <input
            type="text"
            id="id"
            name="id"
            value={formData.id}
            readOnly
            className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Name */}
        <div className="mb-6 flex items-center">
          <FaUser className="text-gray-500 mr-4" />
          <div className="flex-1">
            <label htmlFor="name" className="block text-sm font-semibold text-gray-600">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Specialization */}
        <div className="mb-6 flex items-center">
          <FaStethoscope className="text-gray-500 mr-4" />
          <div className="flex-1">
            <label htmlFor="specialization" className="block text-sm font-semibold text-gray-600">Specialization</label>
            <input
              type="text"
              id="specialization"
              name="specialization"
              value={formData.specialization}
              onChange={handleChange}
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Phone */}
        <div className="mb-6 flex items-center">
          <FaPhoneAlt className="text-gray-500 mr-4" />
          <div className="flex-1">
            <label htmlFor="phone" className="block text-sm font-semibold text-gray-600">Phone</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Email */}
        <div className="mb-6 flex items-center">
          <FaEnvelope className="text-gray-500 mr-4" />
          <div className="flex-1">
            <label htmlFor="email" className="block text-sm font-semibold text-gray-600">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Status */}
        <div className="mb-6 flex items-center">
          <FaCheckCircle className="text-gray-500 mr-4" />
          <div className="flex-1">
            <label htmlFor="status" className="block text-sm font-semibold text-gray-600">Status</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleSelectChange}
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 flex items-center gap-2"
          >
            <FaCheckCircle /> Save Changes
          </button>
          <button
            type="button"
            onClick={() => navigate("/admin/doctors")}
            className="px-6 py-2 border border-red-600 text-red-600 rounded-md shadow-md hover:bg-red-100 flex items-center gap-2"
          >
            <FaTimesCircle /> Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditDoctorForm;
