import React from 'react';
import { MdSearch, MdNotifications } from 'react-icons/md';

const doctorHeader = () => {
  return (
    <header className="flex items-center justify-between p-4 bg-white shadow">
      <div>
        <input
          type="text"
          className="px-4 py-2 text-sm border rounded-md focus:outline-none"
          placeholder="Search for Files, Patients, or Doctors"
        />
      </div>
      <div className="flex items-center space-x-4">
        <MdNotifications className="text-gray-500" size={24} />
        <div className="flex items-center">
          <img src="https://via.placeholder.com/30" alt="Admin" className="w-8 h-8 rounded-full" />
          <span className="ml-2 text-sm">Dr. Robert Fox</span>
        </div>
      </div>
    </header>
  );
};

export default doctorHeader;
