import React from "react";
import { Link } from "react-router-dom";
import { FaTachometerAlt, FaPills, FaUser, FaCog, FaSignOutAlt } from "react-icons/fa";

const PharmacySidebar: React.FC = () => {
  return (
    <div className="w-64 bg-gray-800 text-white h-screen p-4 space-y-6">
      <h2 className="text-2xl font-bold mb-6">PHARMACY</h2>
      
      {/* Dashboard Link */}
      <Link
        to="/pharmacy"
        className="flex items-center w-full text-left py-2 px-4 rounded hover:bg-gray-700"
      >
        <FaTachometerAlt className="mr-2" />
        Dashboard
      </Link>
      
      {/* Medicine Link */}
      <Link
        to="/pharmacy/medicine"
        className="flex items-center w-full text-left py-2 px-4 rounded hover:bg-gray-700"
      >
        <FaPills className="mr-2" />
        Medicine
      </Link>
      
      {/* Users Link */}
      <Link
        to="/pharmacy/users"
        className="flex items-center w-full text-left py-2 px-4 rounded hover:bg-gray-700"
      >
        <FaUser className="mr-2" />
        Users
      </Link>
      
      {/* Settings Link */}
      <Link
        to="/pharmacy/settings"
        className="flex items-center w-full text-left py-2 px-4 rounded hover:bg-gray-700"
      >
        <FaCog className="mr-2" />
        Settings
      </Link>
      
      {/* Logout Button */}
      <button
        className="flex items-center w-full text-left py-2 px-4 rounded hover:bg-gray-700"
      >
        <FaSignOutAlt className="mr-2" />
        Logout
      </button>
    </div>
  );
};

export default PharmacySidebar;
