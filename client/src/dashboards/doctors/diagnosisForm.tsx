import React, { useState } from "react";
import { MdPerson, MdMedicalServices, MdLocalPharmacy, MdAccessTime, MdDateRange, MdHistory } from "react-icons/md";

const DiagnosisForm: React.FC = () => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    diagnosis: "",
    prescribedMedicine: "",
    dosage: "",
    nextCheckout: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md flex space-x-8">
      {/* Left Section: Diagnosis Form */}
      <div className="flex-1 space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Patient Diagnosis Form</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center space-x-3">
            <MdPerson size={24} className="text-gray-500" />
            <input
              type="text"
              name="id"
              value={formData.id}
              onChange={handleChange}
              placeholder="Patient ID"
              className="w-80 p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="flex items-center space-x-3">
            <MdPerson size={24} className="text-gray-500" />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Patient Name"
              className="w-80 p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="flex items-center space-x-3">
            <MdMedicalServices size={24} className="text-gray-500" />
            <textarea
              name="diagnosis"
              value={formData.diagnosis}
              onChange={handleChange}
              placeholder="Diagnosis"
              className="w-80 p-2 border border-gray-300 rounded-md"
              rows={4}
            />
          </div>

          <div className="flex items-center space-x-3">
            <MdLocalPharmacy size={24} className="text-gray-500" />
            <input
              type="text"
              name="prescribedMedicine"
              value={formData.prescribedMedicine}
              onChange={handleChange}
              placeholder="Prescribed Medicine"
              className="w-80 p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="flex items-center space-x-3">
            <MdAccessTime size={24} className="text-gray-500" />
            <input
              type="text"
              name="dosage"
              value={formData.dosage}
              onChange={handleChange}
              placeholder="Dosage"
              className="w-80 p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="flex items-center space-x-3">
            <MdDateRange size={24} className="text-gray-500" />
            <input
              type="date"
              name="nextCheckout"
              value={formData.nextCheckout}
              onChange={handleChange}
              className="w-80 p-2 border border-gray-300 rounded-md"
            />
          </div>

          <button
            type="submit"
            className="w-80 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Submit Diagnosis
          </button>
        </form>
      </div>

      {/*Medical History & Recommendations */}
      <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Medical History & Recommendations</h3>

        {/* Patient Medical History */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <MdHistory size={24} className="text-gray-500" />
            <div className="flex-1">
              <h4 className="font-medium text-gray-700">Patient History</h4>
              <p className="text-sm text-gray-600">
                The patient has a history of hypertension, managed with medication. Last consultation was 3 months ago for routine check-up.
              </p>
            </div>
          </div>

          {/* Recommended Treatments */}
          <div className="flex items-center space-x-3">
            <MdMedicalServices size={24} className="text-gray-500" />
            <div className="flex-1">
              <h4 className="font-medium text-gray-700">Recommended Treatments</h4>
              <ul className="text-sm text-gray-600 list-disc pl-5">
                <li>Continue prescribed hypertension medication</li>
                <li>Increase physical activity</li>
                <li>Follow up in 3 months</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiagnosisForm;
