import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./dashboards/admin/Sidebar";
import Navbar from "./dashboards/admin/Navbar";
import Dashboard from "./dashboards/admin/Dashboard";
import Patients from "./dashboards/admin/pages/patients";
import Support from "./dashboards/admin/pages/support";
import Doctors from "./dashboards/admin/pages/doctors";
// import Activity from "./dashboards/admin/pages/activity";

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
              <Route path="/admin" element={<Dashboard />} />
              <Route path="/admin/doctors" element={<Doctors />} />
              <Route path="/admin/patients" element={<Patients />} />
              <Route path="/admin/settings" element={<div>Settings Page</div>} />
              {/* <Route path="/admin/activity" element={<Activity />} /> */}
              <Route path="/support" element={<Support />} />
              <Route path="/admin/add-doctor" element={<AddDoctorForm />} />
              <Route path="/admin/add-patient" element={<AddPatientForm />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
