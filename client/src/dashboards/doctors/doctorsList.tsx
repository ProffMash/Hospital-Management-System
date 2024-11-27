const DoctorsList = () => {
  const doctors = [
    { name: "Dr. John Smith", specialization: "Cardiology" },
    { name: "Dr. Sarah Brown", specialization: "Neurology" },
    { name: "Dr. Alice Green", specialization: "Orthopedics" },
  ];

  return (
    <div className="bg-white p-6 shadow-lg rounded-lg">
      <h3 className="font-bold text-lg mb-4">Doctors</h3>
      <ul className="space-y-4">
        {doctors.map((doctor, index) => (
          <li key={index} className="flex items-center space-x-4">
            <div className="bg-blue-500 text-white p-2 rounded-full w-10 h-10 flex items-center justify-center">
              {doctor.name[0]}
            </div>
            <div>
              <p className="font-bold">{doctor.name}</p>
              <p className="text-gray-500 text-sm">{doctor.specialization}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DoctorsList;
