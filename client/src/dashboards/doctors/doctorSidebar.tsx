import React from "react";
import { Home, Users, Calendar, ClipboardList, Settings } from "lucide-react"; // Icons from lucide-react

const DoctorSidebar = () => {
  return (
    <aside className="w-64 bg-white shadow-lg">
      <div className="p-4 text-center text-blue-600 font-bold text-xl">MediKit</div>
      <nav className="mt-8">
        <ul className="space-y-4">
          <li className="flex items-center space-x-4 p-4 hover:bg-gray-100 cursor-pointer">
            <Home className="text-blue-500" /> <span>Overview</span>
          </li>
          <li className="flex items-center space-x-4 p-4 hover:bg-gray-100 cursor-pointer">
            <Users className="text-blue-500" /> <span>Doctor</span>
          </li>
          <li className="flex items-center space-x-4 p-4 hover:bg-gray-100 cursor-pointer">
            <Calendar className="text-blue-500" /> <span>Appointment</span>
          </li>
          <li className="flex items-center space-x-4 p-4 hover:bg-gray-100 cursor-pointer">
            <ClipboardList className="text-blue-500" /> <span>Reports</span>
          </li>
          <li className="flex items-center space-x-4 p-4 hover:bg-gray-100 cursor-pointer">
            <Settings className="text-blue-500" /> <span>Settings</span>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default DoctorSidebar;
