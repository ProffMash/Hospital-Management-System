import StatsCard from "./StatsCard";
import AnalyticsChart from "./AnalyticsChart";
import SuccessStats from "./SuccessStats";
import DoctorsList from "./doctorsList";

const DoctorDashboard = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-4 gap-4">
          <StatsCard title="Doctors" count={2937} subtitle="3 Doctors joined this week" />
          <StatsCard title="Staffs" count={5453} subtitle="8 Staffs on vacation" />
          <StatsCard title="Patients" count={170000} subtitle="175 New patients admitted" />
          <StatsCard title="Pharmacies" count={21} subtitle="85k Medicine on reserve" />
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