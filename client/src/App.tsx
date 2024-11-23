import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminSidebar from "./dashboards/admin/Sidebar";
import AdminNavbar from "./dashboards/admin/Navbar";
import AdminDashboard from "./dashboards/admin/Dashboard";
import Patients from "./dashboards/admin/pages/patients";
import Support from "./dashboards/admin/pages/support";
import Doctors from "./dashboards/admin/pages/doctors";
import AddDoctorForm from "./dashboards/admin/pages/addDoctorForm";
import AddPatientForm from "./dashboards/admin/pages/addPatientForm";
import LandingPage from "./landingPage";

import PharmacySidebar from "./dashboards/pharmacy/PharmacySidebar";
import PharmacyDashboard from "./dashboards/pharmacy/PharmacyDashboard";
// import Medicine from "./pharmacy/Medicine";
// import MedicineForm from "./pharmacy/addMedicine";
// import Users from "./pharmacy/Users";
// import Settings from "./pharmacy/Settings";
// import Sales from "./pharmacy/Sales";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Admin Dashboard Layout */}
        <Route
          path="/admin/*"
          element={
            <div className="flex h-screen bg-gray-100">
              {/* Sidebar */}
              <AdminSidebar />
              {/* Main Content */}
              <div className="flex-1 flex flex-col">
                {/* Navbar */}
                <AdminNavbar />
                {/* Page Content */}
                <div className="flex-grow p-4">
                  <Routes>
                    <Route path="/" element={<AdminDashboard />} />
                    <Route path="/doctors" element={<Doctors />} />
                    <Route path="/patients" element={<Patients />} />
                    <Route path="/support" element={<Support />} />
                    <Route path="/add-doctor" element={<AddDoctorForm />} />
                    <Route path="/add-patient" element={<AddPatientForm />} />
                  </Routes>
                </div>
              </div>
            </div>
          }
        />

        {/* Pharmacy Dashboard Layout */}
        <Route
          path="/pharmacy/*"
          element={
            <div className="flex h-screen bg-gray-100">
              {/* Sidebar */}
              <PharmacySidebar />
              {/* Main Content */}
              <div className="flex-1 p-4">
                <Routes>
                  <Route path="/" element={<PharmacyDashboard />} />
                  {/* <Route path="/medicine" element={<Medicine />} />
                  <Route path="/medicine-form" element={<MedicineForm />} />
                  <Route path="/users" element={<Users />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/sales" element={<Sales />} /> */}
                </Routes>
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
