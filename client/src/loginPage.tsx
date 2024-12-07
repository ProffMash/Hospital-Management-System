import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaEye, FaEyeSlash, FaHome } from "react-icons/fa";
import { loginAdmin } from "./api/adminAuth";
import { loginDoctor } from "./api/doctorAuth";
import { loginPharmacist } from "./api/pharmaAuth";

const LoginPage: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState("admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRoleChange = (role: string) => {
    setSelectedRole(role);
    setError("");
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      let token = "";
      let redirectPath = "";

      switch (selectedRole) {
        case "admin":
          const adminResponse = await loginAdmin({ email, password });
          token = adminResponse.token;
          redirectPath = "/admin";
          break;
        case "doctor":
          const doctorResponse = await loginDoctor({ email, password });
          token = doctorResponse.token;
          redirectPath = "/doctor";
          break;
        case "pharmacist":
          const pharmacistResponse = await loginPharmacist({ email, password });
          token = pharmacistResponse.token;
          redirectPath = "/pharmacy";
          break;
        default:
          setError("Invalid role selected.");
          return;
      }

      if (token) {
        // Save the token in localStorage (or sessionStorage if preferred)
        localStorage.setItem("authToken", token);

        // Log successful login
        console.log(`Login successful for ${selectedRole}: ${email}`);
        console.log("Token:", token);

        // Navigate to the correct dashboard based on the selected role
        navigate(redirectPath);
      }
    } catch (err: any) {
      setError(err.message || "Login failed. Please try again.");

      // Log failed login attempt
      console.error(`Login failed for ${selectedRole}: ${email}`);
      console.error("Error:", err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-blue-900 text-center mb-6 flex items-center justify-center gap-2">
          <FaUser className="text-blue-600" /> Medinik 💊 Staff Login
        </h2>
        <div className="flex justify-center gap-4 mb-6">
          {["admin", "doctor", "pharmacist"].map((role) => (
            <button
              key={role}
              onClick={() => handleRoleChange(role)}
              className={`flex items-center px-4 py-2 rounded-full font-semibold gap-2 ${
                selectedRole === role
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              <FaUser />
              {role.charAt(0).toUpperCase() + role.slice(1)}
            </button>
          ))}
        </div>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Email
            </label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pl-10"
                placeholder="Enter your email"
              />
              <FaUser className="absolute top-3 left-3 text-gray-400" />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pl-10"
                placeholder="Enter your password"
              />
              <FaLock className="absolute top-3 left-3 text-gray-400" />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute top-3 right-3 text-gray-400 hover:text-blue-500"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          {error && (
            <div className="text-red-500 text-sm mb-4">{error}</div>
          )}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
          >
            <FaLock />
            Login as {selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}
          </button>
        </form>
        <button
          onClick={() => navigate("/")}
          className="w-full text-gray-700 py-2 rounded-lg flex items-center justify-center gap-2"
        >
          <FaHome />
          Back to Home Page
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
