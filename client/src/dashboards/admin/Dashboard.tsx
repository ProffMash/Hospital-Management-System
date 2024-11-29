import React, { useState, useEffect } from "react";
import { FiUsers, FiHeart, FiActivity, FiDollarSign } from "react-icons/fi";
import { Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { getDoctorsCount } from "../../api/doctorApi";
import { getPatientsCount } from "../../api/patientApi";

// Register required Chart.js components
ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend);

const Dashboard: React.FC = () => {
  // State for storing doctors and patients count
  const [doctorsCount, setDoctorsCount] = useState<number | undefined>(undefined);
  const [patientsCount, setPatientsCount] = useState<number | undefined>(undefined);

  // Fetch data on component mount
  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const doctors = await getDoctorsCount(); 
        const patients = await getPatientsCount(); 
        setDoctorsCount(doctors);
        setPatientsCount(patients);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchCounts();
  }, []);

  // Data for the Line Chart with dynamic counts for doctors and patients
  const lineChartData = {
    labels: ["Doctors", "Patients"], // Labels for the x-axis
    datasets: [
      {
        label: "Count", 
        data: [doctorsCount ?? 0, patientsCount ?? 0], 
        borderColor: "#1D4ED8", 
        backgroundColor: "rgba(29, 78, 216, 0.3)", 
        fill: true, 
        tension: 0.4, 
      },
    ],
  };

  // Data for the Pie Chart
  const pieChartData = {
    labels: ["Surgery", "Pediatrics", "Orthopedics", "Lab Tests", "Radiology"],
    datasets: [
      {
        label: "Department Performance",
        data: [80, 70, 65, 90, 75],
        backgroundColor: [
          "#1D4ED8",
          "#10B981",
          "#F59E0B",
          "#EF4444",
          "#3B82F6",
        ],
        borderWidth: 1,
      },
    ],
  };

  // Chart Options
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top" as const,
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="flex flex-col p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold text-blue-600">Hospital Overview</h1>
      </div>

      {/* Content Wrapper */}
      <div className="flex-grow">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <SummaryCard
            icon={<FiUsers />}
            title="Doctors"
            value={doctorsCount !== undefined ? doctorsCount.toString() : "Loading..."} 
            growth="+8%"
            bgColor="bg-blue-100"
            iconColor="text-blue-600"
          />
          <SummaryCard
            icon={<FiHeart />}
            title="Patients"
            value={patientsCount !== undefined ? patientsCount.toString() : "Loading..."} 
            growth="+12%"
            bgColor="bg-pink-100"
            iconColor="text-pink-600"
          />
          <SummaryCard
            icon={<FiActivity />}
            title="Surgeries"
            value="120"
            growth="+15%"
            bgColor="bg-green-100"
            iconColor="text-green-600"
          />
          <SummaryCard
            icon={<FiDollarSign />}
            title="Revenue"
            value="$12,400"
            growth="+5%"
            bgColor="bg-yellow-100"
            iconColor="text-yellow-600"
          />
        </div>

        {/* Analytics Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Analytics Overview */}
          <div className="lg:col-span-2 bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Analytics Overview</h2>
            <div className="flex flex-wrap justify-between">
              {/* Line Chart */}
              <div className="w-full lg:w-1/2 p-2">
                <Line data={lineChartData} options={chartOptions} />
              </div>

              {/* Pie Chart */}
              <div className="w-60 h-60">
                <Pie data={pieChartData} />
              </div>
            </div>
          </div>

          {/* Patient Satisfaction */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Patient Satisfaction</h2>
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="w-32 h-32 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-blue-600">95%</span>
              </div>
              <p className="text-gray-500">Excellent feedback this month</p>
            </div>
          </div>
        </div>

        {/* Departmental Performance */}
        <div className="mt-8 bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Departmental Performance</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[{ name: "Surgery", progress: 80 },
              { name: "Pediatrics", progress: 70 },
              { name: "Orthopedics", progress: 65 },
              { name: "Lab Tests", progress: 90 },
              { name: "Radiology", progress: 75 },
              { name: "Pharmacy", progress: 85 }].map((dept, idx) => (
              <DepartmentProgress key={idx} name={dept.name} progress={dept.progress} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const SummaryCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  value: string;
  growth: string;
  bgColor: string;
  iconColor: string;
}> = ({ icon, title, value, growth, bgColor, iconColor }) => (
  <div className={`flex items-center p-4 rounded-lg shadow ${bgColor}`}>
    <div className={`p-4 rounded-full bg-white flex items-center justify-center shadow-sm ${iconColor}`}>
      {icon}
    </div>
    <div className="ml-4">
      <h3 className="text-sm font-semibold text-gray-600">{title}</h3>
      <h2 className="text-2xl font-bold text-gray-800">{value}</h2>
      <p className="text-sm text-green-600">{growth}</p>
    </div>
  </div>
);

const DepartmentProgress: React.FC<{ name: string; progress: number }> = ({ name, progress }) => (
  <div className="bg-gray-50 shadow p-4 rounded-lg">
    <h4 className="text-sm font-semibold">{name}</h4>
    <div className="relative pt-1">
      <div className="flex mb-2 items-center justify-between">
        <div>
          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-green-600 bg-green-200">
            {progress}%
          </span>
        </div>
      </div>
      <div className="flex mb-2">
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-green-500 h-2.5 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  </div>
);

export default Dashboard;
