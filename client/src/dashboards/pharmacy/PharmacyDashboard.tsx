import React, { useEffect, useState } from 'react';
import { FaPills, FaUsers, FaDollarSign } from 'react-icons/fa';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { getMedicinesCount } from '../../api/medicineInventoryApi';
import { getPatientsCount } from '../../api/patientApi';
import { getPharmacistsCount } from '../../api/pharmaApi';
import { getTotalStockValue } from '../../api/medicineInventoryApi'; 

Chart.register(...registerables);

const PharmacyDashboard: React.FC = () => {
  const [medicineCount, setMedicineCount] = useState<number | null>(null);
  const [patientsCount, setPatientsCount] = useState<number | null>(null);
  const [pharmacistsCount, setPharmacistsCount] = useState<number | null>(null);
  const [totalStockValue, setTotalStockValue] = useState<number | null>(null); 

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [medicineData, patientData, pharmacistData, stockValueData] = await Promise.all([
          getMedicinesCount(),
          getPatientsCount(),
          getPharmacistsCount(),
          getTotalStockValue(), 
        ]);
        setMedicineCount(medicineData);
        setPatientsCount(patientData);
        setPharmacistsCount(pharmacistData);
        setTotalStockValue(stockValueData); 
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchCounts();
  }, []);

  const barDataCounts = {
    labels: ['Medicines', 'Patients', 'Pharmacists'],
    datasets: [
      {
        label: 'Counts',
        data: [medicineCount || 0, patientsCount || 0, pharmacistsCount || 0],
        backgroundColor: [
          'rgba(255, 159, 64, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(75, 192, 192, 0.6)',
        ],
        borderColor: [
          'rgba(255, 159, 64, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const barDataStock = {
    labels: ['Total Stock Value'],
    datasets: [
      {
        label: 'Stock Value ($)',
        data: [totalStockValue || 0],
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <main className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Overview</h1>
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
          {[{
              icon: <FaPills />,
              value: medicineCount !== null ? medicineCount : 'Loading...',
              label: 'Total Medicines Type',
              bgColor: 'bg-orange-500',
            },
            {
              icon: <FaUsers />,
              value: patientsCount !== null ? patientsCount : 'Loading...',
              label: 'Total Patients',
              bgColor: 'bg-purple-500',
            },
            {
              icon: <FaUsers />,
              value: pharmacistsCount !== null ? pharmacistsCount : 'Loading...',
              label: 'Total Pharmacists',
              bgColor: 'bg-teal-500',
            },
            {
              icon: <FaDollarSign />,
              value: totalStockValue !== null ? `$${totalStockValue.toFixed(2)}` : 'Loading...',
              label: 'Total Stock Value',
              bgColor: 'bg-blue-500',
            }].map((stat, index) => (
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">Overview Counts</h2>
            <Bar data={barDataCounts} options={{ responsive: true, animation: { duration: 1000 } }} />
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">Total Stock Value</h2>
            <Bar data={barDataStock} options={{ responsive: true, animation: { duration: 1000 } }} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default PharmacyDashboard;
