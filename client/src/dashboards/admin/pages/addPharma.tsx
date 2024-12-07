import React, { useState } from "react";
import { FaUserMd, FaBriefcaseMedical, FaPhone, FaEnvelope, FaLock, FaCheckCircle, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; 
import { registerPharmacist } from "../../../api/pharmaAuth";

const AddPharmacistForm: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    specialization: "",
    phone: "",
    status: "Active",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const navigate = useNavigate(); 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await registerPharmacist({
        ...formData,
        is_staff: true,
        is_active: true,
      });
      setSuccess(true);
      setFormData({
        email: "",
        password: "",
        name: "",
        specialization: "",
        phone: "",
        status: "Active",
      });
      navigate("/admin/pharmacists");
    } catch (err: any) {
      setError(err.message || "Failed to register pharmacist. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const navigateToPharmacists = () => {
    navigate("/admin/pharmacists/"); 
  };

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-8 relative">
        {/* Back Button */}
        <button
          onClick={navigateToPharmacists}
          className="absolute top-4 left-4 text-gray-600 hover:text-blue-600 flex items-center gap-1"
        >
          <FaArrowLeft className="text-xl" />
          <span className="font-medium">Back</span>
        </button>

        <h2 className="text-2xl font-bold text-blue-600 text-center mb-6">Add Pharmacist</h2>

        {error && <div className="text-red-500 mb-4">{error}</div>}
        {success && <div className="text-green-500 mb-4">Pharmacist added successfully!</div>}

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
              value={formData.name}
              onChange={handleChange}
              className="w-full border-gray-300 rounded-md shadow-sm px-3 py-2"
              placeholder="Enter pharmacist's name"
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
              value={formData.specialization}
              onChange={handleChange}
              className="w-full border-gray-300 rounded-md shadow-sm px-3 py-2"
              placeholder="Enter specialization"
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
              value={formData.phone}
              onChange={handleChange}
              className="w-full border-gray-300 rounded-md shadow-sm px-3 py-2"
              placeholder="Enter phone number"
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
              value={formData.email}
              onChange={handleChange}
              className="w-full border-gray-300 rounded-md shadow-sm px-3 py-2"
              placeholder="Enter email address"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-1 flex items-center gap-2">
              <FaLock className="text-blue-500" />
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border-gray-300 rounded-md shadow-sm px-3 py-2"
              placeholder="Enter password"
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
              value={formData.status}
              onChange={handleChange}
              className="w-full border-gray-300 rounded-md shadow-sm px-3 py-2"
              required
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md shadow hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Registering..." : "Add Pharmacist"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPharmacistForm;
