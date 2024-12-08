import React, { useState, useEffect } from "react";
import {
  MdPerson,
  MdMedicalServices,
  MdLocalPharmacy,
  MdAccessTime,
  MdHistory,
} from "react-icons/md";
import { createDiagnosis, getDiagnoses } from "../../api/diagnosisApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DiagnosisForm: React.FC = () => {
  const [formData, setFormData] = useState({
    patient: "",
    patient_name: "",
    diagnosis: "",
    prescribed_medicine: "",
    dosage: "",
  });

  const [diagnoses, setDiagnoses] = useState<any[]>([]); // To hold fetched diagnoses
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Number of diagnoses to display per page

  // Calculate total pages
  const totalPages = Math.ceil(diagnoses.length / itemsPerPage);

  // Paginated diagnoses
  const paginatedDiagnoses = diagnoses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Submit the form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null); // Reset error before making the request

    try {
      // Call the createDiagnosis API function
      await createDiagnosis({ ...formData, patient: Number(formData.patient) });
      setFormData({
        patient: "",
        patient_name: "",
        diagnosis: "",
        prescribed_medicine: "",
        dosage: "",
      });

      // Show success toast notification
      toast.success("Diagnosis submitted successfully!", {
        position: "top-right",
        autoClose: 2000, // 2 seconds auto-close
      });
    } catch (err) {
      setError("Error creating diagnosis");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch all diagnoses when the component is mounted
  useEffect(() => {
    const fetchDiagnoses = async () => {
      setLoading(true);
      try {
        const diagnosesData = await getDiagnoses();
        setDiagnoses(diagnosesData);
      } catch (err) {
        setError("Error fetching diagnoses");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDiagnoses();
  }, []); // Empty dependency array ensures this effect runs once after the initial render

  // Pagination controls
  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md flex space-x-8">
      {/* Toast Container */}
      <ToastContainer />

      {/* Left Section: Diagnosis Form */}
      <div className="flex-1 space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Patient Diagnosis Form</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center space-x-3">
            <MdPerson size={24} className="text-gray-500" />
            <input
              type="text"
              name="patient"
              value={formData.patient}
              onChange={handleChange}
              placeholder="Patient ID"
              className="w-80 p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="flex items-center space-x-3">
            <MdPerson size={24} className="text-gray-500" />
            <input
              type="text"
              name="patient_name"
              value={formData.patient_name}
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
              name="prescribed_medicine"
              value={formData.prescribed_medicine}
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

          <button
            type="submit"
            className="w-80 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Diagnosis"}
          </button>
        </form>
        {error && <p className="text-red-500 text-center">{error}</p>}
      </div>

      {/* Right Section: Medical History & Recommendations */}
      <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Medical History & Recommendations</h3>

        {/* Patient Medical History */}
        <div className="space-y-4">
          {paginatedDiagnoses.length === 0 ? (
            <p>No diagnoses found.</p>
          ) : (
            paginatedDiagnoses.map((diagnosis) => (
              <div key={diagnosis.id} className="flex items-center space-x-3">
                <MdHistory size={24} className="text-gray-500" />
                <div className="flex-1">
                  <h4 className="font-medium text-gray-700">{diagnosis.patient_name}'s History</h4>
                  <p className="text-sm text-gray-600">{diagnosis.diagnosis}</p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 disabled:opacity-50"
          >
            Previous
          </button>
          <p>
            Page {currentPage} of {totalPages}
          </p>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default DiagnosisForm;
