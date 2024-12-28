import { useState, useEffect } from "react";
import { getDoctors } from "../../api/doctorApi"; // Import the API function

const DoctorsList = () => {
  const [doctors, setDoctors] = useState<
    { name: string; specialization: string; phone: string; email: string; status: string }[]
  >([]);
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
        setError("Failed to load doctors.");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  if (loading) {
    return <div className="text-center">Loading doctors...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="bg-white p-6 shadow-lg rounded-lg">
      <h3 className="font-bold text-lg mb-4 text-blue-800">Doctors List</h3>
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 text-left text-sm font-semibold text-gray-700">Name</th>
            <th className="py-2 px-4 text-left text-sm font-semibold text-gray-700">Specialization</th>
            <th className="py-2 px-4 text-left text-sm font-semibold text-gray-700">Phone</th>
            <th className="py-2 px-4 text-left text-sm font-semibold text-gray-700">Email</th>
            <th className="py-2 px-4 text-left text-sm font-semibold text-gray-700">Status</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doctor, index) => (
            <tr
              key={index}
              className={`border-b ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
            >
              <td className="py-2 px-4 text-sm text-gray-800">{doctor.name}</td>
              <td className="py-2 px-4 text-sm text-gray-600">{doctor.specialization}</td>
              <td className="py-2 px-4 text-sm text-gray-600">{doctor.phone}</td>
              <td className="py-2 px-4 text-sm text-gray-600">{doctor.email}</td>
              <td className="py-2 px-4 text-sm text-gray-600">
                <span
                  className={`px-3 py-1 rounded-full text-xs ${
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
  );
};

export default DoctorsList;
