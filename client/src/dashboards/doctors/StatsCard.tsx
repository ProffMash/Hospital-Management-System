interface StatsCardProps {
  title: string;
  count: number;
  subtitle: string;
  bgColor?: string; // bgColor is optional
  icon?: React.ReactNode; 
}

const StatsCard = ({ title, count, subtitle, bgColor, icon }: StatsCardProps) => {
  return (
    <div className={`shadow-lg rounded-lg p-6 flex items-center ${bgColor || 'bg-white'}`}>
      {icon && <div className="mr-4 text-3xl">{icon}</div>}
      <div>
        <h3 className="text-black-500 text-sm">{title}</h3>
        <h2 className="text-2xl font-bold">{count}</h2>
        <p className="text-black-400 text-sm">{subtitle}</p>
      </div>
    </div>
  );
};

export default StatsCard;
