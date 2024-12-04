import { Link, useNavigate } from "react-router-dom";
import { Stethoscope, User, Calendar, FileText, Settings, LogOut, Tablet } from "lucide-react";

const DoctorSidebar = () => {
  const navigate = useNavigate();

  // Logout function
  const handleLogout = () => {
    // Clear user session data (example: localStorage, sessionStorage)
    localStorage.removeItem("authToken");
    // Redirect to login page
    navigate("/login");
  };

  const menuItems = [
    { name: "Dashboard", path: "/doctor", icon: <Stethoscope size={20} /> },
    { name: "Doctors", path: "/doctor/list", icon: <User size={20} /> },
    { name: "Diagnose", path: "/doctor/diagnosis", icon: <Tablet size={20} /> },
    { name: "Appointments", path: "/doctor/appointments", icon: <Calendar size={20} /> },
    { name: "Support", path: "/doctor/support", icon: <FileText size={20} /> },
    { name: "Settings", path: "/doctor/settings", icon: <Settings size={20} /> },
    { name: "Logout", path: "/login", icon: <LogOut size={20} />, action: handleLogout },
  ];

  return (
    <div className="h-screen w-64 bg-white text-black flex flex-col">
      <h3 className="text-xl font-semibold p-6 border-b border-white/20">Doctors Dashboard 💊</h3>
      <ul className="mt-4 space-y-3 flex-1">
        {menuItems.map((item, index) => (
          <li key={index}>
            <Link
              to={item.path}
              className="flex items-center gap-4 px-4 py-2 text-sm hover:bg-blue-700 transition rounded-lg"
              onClick={item.action ? item.action : undefined}
            >
              {item.icon}
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DoctorSidebar;
