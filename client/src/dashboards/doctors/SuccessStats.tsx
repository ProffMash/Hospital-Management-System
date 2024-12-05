const SuccessStats = () => {
  const stats = [
    { label: "Surgeries", value: 85 },
    { label: "Recoveries", value: 90 },
    { label: "Medication", value: 75 },
  ];

  return (
    <div className="bg-white p-6 shadow-lg rounded-lg">
      <h3 className="font-bold text-lg mb-4">Success Statistics</h3>
      {stats.map((stat, index) => (
        <div key={index} className="mb-4">
          <div className="flex justify-between mb-1">
            <span>{stat.label}</span>
            <span>{stat.value}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full"
              style={{ width: `${stat.value}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SuccessStats;
