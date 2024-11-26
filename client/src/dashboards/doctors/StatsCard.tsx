import React from "react";

interface StatsCardProps {
  title: string;
  count: number;
  subtitle: string;
}

const StatsCard = ({ title, count, subtitle }: StatsCardProps) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h3 className="text-gray-500 text-sm">{title}</h3>
      <h2 className="text-2xl font-bold">{count}</h2>
      <p className="text-gray-400 text-sm">{subtitle}</p>
    </div>
  );
};

export default StatsCard;
