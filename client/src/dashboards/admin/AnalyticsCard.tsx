import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const AnalyticsCard: React.FC = () => {
  const data = {
    labels: ["Surgery", "Lab Tests", "Appointments", "Doctors", "Patients"],
    datasets: [
      {
        label: "Monthly Overview",
        data: [40, 60, 80, 70, 90],
        borderColor: "rgba(59, 130, 246, 1)",
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        fill: true,
      },
    ],
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Analytics Overview</h2>
      <Line data={data} />
    </div>
  );
};

export default AnalyticsCard;
