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
import ReportsTable from "./dashboards/admin/ReportsList";
import LandingPage from "./landingPage";

import PharmacySidebar from "./dashboards/pharmacy/PharmacySidebar";
import PharmacyDashboard from "./dashboards/pharmacy/PharmacyDashboard";
import Users from "./dashboards/pharmacy/Users";
import MedicineInventory from "./dashboards/pharmacy/Medicine";
import MedicineForm from "./dashboards/pharmacy/addMedicine";

import LoginPage from "./loginPage";

import DoctorSidebar from "./dashboards/doctors/doctorSidebar"; 
import DoctorDashboard from "./dashboards/doctors/doctorDashboard";
import AppointmentsTable from "./dashboards/doctors/AppointmentsTable";
import ReportsForm from "./dashboards/doctors/ReportsForm";
import DoctorsList from "./dashboards/doctors/doctorsList";


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Login Page */}
        <Route path="/login" element={<LoginPage />} />

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
                    <Route path="/reports" element={<ReportsTable />} />
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
                  <Route path="/medicine" element={<MedicineInventory />} />
                  <Route path="/medicine-form" element={<MedicineForm />} />
                  <Route path="/users" element={<Users />} />
                </Routes>
              </div>
            </div>
          }
        />

        {/* Doctor Dashboard Layout */}
        <Route
          path="/doctor/*"
          element={
            <div className="flex h-screen bg-gray-100">
              {/* Sidebar */}
              <DoctorSidebar /> {/* Add the DoctorSidebar here */}
              {/* Main Content */}
              <div className="flex-1 p-4">
                <Routes>
                  <Route path="/" element={<DoctorDashboard />} />
                  <Route path="/appointments" element={<AppointmentsTable />} />
                  <Route path="/reports" element={<ReportsForm onSubmit={(report) => console.log(report)} />} />
                  <Route path="/list" element={<DoctorsList />} />
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
