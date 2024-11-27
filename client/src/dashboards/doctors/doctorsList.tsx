const DoctorsList = () => {
  const doctors = [
    {
      name: "Dr. John Smith",
      specialization: "Cardiology",
      phone: "+1 (123) 456-7890",
      email: "john.smith@medinik.com",
      status: "Available",
    },
    {
      name: "Dr. Sarah Brown",
      specialization: "Neurology",
      phone: "+1 (234) 567-8901",
      email: "sarah.brown@medinik.com",
      status: "On Leave",
    },
    {
      name: "Dr. Alice Green",
      specialization: "Orthopedics",
      phone: "+1 (345) 678-9012",
      email: "alice.green@medinik.com",
      status: "Available",
    },
  ];

  return (
    <div className="bg-white p-6 shadow-lg rounded-lg">
      <h3 className="font-bold text-lg mb-4 text-blue-800">Doctors List</h3>
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 text-left text-sm font-semibold text-gray-700">Name</th>
            <th className="py-2 px-4 text-left text-sm font-semibold text-gray-700">Specialization</th>
            <th className="py-2 px-4 text-left text-sm font-semibold text-gray-700">Phone</th>
            <th className="py-2 px-4 text-left text-sm font-semibold text-gray-700">Email</th>
            <th className="py-2 px-4 text-left text-sm font-semibold text-gray-700">Status</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doctor, index) => (
            <tr
              key={index}
              className={`border-b ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
            >
              <td className="py-2 px-4 text-sm text-gray-800">{doctor.name}</td>
              <td className="py-2 px-4 text-sm text-gray-600">{doctor.specialization}</td>
              <td className="py-2 px-4 text-sm text-gray-600">{doctor.phone}</td>
              <td className="py-2 px-4 text-sm text-gray-600">{doctor.email}</td>
              <td className="py-2 px-4 text-sm text-gray-600">
                <span
                  className={`px-3 py-1 rounded-full text-xs ${
                    doctor.status === "Available" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {doctor.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DoctorsList;
