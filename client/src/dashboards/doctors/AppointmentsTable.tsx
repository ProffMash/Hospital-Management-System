import React from "react";

const AppointmentsTable = () => {
  const appointments = [
    { name: "John Doe", date: "2024-11-25", status: "Confirmed" },
    { name: "Jane Smith", date: "2024-11-26", status: "Pending" },
    { name: "Michael Brown", date: "2024-11-27", status: "Cancelled" },
  ];

  return (
    <div className="bg-white p-6 shadow-lg rounded-lg">
      <h3 className="font-bold text-lg mb-4">Online Appointments</h3>
      <table className="w-full text-left">
        <thead>
          <tr>
            <th className="pb-2">Name</th>
            <th className="pb-2">Date</th>
            <th className="pb-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment, index) => (
            <tr key={index} className="border-t">
              <td className="py-2">{appointment.name}</td>
              <td>{appointment.date}</td>
              <td>
                <span
                  className={`px-2 py-1 text-sm rounded ${
                    appointment.status === "Confirmed"
                      ? "bg-green-100 text-green-600"
                      : appointment.status === "Pending"
                      ? "bg-yellow-100 text-yellow-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {appointment.status}
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
