import React, { useState, useEffect } from "react";
import { FiUsers, FiHeart, FiActivity, FiUserCheck } from "react-icons/fi";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
} from "chart.js";
import { getDoctorsCount } from "../../api/doctorApi";
import { getPatientsCount } from "../../api/patientApi";
import { getPharmacyCount } from "../../api/pharmacistApi";
import { getAdminsCount } from "../../api/adminApi";

// Register required Chart.js components
ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend,
  BarElement
);

const Dashboard: React.FC = () => {
  // State for storing counts
  const [doctorsCount, setDoctorsCount] = useState<number | undefined>(undefined);
  const [patientsCount, setPatientsCount] = useState<number | undefined>(undefined);
  const [pharmacyCount, setPharmacyCount] = useState<number | undefined>(undefined); 
  const [adminsCount, setAdminsCount] = useState<number | undefined>(undefined);

  // Fetch data on component mount
  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const doctors = await getDoctorsCount();
        const patients = await getPatientsCount();
        const pharmacy = await getPharmacyCount(); 
        const admins = await getAdminsCount();

        setDoctorsCount(doctors);
        setPatientsCount(patients);
        setPharmacyCount(pharmacy);
        setAdminsCount(admins);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchCounts();
  }, []);

  // Data for the Line Chart with dynamic counts for doctors, patients, and pharmacists
  const lineChartData = {
    labels: ["Doctors", "Patients", "Pharmacists"], 
    datasets: [
      {
        label: "Count",
        data: [doctorsCount ?? 0, patientsCount ?? 0, pharmacyCount ?? 0], 
        borderColor: "#1D4ED8",
        backgroundColor: "rgba(29, 78, 216, 0.3)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  // Data for the Bar Chart (Doctors, Patients, Pharmacists count)
  const barChartData = {
    labels: ["Doctors", "Patients", "Pharmacists", "Admins"],
    datasets: [
      {
        label: "Count",
        data: [doctorsCount ?? 0, patientsCount ?? 0, pharmacyCount ?? 0],
        backgroundColor: [
          "#1D4ED8", // Blue for Doctors
          "#10B981", // Green for Patients
          "#F59E0B", // Yellow for Pharmacists
        ],
        borderColor: "#ffffff",
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
            title="Pharmacists"
            value={pharmacyCount !== undefined ? pharmacyCount.toString() : "Loading..."} // Updated value
            growth="+15%"
            bgColor="bg-green-100"
            iconColor="text-green-600"
          />
          <SummaryCard
            icon={<FiUserCheck />}
            title="Admins"
            value={adminsCount !== undefined ? adminsCount.toString() : "Loading..."} // Updated value
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

              {/* Bar Chart */}
              <div className="w-full lg:w-1/2 p-2">
                <Bar data={barChartData} options={chartOptions} />
              </div>

              {/* Pie Chart */}
              {/* <div className="w-60 h-60">
                <Pie data={pieChartData} />
              </div> */}
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

export default Dashboard;
