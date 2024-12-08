import { useEffect, useState } from "react";
import StatsCard from "./StatsCard";
import AnalyticsChart from "./AnalyticsChart";
import SuccessStats from "./SuccessStats";
import DoctorsList from "./doctorsList";
import { getDoctorsCount } from "../../api/doctorApi";
import { getPatientsCount } from "../../api/patientApi";
import { getPharmacyCount } from "../../api/pharmacistApi";

const DoctorDashboard = () => {
  const [doctorsCount, setDoctorsCount] = useState<number>(0);
  const [patientsCount, setPatientsCount] = useState<number>(0);
  const [pharmacyCount, setPharmacyCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const doctorCount = await getDoctorsCount();
        const patientCount = await getPatientsCount();
        const pharmacyCount = await getPharmacyCount();

        setDoctorsCount(doctorCount);
        setPatientsCount(patientCount);
        setPharmacyCount(pharmacyCount);
      } catch (error) {
        console.error("Error fetching counts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCounts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-4 gap-4">
          <StatsCard
            title="Doctors"
            count={doctorsCount}
            subtitle="Total Doctors"
            bgColor="bg-yellow-100"
          />
          <StatsCard
            title="Staffs"
            count={10}
            subtitle="Medinik Staffs"
            bgColor="bg-green-100"
          />
          <StatsCard
            title="Patients"
            count={patientsCount}
            subtitle="New patients admitted"
            bgColor="bg-blue-100"
          />
          <StatsCard
            title="Pharmacists"
            count={pharmacyCount}
            subtitle="Pharmacy Experts"
            bgColor="bg-pink-100"
          />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <AnalyticsChart />
          <SuccessStats />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <DoctorsList />
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
