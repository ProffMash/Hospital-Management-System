import React, { useState, useEffect } from "react";
import { getReports, updateReportStatus, deleteReport } from "../../api/reportApi";
import { FadeLoader } from "react-spinners";
import { Trash2 } from "lucide-react";

interface Report {
  id: number;
  subject: string;
  message: string;
  doctor: number;
  doctor_name: string;
  status?: "Pending" | "Resolved"; // Optional until explicitly included in the API
}

const ReportsTable: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
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

  const handleToggleStatus = async (id: number, currentStatus: "Pending" | "Resolved") => {
    try {
      const newStatus = currentStatus === "Pending" ? "Resolved" : "Pending";
      await updateReportStatus(id, newStatus); // API call to update status in DB
      setReports((prevReports) =>
        prevReports.map((report) =>
          report.id === id ? { ...report, status: newStatus } : report
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleDeleteReport = async (id: number) => {
    try {
      await deleteReport(id); // API call to delete report from DB
      setReports((prevReports) => prevReports.filter((report) => report.id !== id));
    } catch (error) {
      console.error("Error deleting report:", error);
    }
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
            <th className="py-2 px-4 font-semibold text-gray-700">Subject</th>
            <th className="py-2 px-4 font-semibold text-gray-700">Message</th>
            <th className="py-2 px-4 font-semibold text-gray-700">Doctor ID</th>
            <th className="py-2 px-4 font-semibold text-gray-700">Doctor Name</th>
            <th className="py-2 px-4 font-semibold text-gray-700">Status</th>
            <th className="py-2 px-4 font-semibold text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report) => (
            <tr key={report.id} className="border-b">
              <td className="py-3 px-4">{report.subject}</td>
              <td className="py-3 px-4">{report.message}</td>
              <td className="py-3 px-4">{report.doctor}</td>
              <td className="py-3 px-4">{report.doctor_name}</td>
              <td className="py-3 px-4">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                    report.status === "Pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {report.status || "Pending"}
                </span>
              </td>
              <td className="py-3 px-4 flex items-center space-x-4">
                <button
                  onClick={() => handleToggleStatus(report.id, report.status || "Pending")}
                  className="text-sm text-blue-600 hover:underline"
                >
                  Toggle Status
                </button>
                <button
                  onClick={() => handleDeleteReport(report.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 className="w-5 h-5" />
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
