import React from 'react';
import { FaPills, FaUsers, FaShoppingCart, FaDollarSign, FaFileAlt, FaChartBar } from 'react-icons/fa';
import { Line, Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const Dashboard: React.FC = () => {
  const salesData = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    datasets: [
      {
        label: 'Sales ($)',
        data: [150, 200, 250, 180, 220],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 2,
        tension: 0.4, // smooth line
        fill: true,
      },
    ],
  };

  const expenseData = {
    labels: ['Food', 'Transport', 'Office Supplies', 'Utilities'],
    datasets: [
      {
        label: 'Expenses ($)',
        data: [250, 120, 80, 60],
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <main className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Search"
              className="p-2 pl-4 bg-white border border-gray-300 rounded-full shadow-sm focus:ring focus:ring-blue-300 focus:outline-none transition duration-200"
            />
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center shadow-lg text-white font-semibold">
              JD
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
          {[
            { icon: <FaShoppingCart />, value: "239", label: "Quantity of Sales", bgColor: "bg-blue-500" },
            { icon: <FaDollarSign />, value: "$19,989.00", label: "Revenue", bgColor: "bg-green-500" },
            { icon: <FaChartBar />, value: "$5,999.00", label: "Profit", bgColor: "bg-yellow-500" },
            { icon: <FaPills />, value: "$96,000.00", label: "Value of Stock", bgColor: "bg-orange-500" },
            { icon: <FaDollarSign />, value: "$3,449.00", label: "Total Due", bgColor: "bg-pink-500" },
            { icon: <FaUsers />, value: "39", label: "Total Customers", bgColor: "bg-purple-500" },
            { icon: <FaFileAlt />, value: "11", label: "Total Suppliers", bgColor: "bg-red-500" },
            { icon: <FaUsers />, value: "4", label: "Total Users", bgColor: "bg-teal-500" },
          ].map((stat, index) => (
            <div
              key={index}
              className={`${stat.bgColor} text-white p-5 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 ease-in-out`}
            >
              <div className="flex items-center space-x-3">
                <div className="text-3xl">{stat.icon}</div>
                <div>
                  <p className="text-lg font-semibold">{stat.value}</p>
                  <p className="text-sm">{stat.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Animated Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Sales Line Chart */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">Weekly Sales</h2>
            <Line data={salesData} options={{ responsive: true, animation: { duration: 1000 } }} />
          </div>

          {/* Expenses Bar Chart */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">Expense Breakdown</h2>
            <Bar data={expenseData} options={{ responsive: true, animation: { duration: 1000 } }} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
