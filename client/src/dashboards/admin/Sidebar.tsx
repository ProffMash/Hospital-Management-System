import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import { FaHome, FaUserMd, FaUsers, FaChartPie, FaCog, FaHeadset } from "react-icons/fa";

const Sidebar: React.FC = () => {
  const menuItems = [
    { name: "Overview", icon: <FaHome />, path: "/" },
    { name: "Doctors", icon: <FaUserMd />, path: "/admin/doctors" },
    { name: "Patients", icon: <FaUsers />, path: "/admin/patients" },
    // { name: "Activity", icon: <FaChartPie />, path: "/admin/activity" },
    { name: "Settings", icon: <FaCog />, path: "/admin/settings" },
    { name: "Support", icon: <FaHeadset />, path: "/admin/support" },
  ];

  return (
    <aside className="bg-white shadow-lg w-64 p-4">
      <h1 className="text-2xl font-bold text-blue-600 mb-6">CARE</h1>
      <ul>
        {menuItems.map((item, index) => (
          <li key={index} className="flex items-center gap-4 p-3 rounded-lg hover:bg-blue-100 cursor-pointer">
            <Link to={item.path} className="flex items-center gap-4 text-gray-700">
              <span className="text-blue-600">{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
