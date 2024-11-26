import React from 'react';
import { MdOutlineMoreVert } from 'react-icons/md';

const reports = [
  { id: 1, message: 'Room 501 AC is not working', reportedBy: 'Steve' },
  { id: 2, message: 'Daniel extended his holiday', reportedBy: 'Andrew' },
  { id: 3, message: '101 washroom needed to clean', reportedBy: 'Steve' },
];

const ReportsList: React.FC = () => {
  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h3 className="mb-4 text-lg font-semibold text-gray-700">Hospital Reports</h3>
      <ul className="space-y-2">
        {reports.map((report) => (
          <li
            key={report.id}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100"
          >
            <div>
              <p className="text-sm font-medium text-gray-800">{report.message}</p>
              <p className="text-sm text-gray-500">Reported by {report.reportedBy}</p>
            </div>
            <MdOutlineMoreVert className="text-gray-500" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReportsList;
