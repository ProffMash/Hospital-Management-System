import { useEffect, useState } from "react";
import { getAppointments, deleteAppointment } from "../../api/appointmentApi";
import { FaTrash } from "react-icons/fa";

export interface Appointment {
  appointment_id?: number;
  patient_name: string;
  date: string;
  time: string;
}

const AppointmentsTable = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1); 
  const [appointmentsPerPage] = useState(10); 
  const [searchQuery, setSearchQuery] = useState(""); 

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const data = await getAppointments();
        // Sort appointments by creation time (newest first)
        const sortedData = data.reverse(); // Assuming API returns the oldest first; reverse to get the newest first
        setAppointments(sortedData);
      } catch (err) {
        console.error("Error fetching appointments:", err);
        setError("Failed to load appointments. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  // Filter appointments based on search query
  const filteredAppointments = appointments.filter((appt) =>
    appt.patient_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate the index of the first and last appointment to display
  const indexOfLastAppointment = currentPage * appointmentsPerPage;
  const indexOfFirstAppointment = indexOfLastAppointment - appointmentsPerPage;
  const currentAppointments = filteredAppointments.slice(
    indexOfFirstAppointment,
    indexOfLastAppointment
  );

  // Handle page change
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Handle deleting an appointment
  const handleDelete = async (appointmentId: number) => {
    try {
      await deleteAppointment(appointmentId);
      setAppointments(appointments.filter((appt) => appt.appointment_id !== appointmentId));
    } catch (err) {
      console.error("Error deleting appointment:", err);
      setError("Failed to delete appointment. Please try again.");
    }
  };

  if (loading) {
    return <div className="text-center py-4">Loading appointments...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">{error}</div>;
  }

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 relative">
      <h3 className="text-xl font-semibold mb-4">Appointments</h3>
      
      {/* Search Input */}
      <div className="mb-4 flex justify-start">
        <input
          type="text"
          className="w-1/3 p-2 border rounded-lg shadow-sm"
          placeholder="Search by patient name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="text-left px-4 py-2 border-b">Patient</th>
            <th className="text-left px-4 py-2 border-b">Date</th>
            <th className="text-left px-4 py-2 border-b">Time</th>
            <th className="text-left px-4 py-2 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentAppointments.map((appt, idx) => (
            <tr key={idx} className="hover:bg-gray-50">
              <td className="px-4 py-2 border-b">{appt.patient_name}</td>
              <td className="px-4 py-2 border-b">{appt.date}</td>
              <td className="px-4 py-2 border-b">{appt.time}</td>
              <td className="px-4 py-2 border-b text-center">
                {/* Delete button with icon */}
                <button
                  className="text-red-600 hover:text-red-800"
                  onClick={() => handleDelete(appt.appointment_id!)}
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination controls */}
      <div className="flex justify-center items-center mt-4 space-x-3">
        <button
          className={`px-4 py-2 rounded-l bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="text-lg font-medium">
          Page {currentPage} of {Math.ceil(filteredAppointments.length / appointmentsPerPage)}
        </span>
        <button
          className={`px-4 py-2 rounded-r bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 ${currentAppointments.length < appointmentsPerPage ? "opacity-50 cursor-not-allowed" : ""}`}
          onClick={() => paginate(currentPage + 1)}
          disabled={currentAppointments.length < appointmentsPerPage}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AppointmentsTable;
