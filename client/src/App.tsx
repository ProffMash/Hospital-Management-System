import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./dashboards/admin/Sidebar";
import Navbar from "./dashboards/admin/Navbar";
import Dashboard from "./dashboards/admin/Dashboard";
import Patients from "./dashboards/admin/pages/patients";
// import Support from "./dashboards/admin/pages/support";
import Doctors from "./dashboards/admin/pages/doctors";
// import Activity from "./dashboards/admin/pages/activities";

import AddDoctorForm from "./dashboards/admin/pages/addDoctorForm";
import AddPatientForm from "./dashboards/admin/pages/addPatientForm";

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
              <Route path="/patients" element={<Patients />} />
              <Route path="/settings" element={<div>Settings Page</div>} />
              {/* <Route path="/activity" element={<Activity />} /> */}
              {/* <Route path="/support" element={<Support />} /> */}
              <Route path="/add-doctor" element={<AddDoctorForm />} />
              <Route path="/add-patient" element={<AddPatientForm />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
