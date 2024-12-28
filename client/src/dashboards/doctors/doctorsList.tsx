import { useState, useEffect } from "react";
import { getDoctors } from "../../api/doctorApi"; // Import the API function
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa"; // Icons for phone and email

const DoctorsList = () => {
  const [doctors, setDoctors] = useState<{
    name: string;
    specialization: string;
    phone: string;
    email: string;
    status: string;
  }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch doctors from the backend
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const data = await getDoctors();
        setDoctors(data);
      } catch (err) {
        console.error("Error fetching doctors:", err);
        setError("We encountered an issue while loading doctor data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  if (loading) {
    return (
      <div className="text-center p-6">
        <div className="spinner-border animate-spin text-blue-500" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-4 text-lg font-semibold text-gray-700">Fetching doctor data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 p-6 rounded-lg text-center">
        <p className="text-red-600 font-medium">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 shadow-xl rounded-lg">
      <h3 className="font-bold text-2xl mb-6 text-blue-800">Doctors List</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">Name</th>
              <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">Specialization</th>
              <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">Phone</th>
              <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">Email</th>
              <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">Status</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor, index) => (
              <tr
                key={index}
                className={`border-b hover:bg-gray-50 transition-all duration-200 ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                }`}
              >
                <td className="py-3 px-6 text-sm text-gray-800 font-medium">{doctor.name}</td>
                <td className="py-3 px-6 text-sm text-gray-600">{doctor.specialization}</td>
                <td className="py-3 px-6 text-sm text-gray-600">
                  <FaPhoneAlt className="inline mr-2 text-blue-600" />
                  {doctor.phone}
                </td>
                <td className="py-3 px-6 text-sm text-gray-600">
                  <FaEnvelope className="inline mr-2 text-blue-600" />
                  {doctor.email}
                </td>
                <td className="py-3 px-6 text-sm">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      doctor.status.toLowerCase() === "active"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {doctor.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DoctorsList;
