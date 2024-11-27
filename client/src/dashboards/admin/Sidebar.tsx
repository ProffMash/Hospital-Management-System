import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaHome, FaUserMd, FaUsers, FaCog, FaHeadset, FaSignOutAlt } from "react-icons/fa";

const Sidebar: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear authentication data
    localStorage.removeItem("authToken");

    // Redirect to the login page
    navigate("/login");
  };

  const menuItems = [
    { name: "Overview", icon: <FaHome />, path: "/admin" },
    { name: "Doctors", icon: <FaUserMd />, path: "/admin/doctors" },
    { name: "Patients", icon: <FaUsers />, path: "/admin/patients" },
    { name: "Support", icon: <FaHeadset />, path: "/admin/support" },
    { name: "Settings", icon: <FaCog />, path: "/admin/settings" },
    { name: "Reports", icon: <FaCog />, path: "/admin/reports" },
  ];

  return (
    <aside className="bg-white shadow-lg w-64 p-4">
      <h1 className="text-2xl font-bold text-blue-600 mb-6">Medinik 💊</h1>
      <h4 className="text-xl font-bold text-blue-600 mb-6">Admin Dashboard</h4>
      <ul>
        {menuItems.map((item, index) => (
          <li
            key={index}
            className="flex items-center gap-4 p-3 rounded-lg hover:bg-blue-100 cursor-pointer"
          >
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

        {/* Logout Menu Item */}
        <li
          className="flex items-center gap-4 p-3 rounded-lg hover:bg-blue-100 cursor-pointer"
          onClick={handleLogout}
        >
          <span className="text-gray-700">
            <FaSignOutAlt />
          </span>
          <span className="text-gray-700">Logout</span>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
