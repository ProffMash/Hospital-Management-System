import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom"; 
import { MdPerson, MdPhone, MdEmail, MdCheckCircle, MdArrowBack, MdCalendarToday } from "react-icons/md";
import { updatePatient } from "../../../api/patientApi";

const EditPatients: React.FC = () => {
  const { state } = useLocation(); 
  const navigate = useNavigate(); 

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updatePatient(formData.id, {
        name: formData.name,
        age: Number(formData.age),
        phone: Number(formData.phone),
        email: formData.email,
        status: formData.status,
      });
      alert("Patient updated successfully!");
      navigate("/admin/patients");
    } catch (error) {
      console.error("Error updating patient:", error);
      alert("Failed to update patient. Please try again.");
    }
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
            required
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
            required
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
            required
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
            required
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
            required
          >
            <option value="">Select Status</option>
            <option value="Admitted">Admitted</option>
            <option value="Discharged">Discharged</option>
          </select>
        </div>

        {/* Submit and Cancel Buttons */}
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
            onClick={handleBack}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPatients;
