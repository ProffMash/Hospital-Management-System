import React from "react";

interface Props {
  label: string;
  value: number;
  trend?: string;
}

const OverviewCard: React.FC<Props> = ({ label, value, trend }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-gray-600 text-sm">{label}</h3>
      <div className="flex items-center justify-between">
        <span className="text-2xl font-bold">{value}</span>
        {trend && <span className="text-sm text-green-500">{trend}</span>}
      </div>
    </div>
  );
};

export default OverviewCard;
