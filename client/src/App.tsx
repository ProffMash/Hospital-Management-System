import React from "react";
import Sidebar from "./dashboards/admin/Sidebar";
import Navbar from "./dashboards/admin/Navbar";
import Dashboard from "./dashboards/admin/Dashboard";

const App: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <Dashboard />
      </div>
    </div>
  );
};

export default App;
