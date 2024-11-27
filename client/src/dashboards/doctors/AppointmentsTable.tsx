const AppointmentsTable = () => {
  const appointments = [
    {
      patient: "John Doe",
      date: "2024-11-28",
      time: "10:30 AM",
      doctor: "Dr. Emily Carter",
      status: "Confirmed",
    },
    {
      patient: "Jane Smith",
      date: "2024-11-28",
      time: "11:00 AM",
      doctor: "Dr. Richard Miles",
      status: "Pending",
    },
  ];

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
          {appointments.map((appt, idx) => (
            <tr key={idx} className="hover:bg-gray-50">
              <td className="px-4 py-2 border-b">{appt.patient}</td>
              <td className="px-4 py-2 border-b">{appt.date}</td>
              <td className="px-4 py-2 border-b">{appt.time}</td>
              <td className="px-4 py-2 border-b">{appt.doctor}</td>
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
