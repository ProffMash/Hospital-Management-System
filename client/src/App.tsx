import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

// Admin Components
import AdminSidebar from "./dashboards/admin/Sidebar";
import AdminNavbar from "./dashboards/admin/Navbar";
import AdminDashboard from "./dashboards/admin/Dashboard";
import Patients from "./dashboards/admin/pages/patients";
import Support from "./dashboards/admin/pages/Support";
import Doctors from "./dashboards/admin/pages/doctors";
import EditDoctorForm from "./dashboards/admin/pages/editDoctor";
import AddDoctorForm from "./dashboards/admin/pages/addDoctorForm";
import AddPatientForm from "./dashboards/admin/pages/addPatientForm";
import EditPatients from "./dashboards/admin/pages/editPatient";
import Contacts from "./dashboards/admin/pages/contacts";

// Pharmacy Components
import PharmacySidebar from "./dashboards/pharmacy/PharmacySidebar";
import PharmacyDashboard from "./dashboards/pharmacy/PharmacyDashboard";
import Users from "./dashboards/pharmacy/Users";
import MedicineInventory from "./dashboards/pharmacy/Medicine";
import MedicineForm from "./dashboards/pharmacy/addMedicine";
import EditMedicine from "./dashboards/pharmacy/editMedicine";

// Doctor Components
import DoctorSidebar from "./dashboards/doctors/doctorSidebar";
import DoctorDashboard from "./dashboards/doctors/doctorDashboard";
import AppointmentsTable from "./dashboards/doctors/AppointmentsTable";
import SupportForm from "./dashboards/doctors/SupportForm";
import DoctorsList from "./dashboards/doctors/doctorsList";
import DiagnosisForm from "./dashboards/doctors/diagnosisForm";
import DoctorSettings from "./dashboards/doctors/doctorSetting";

// Shared Components
import LandingPage from "./landingPage";
import LoginPage from "./loginPage";

// Utility: ProtectedRoute
const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem("authToken"); // Replace with your auth logic
  return isAuthenticated ? children : <Navigate to="/login" />;
};

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
            <ProtectedRoute>
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
                      <Route path="/edit-doctor" element={<EditDoctorForm />} />
                      <Route path="/add-patient" element={<AddPatientForm />} />
                      <Route path="/edit-patient" element={<EditPatients />} />
                      <Route path="/contacts" element={<Contacts />} />
                    </Routes>
                  </div>
                </div>
              </div>
            </ProtectedRoute>
          }
        />

        {/* Pharmacy Dashboard Layout */}
        <Route
          path="/pharmacy/*"
          element={
            <ProtectedRoute>
              <div className="flex h-screen bg-gray-100">
                {/* Sidebar */}
                <PharmacySidebar />
                {/* Main Content */}
                <div className="flex-1 p-4">
                  <Routes>
                    <Route path="/" element={<PharmacyDashboard />} />
                    <Route path="/medicine" element={<MedicineInventory />} />
                    <Route path="/medicine-form" element={<MedicineForm />} />
                    <Route path="/edit-medicine" element={<EditMedicine />} />
                    <Route path="/users" element={<Users />} />
                  </Routes>
                </div>
              </div>
            </ProtectedRoute>
          }
        />

        {/* Doctor Dashboard Layout */}
        <Route
          path="/doctor/*"
          element={
            <ProtectedRoute>
              <div className="flex h-screen bg-gray-100">
                {/* Sidebar */}
                <DoctorSidebar />
                {/* Main Content */}
                <div className="flex-1 p-4">
                  <Routes>
                    <Route path="/" element={<DoctorDashboard />} />
                    <Route path="/appointments" element={<AppointmentsTable />} />
                    <Route path="/support" element={<SupportForm />} />
                    <Route path="/list" element={<DoctorsList />} />
                    <Route path="/diagnosis" element={<DiagnosisForm />} />
                    <Route path="/settings" element={<DoctorSettings />} />
                  </Routes>
                </div>
              </div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
