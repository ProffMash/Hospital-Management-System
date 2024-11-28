import React, { useState } from "react";
import { MdPerson, MdMedicalServices, MdPhone, MdEmail, MdCheckCircle, MdCancel } from "react-icons/md";

const EditDoctorForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    specialization: "",
    phone: "",
    email: "",
    status: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // You can add functionality to handle form submission, such as sending the data to an API
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Edit Doctor</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div className="flex items-center space-x-3">
          <MdPerson size={24} className="text-gray-500" />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Doctor's Name"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Specialization */}
        <div className="flex items-center space-x-3">
          <MdMedicalServices size={24} className="text-gray-500" />
          <input
            type="text"
            name="specialization"
            value={formData.specialization}
            onChange={handleChange}
            placeholder="Specialization"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Phone */}
        <div className="flex items-center space-x-3">
          <MdPhone size={24} className="text-gray-500" />
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Email */}
        <div className="flex items-center space-x-3">
          <MdEmail size={24} className="text-gray-500" />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Status */}
        <div className="flex items-center space-x-3">
          <MdCheckCircle size={24} className="text-gray-500" />
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Select Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="on-leave">On Leave</option>
          </select>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end space-x-4">
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
          >
            Save Changes
          </button>
          <button
            type="button"
            className="bg-gray-400 text-white py-2 px-4 rounded-md hover:bg-gray-500 transition"
            onClick={() => console.log("Cancel Edit")}
          >
            <MdCancel size={18} className="inline-block mr-2" />
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditDoctorForm;
