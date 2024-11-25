import React, { useState } from "react";

const LoginPage: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState("admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRoleChange = (role: string) => {
    setSelectedRole(role);
    setError("");
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    // Example login logic (replace with API call)
    if (email === "admin@medinik.com" && password === "admin123" && selectedRole === "admin") {
      alert("Welcome, Admin!");
    } else if (email === "doctor@medinik.com" && password === "doctor123" && selectedRole === "doctor") {
      alert("Welcome, Doctor!");
    } else if (email === "pharmacist@medinik.com" && password === "pharma123" && selectedRole === "pharmacist") {
      alert("Welcome, Pharmacist!");
    } else {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-blue-900 text-center mb-6">
            Medinik 💊 Staff Login
        </h2>
        <div className="flex justify-center gap-4 mb-6">
          {["admin", "doctor", "pharmacist"].map((role) => (
            <button
              key={role}
              onClick={() => handleRoleChange(role)}
              className={`px-4 py-2 rounded-full font-semibold ${
                selectedRole === role
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {role.charAt(0).toUpperCase() + role.slice(1)}
            </button>
          ))}
        </div>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>
          {error && (
            <div className="text-red-500 text-sm mb-4">{error}</div>
          )}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            Login as {selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
