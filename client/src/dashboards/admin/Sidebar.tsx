import React from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaUserMd, FaUsers, FaCog, FaHeadset } from "react-icons/fa";

const Sidebar: React.FC = () => {
  const menuItems = [
    { name: "Overview", icon: <FaHome />, path: "/admin" },
    { name: "Doctors", icon: <FaUserMd />, path: "/admin/doctors" },
    { name: "Patients", icon: <FaUsers />, path: "/admin/patients" },
    { name: "Support", icon: <FaHeadset />, path: "/admin/support" },
    { name: "Settings", icon: <FaCog />, path: "/admin/settings" },
  ];

  return (
    <aside className="bg-white shadow-lg w-64 p-4">
      <h1 className="text-2xl font-bold text-blue-600 mb-6">Medinik 💊</h1>
      <h4 className="text-xl font-bold text-blue-600 mb-6">Admin Dashboard</h4>
      <ul>
        {menuItems.map((item, index) => (
          <li key={index} className="flex items-center gap-4 p-3 rounded-lg hover:bg-blue-100 cursor-pointer">
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-4 text-gray-700 ${
                  isActive ? "bg-blue-100 text-blue-600 font-semibold" : ""
                }`
              }
            >
              <span>{item.icon}</span>
              <span>{item.name}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
