import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./dashboards/admin/Sidebar";
import Navbar from "./dashboards/admin/Navbar";
import Dashboard from "./dashboards/admin/Dashboard";
// import Patients from "./dashboards/admin/pages/patients";
// import Support from "./dashboards/admin/pages/support";
import Doctors from "./dashboards/admin/pages/doctors";

import AddDoctorForm from "./dashboards/admin/pages/addDoctorForm";

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Navbar */}
          <Navbar />

          {/* Page Content */}
          <div className="flex-grow p-4">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/doctors" element={<Doctors />} />
              {/* <Route path="/patients" element={<Patients />} /> */}
              {/* Add routes for activity and settings */}
              <Route path="/activity" element={<div>Activity Page</div>} />
              <Route path="/settings" element={<div>Settings Page</div>} />
              {/* <Route path="/support" element={<Support />} /> */}
              <Route path="/add-doctor" element={<AddDoctorForm />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
