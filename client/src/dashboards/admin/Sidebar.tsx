import React from "react";
import { FaHome, FaUserMd, FaUsers, FaChartPie, FaCog, FaHeadset } from "react-icons/fa";

const Sidebar: React.FC = () => {
  const menuItems = [
    { name: "Overview", icon: <FaHome /> },
    { name: "Doctors", icon: <FaUserMd /> },
    { name: "Patients", icon: <FaUsers /> },
    { name: "Activity", icon: <FaChartPie /> },
    { name: "Settings", icon: <FaCog /> },
    { name: "Support", icon: <FaHeadset /> },
  ];

  return (
    <aside className="bg-white shadow-lg w-64 p-4">
      <h1 className="text-2xl font-bold text-blue-600 mb-6">CARE</h1>
      <ul>
        {menuItems.map((item, index) => (
          <li key={index} className="flex items-center gap-4 p-3 rounded-lg hover:bg-blue-100 cursor-pointer">
            <span className="text-blue-600">{item.icon}</span>
            <span className="text-gray-700">{item.name}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
