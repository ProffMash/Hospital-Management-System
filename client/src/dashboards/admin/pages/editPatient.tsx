import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom"; 
import { MdPerson, MdPhone, MdEmail, MdCheckCircle, MdCancel, MdArrowBack, MdCalendarToday } from "react-icons/md";

const EditPatients: React.FC = () => {
  const { state } = useLocation(); // Access the state passed through navigation
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  // Check if the patient data is passed, otherwise use empty data
  const patient = state?.patient || {
    id: "",
    name: "",
    age: "",
    phone: "",
    email: "",
    status: "",
  };

  const [formData, setFormData] = useState({
    id: patient.id,
    name: patient.name,
    age: patient.age,
    phone: patient.phone,
    email: patient.email,
    status: patient.status,
  });

  useEffect(() => {
    // Update the form data if the patient data changes
    setFormData({
      id: patient.id,
      name: patient.name,
      age: patient.age,
      phone: patient.phone,
      email: patient.email,
      status: patient.status,
    });
  }, [patient]);

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
    // Submit the form data to the backend here, like an API call
  };

  const handleBack = () => {
    navigate("/admin/patients"); 
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      {/* Back Button */}
      <button
        onClick={handleBack}
        className="text-blue-600 mb-4 flex items-center space-x-2 hover:text-blue-800"
      >
        <MdArrowBack size={24} />
        <span>Back to Patient List</span>
      </button>

      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Edit Patient</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* ID - Hidden Field or Optional Display */}
        <div className="hidden">
          <input
            type="text"
            name="id"
            value={formData.id}
            onChange={handleChange}
            placeholder="Patient ID"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Name */}
        <div className="flex items-center space-x-3">
          <label htmlFor="name" className="text-gray-600 font-medium">Name</label>
          <MdPerson size={24} className="text-gray-500" />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Patient's Name"
            className="w-full p-2 border border-gray-300 rounded-md"
            id="name"
          />
        </div>

        {/* Age */}
        <div className="flex items-center space-x-3">
          <label htmlFor="age" className="text-gray-600 font-medium">Age</label>
          <MdCalendarToday size={24} className="text-gray-500" />
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="Age"
            className="w-full p-2 border border-gray-300 rounded-md"
            id="age"
          />
        </div>

        {/* Phone */}
        <div className="flex items-center space-x-3">
          <label htmlFor="phone" className="text-gray-600 font-medium">Phone</label>
          <MdPhone size={24} className="text-gray-500" />
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            className="w-full p-2 border border-gray-300 rounded-md"
            id="phone"
          />
        </div>

        {/* Email */}
        <div className="flex items-center space-x-3">
          <label htmlFor="email" className="text-gray-600 font-medium">Email</label>
          <MdEmail size={24} className="text-gray-500" />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            className="w-full p-2 border border-gray-300 rounded-md"
            id="email"
          />
        </div>

        {/* Status */}
        <div className="flex items-center space-x-3">
          <label htmlFor="status" className="text-gray-600 font-medium">Status</label>
          <MdCheckCircle size={24} className="text-gray-500" />
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            id="status"
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

export default EditPatients;
