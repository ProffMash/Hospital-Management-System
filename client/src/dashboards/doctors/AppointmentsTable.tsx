import React, { useEffect, useState } from "react";
import { getAppointments } from "../../api/appointmentApi";

const AppointmentsTable = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState<string | null>(null); 

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const data = await getAppointments();
        setAppointments(data); 
      } catch (err) {
        console.error("Error fetching appointments:", err);
        setError("Failed to load appointments. Please try again later.");
      } finally {
        setLoading(false); 
      }
    };

    fetchAppointments();
  }, []);

  if (loading) {
    return <div className="text-center py-4">Loading appointments...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">{error}</div>;
  }

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h3 className="text-xl font-semibold mb-4">Appointments</h3>
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="text-left px-4 py-2 border-b">Patient</th>
            <th className="text-left px-4 py-2 border-b">Date</th>
            <th className="text-left px-4 py-2 border-b">Time</th>
            <th className="text-left px-4 py-2 border-b">Doctor</th>
            <th className="text-left px-4 py-2 border-b">Status</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appt: any, idx: number) => (
            <tr key={idx} className="hover:bg-gray-50">
              {/* Display patient_name instead of patient ID */}
              <td className="px-4 py-2 border-b">{appt.patient_name}</td> 
              <td className="px-4 py-2 border-b">{appt.date}</td>
              <td className="px-4 py-2 border-b">{appt.time}</td>
              <td className="px-4 py-2 border-b">{appt.doctor || "N/A"}</td>
              <td className="px-4 py-2 border-b">
                <span
                  className={`px-2 py-1 text-xs rounded ${
                    appt.status === "Confirmed"
                      ? "bg-green-100 text-green-600"
                      : "bg-yellow-100 text-yellow-600"
                  }`}
                >
                  {appt.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentsTable;
