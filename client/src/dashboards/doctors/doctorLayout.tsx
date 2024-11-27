import { Outlet } from "react-router-dom";
import DoctorSidebar from "./doctorSidebar";

const DoctorLayout = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <DoctorSidebar />
      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default DoctorLayout;
