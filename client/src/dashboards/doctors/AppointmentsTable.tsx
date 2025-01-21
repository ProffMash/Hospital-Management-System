import { useEffect, useState } from "react";
import { getAppointments, deleteAppointment } from "../../api/appointmentApi";
import { FaTrash } from "react-icons/fa";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { format } from "date-fns/format";
import { parse } from "date-fns/parse";
import { startOfWeek } from "date-fns/startOfWeek";
import { getDay } from "date-fns/getDay";
import { enUS } from "date-fns/locale/en-US";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for react-toastify

export interface Appointment {
  appointment_id?: number;
  patient_name: string;
  date: string; // Format: YYYY-MM-DD
  time: string;
}

const locales = { "en-US": enUS };
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const AppointmentsTable = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [appointmentsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const data = await getAppointments();
        const sortedData = data.reverse(); // Newest first
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

  // Filter appointments by search query and selected date
  const filteredAppointments = appointments.filter(
    (appt) =>
      appt.patient_name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (!selectedDate || appt.date === selectedDate)
  );

  const indexOfLastAppointment = currentPage * appointmentsPerPage;
  const indexOfFirstAppointment = indexOfLastAppointment - appointmentsPerPage;
  const currentAppointments = filteredAppointments.slice(
    indexOfFirstAppointment,
    indexOfLastAppointment
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleDelete = async (appointmentId: number) => {
    try {
      await deleteAppointment(appointmentId);
      setAppointments(
        appointments.filter((appt) => appt.appointment_id !== appointmentId)
      );
      toast.success("Appointment deleted successfully!", {
        position: "top-right",
        autoClose: 2000,
      });
    } catch (err) {
      console.error("Error deleting appointment:", err);
      setError("Failed to delete appointment. Please try again.");
      toast.error("Failed to delete appointment. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const events = appointments.map((appt) => ({
    title: appt.patient_name,
    start: new Date(`${appt.date}T${appt.time}`),
    end: new Date(`${appt.date}T${appt.time}`),
  }));

  if (loading) {
    return <div className="text-center py-4">Loading appointments...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">{error}</div>;
  }

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 relative">
      <h3 className="text-2xl font-semibold mb-6 text-center text-gray-700">
        Appointments
      </h3>

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

      {/* Table */}
      <table className="w-full text-sm border-collapse rounded-lg overflow-hidden shadow-sm">
        <thead>
          <tr className="bg-blue-50 text-gray-700">
            <th className="text-left px-4 py-3 border-b">Patient</th>
            <th className="text-left px-4 py-3 border-b">Date</th>
            <th className="text-left px-4 py-3 border-b">Time</th>
            <th className="text-center px-4 py-3 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentAppointments.map((appt, idx) => (
            <tr key={idx} className="hover:bg-gray-100">
              <td className="px-4 py-3 border-b">{appt.patient_name}</td>
              <td className="px-4 py-3 border-b">{appt.date}</td>
              <td className="px-4 py-3 border-b">{appt.time}</td>
              <td className="px-4 py-3 border-b text-center">
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

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <button
          className={`px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 ${
            currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="text-gray-700 font-medium">
          Page {currentPage} of{" "}
          {Math.ceil(filteredAppointments.length / appointmentsPerPage)}
        </span>
        <button
          className={`px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 ${
            currentAppointments.length < appointmentsPerPage
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
          onClick={() => paginate(currentPage + 1)}
          disabled={currentAppointments.length < appointmentsPerPage}
        >
          Next
        </button>
      </div>

      {/* Calendar */}
      <div className="mt-10 flex justify-center">
        <div className="max-w-lg w-full">
          <h4 className="text-xl font-semibold text-gray-700 mb-4 text-center">
            Appointment Calendar
          </h4>
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 300, width: "100%", marginBottom: 20 }} 
            onSelectSlot={(slotInfo) => {
              const selectedDate = format(slotInfo.start, "yyyy-MM-dd");
              setSelectedDate(selectedDate);
            }}
            selectable
          />
        </div>
      </div>

      {/* ToastContainer for notifications */}
      <ToastContainer />
    </div>
  );
};

export default AppointmentsTable;
