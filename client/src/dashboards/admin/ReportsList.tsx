// ReportsTable.tsx
import React, { useState } from "react";

interface Report {
  id: number;
  name: string;
  subject: string;
  message: string;
  status: "Pending" | "Resolved";
}

const ReportsTable: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([
    {
      id: 1,
      name: "Steve",
      subject: "Room 501 AC is not working",
      message: "The AC in Room 501 is malfunctioning and needs immediate repair.",
      status: "Pending",
    },
    {
      id: 2,
      name: "Andrew",
      subject: "Daniel extended his holiday",
      message: "Daniel has extended his holiday for an additional week.",
      status: "Resolved",
    },
    {
      id: 3,
      name: "Steve",
      subject: "101 washroom needed to clean",
      message: "The washroom in Room 101 requires cleaning as it is not in a hygienic state.",
      status: "Pending",
    },
  ]);

  const toggleStatus = (id: number) => {
    setReports((prevReports) =>
      prevReports.map((report) =>
        report.id === id
          ? { ...report, status: report.status === "Pending" ? "Resolved" : "Pending" }
          : report
      )
    );
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Submitted Reports</h3>
      <table className="min-w-full table-auto">
        <thead>
          <tr className="text-left border-b">
            <th className="py-2 px-4 font-semibold text-gray-700">Name</th>
            <th className="py-2 px-4 font-semibold text-gray-700">Subject</th>
            <th className="py-2 px-4 font-semibold text-gray-700">Message</th>
            <th className="py-2 px-4 font-semibold text-gray-700">Status</th>
            <th className="py-2 px-4 font-semibold text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report) => (
            <tr key={report.id} className="border-b">
              <td className="py-3 px-4">{report.name}</td>
              <td className="py-3 px-4">{report.subject}</td>
              <td className="py-3 px-4">{report.message}</td>
              <td className="py-3 px-4">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                    report.status === "Pending" ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"
                  }`}
                >
                  {report.status}
                </span>
              </td>
              <td className="py-3 px-4">
                <button
                  onClick={() => toggleStatus(report.id)}
                  className="text-sm text-blue-600 hover:underline"
                >
                  Toggle Status
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportsTable;
