import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaTachometerAlt, FaPills, FaUser, FaSignOutAlt } from "react-icons/fa";
import{ FileText} from "lucide-react";

const PharmacySidebar: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear authentication data
    localStorage.removeItem("authToken");
  
    // Force navigation to login
    navigate("/login");
    
    // Clear browser history to prevent going back to protected routes
    window.history.pushState(null, "", "/login");
  };

  return (
    <div className="w-64 bg-white text-black h-screen p-4 space-y-6">
      <h6 className="text-xl font-bold mb-6">Pharmacy 💊💉</h6>
      
      {/* Dashboard Link */}
      <Link
        to="/pharmacy"
        className="flex items-center w-full text-left py-2 px-4 rounded hover:bg-gray-300"
      >
        <FaTachometerAlt className="mr-2" />
        Dashboard
      </Link>
      
      {/* Medicine Link */}
      <Link
        to="/pharmacy/medicine"
        className="flex items-center w-full text-left py-2 px-4 rounded hover:bg-gray-300"
      >
        <FaPills className="mr-2" />
        Medicine
      </Link>
      
      {/* Users Link */}
      <Link
        to="/pharmacy/users"
        className="flex items-center w-full text-left py-2 px-4 rounded hover:bg-gray-300"
      >
        <FaUser className="mr-2" />
        Patients
      </Link>
      
      {/* Settings Link */}
      <Link
        to="/pharmacy/support"
        className="flex items-center w-full text-left py-2 px-4 rounded hover:bg-gray-300"
      >
        <FileText className="mr-2" />
        Support
      </Link>
      
      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="flex items-center w-full text-left py-2 px-4 rounded hover:bg-red-500"
      >
        <FaSignOutAlt className="mr-2" />
        Logout
      </button>
    </div>
  );
};

export default PharmacySidebar;
