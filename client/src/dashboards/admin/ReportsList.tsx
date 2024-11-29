import React, { useState, useEffect } from "react";
import { getReports } from "../../api/reportApi";
import { FadeLoader } from "react-spinners";

interface Report {
  id: number;
  name: string;
  subject: string;
  message: string;
  status: "Pending" | "Resolved"; // Make sure 'status' is part of the Report type
}

const ReportsTable: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Fetch the reports from the API
    const fetchReports = async () => {
      try {
        const fetchedReports = await getReports();
        setReports(fetchedReports);
      } catch (error) {
        console.error("Error fetching reports:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, []);

  const toggleStatus = (id: number) => {
    setReports((prevReports) =>
      prevReports.map((report) =>
        report.id === id
          ? { ...report, status: report.status === "Pending" ? "Resolved" : "Pending" }
          : report
      )
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <FadeLoader color="#3b82f6" />
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-extrabold text-blue-600">Submitted Reports</h1>
      <table className="min-w-full table-auto mt-6">
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
                    report.status === "Pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-green-100 text-green-800"
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
